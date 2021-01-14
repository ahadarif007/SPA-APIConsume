$(document).ready(function () 
{
            $("#Search").click(function () {
                $("#newlist").show(1000);
                AdvancedSearchData();
            });

            $("#downloadSrc").click(function () {
                //$("#newlist").show(1000);
                AdvancedSearchDatapdf();
            });


            //*************************************************************************************************************** */

            function AdvancedSearchData() {
                $.ajax({
                    url: "https://localhost:44360/api/ProductSearch",
                    method: "post",
                    headers: {
                        ContentType: "application/json"
                    },

                    data: {
                        ProductId: $("#srcProductId").val(),
                        ProductName: $("#srcProductName").val(),
                        ProductDescription: $("#srcProductDescription").val(),

                        minQuantity: $("#minQuantity").val(),
                        maxQuantity: $("#maxQuantity").val(),

                        minPrice: $("#minPrice").val(),
                        maxPrice: $("#maxPrice").val(),

                        minCreatedDate: $("#minCreatedDate").val(),
                        maxCreatedDate: $("#maxCreatedDate").val(),

                        minModifiedDate: $("#minModifiedDate").val(),
                        maxModifiedDate: $("#maxModifiedDate").val(),

                        minLastPurchasedDate: $("#minLastPurchasedDate").val(),
                        maxLastPurchasedDate: $("#maxLastPurchasedDate").val(),

                        minLastSoldDate: $("#minLastSoldDate").val(),
                        maxLastSoldDate: $("#maxLastSoldDate").val()

                    },
                    complete: function (xmlHttp, status) {
                        if (xmlHttp.status == 200) {
                            var data = xmlHttp.responseJSON;
                            //console(data);
                            var str = '';
                            for (var i = 0; i < data.length; i++) {
                                var start = "<tr><td>";
                                var end = "</td></tr>";
                                var k = "</td><td>";
                                var a1 = data[i].ProductId;
                                var a2 = data[i].ProductName;
                                var a3 = data[i].ProductDescription;
                                var a4 = data[i].Quantity;
                                var a5 = data[i].Price;
                                var a6 = data[i].CreatedDate;
                                if (a6 != null) {
                                    a6 = moment(data[i].CreatedDate.substr(0, 10)).format('LL').toString();
                                }

                                var a7 = data[i].ModifiedDate;
                                if (a7 != null) {
                                    a7 = moment(data[i].ModifiedDate.substr(0, 10)).format('LL').toString();
                                }
                                var a8 = data[i].LastPurchasedDate;
                                if (a8 != null) {
                                    a8 = moment(data[i].LastPurchasedDate.substr(0, 10)).format('LL').toString();
                                }
                                var a9 = data[i].LastSoldDate;
                                if (a9 != null) {
                                    a9 = moment(data[i].LastSoldDate.substr(0, 10)).format('LL').toString();
                                }
                                var action = "";
                                if (a4 == 0) {
                                    action += "<button class='btn btn-danger btn-sm'> Not Avilable</button>";

                                }
                                if (a4 > 0) {
                                    action += "&nbsp;<button class='btn btn-success btn-sm'> Avilable </button>";
                                }

                                if (a4 < 20) {
                                    action += "&nbsp;<button class='btn btn-warning btn-sm'> Low Stock </button>";
                                }
                                // var action="<button class='btn btn-primary'></i></button>";
                                //     action+="&nbsp;<button class='btn btn-danger'></button>";
                                str += start + a1 + k + a2 + k + a3 + k + a4 + k + a5 + k + a6 + k + a7 + k + a8 + k + a9 + k + action + end;

                            };
                            str = str.replace(new RegExp("null", 'g'), "-");
                            $("#newlist tbody").html(str);



                            $('#newlist').DataTable({
                                dom: 'Bfrtip',
                                buttons: [
                                    'copyHtml5',
                                    'excelHtml5',
                                    'csvHtml5',
                                    'pdfHtml5'
                                ]
                            });

                            var element = document.getElementById("newlist");
                            element.scrollIntoView({
                                behavior: "smooth",
                                block: "end",
                                inline: "nearest"
                            });
                        } else {
                            $("#msg").html(xmlHttp.status + ":" + xmlHttp.statusText);
                        }
                    }
                });
            }


            //*************************************************************************************************************** */

            function AdvancedSearchDatapdf() {
                $.ajax({
                    
                    url: "https://localhost:44360/api/productsearchreport",
                    method: "post",
                    headers: {
                        ContentType: "application/json"
                    },
                    

                    data: {
                        ProductId: $("#srcProductId").val(),
                        ProductName: $("#srcProductName").val(),
                        ProductDescription: $("#srcProductDescription").val(),

                        minQuantity: $("#minQuantity").val(),
                        maxQuantity: $("#maxQuantity").val(),

                        minPrice: $("#minPrice").val(),
                        maxPrice: $("#maxPrice").val(),

                        minCreatedDate: $("#minCreatedDate").val(),
                        maxCreatedDate: $("#maxCreatedDate").val(),

                        minModifiedDate: $("#minModifiedDate").val(),
                        maxModifiedDate: $("#maxModifiedDate").val(),

                        minLastPurchasedDate: $("#minLastPurchasedDate").val(),
                        maxLastPurchasedDate: $("#maxLastPurchasedDate").val(),

                        minLastSoldDate: $("#minLastSoldDate").val(),
                        maxLastSoldDate: $("#maxLastSoldDate").val()

                    },
                    //xhrFields is what did the trick to read the blob to pdf
                    xhrFields: {
                        responseType: 'blob'
                    },
                    success: function (response, status, xhr) 
                    {
                        console.log(response);
                        console.log(status);
                        console.log(xhr);
                        console.log(xhr.getResponseHeader("ContentDisposition"));
                        console.log(xhr.getAllResponseHeaders());
                        var filename ="SearchResult:"+Date.now()+".pdf";
                        var disposition = xhr.getResponseHeader('Content-Disposition');

                        if (disposition) 
                        {
                            var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
                            var matches = filenameRegex.exec(disposition);
                            if (matches !== null && matches[1]) filename = matches[1].replace(/['"]/g, '');
                        }
                        var linkelem = document.createElement('a');
                        
                            var blob = new Blob([response], {
                                type: 'application/octet-stream'
                            });

                            if (typeof window.navigator.msSaveBlob !== 'undefined') 
                            {
                                //   IE workaround for "HTML7007: One or more blob URLs were revoked by closing the blob for which they were created. These URLs will no longer resolve as the data backing the URL has been freed."
                                window.navigator.msSaveBlob(blob, filename);
                            } 
                            else 
                            {
                                var URL = window.URL || window.webkitURL;
                                var downloadUrl = URL.createObjectURL(blob);

                                if (filename) {
                                    // use HTML5 a[download] attribute to specify filename
                                    var a = document.createElement("a");

                                    // safari doesn't support this yet
                                    if (typeof a.download === 'undefined') {
                                        window.location = downloadUrl;
                                    } 
                                    else 
                                    {
                                        a.href = downloadUrl;
                                        a.download = filename;
                                        document.body.appendChild(a);
                                        a.target = "_blank";
                                        a.click();
                                    }
                                } 
                                else 
                                {
                                    window.location = downloadUrl;
                                }
                            }

                        
                    }
                });
            }
});