$(document).ready(function () {
    //$("#invoiceReport").hide();
    $("#sltmemo").hide(); // selected memo hidden initially
    $("#tbl-2").hide(); // initially hide product selection table 
    $("#tbl").hide(); // hide selected memo details initially
    $("#action-card").hide(); // hide action card initially

    $("#loadNonProcessedMemos").click(function () {
        loadNonProcessedMemos();
        $("#tbl1-Modal").modal();

    });

    $("#showThisMemoInfo").click(function () {

        //loadInvoiceData();
        var element = document.getElementById("mainlist");
        element.scrollIntoView({
            behavior: "smooth",
            block: "end",
            inline: "nearest",
        });
    });

    $("#goToProductSelectionTable").click(function () {
        // scroll to product selection section
        var element = document.getElementById("list2");
                    element.scrollIntoView({
                        behavior: "smooth",
                        block: "end",
                        inline: "nearest",
                    });
        });

        

    $("#btnUpdate").click(function () {
        updateData();
    });
    $("#btnDelete").click(function () {
        deleteData();
    });
    //******************************************************************************************************************************************-->
    //******************************************************************************************************************************************-->
    //******************************************************************************************************************************************-->
    //******************************************************************************************************************************************-->
    //******************************************************************************************************************************************-->
    //******************************************************************************************************************************************-->
    //*************************************************************************************************************** */

    $("#addToInvoice").click(function () {
        alert("addToInvoice clicked");
        postData();
    });
        //******************************************************************************************************************************************-->
    //******************************************************************************************************************************************-->
    //******************************************************************************************************************************************-->
    //******************************************************************************************************************************************-->
    //******************************************************************************************************************************************-->
    //******************************************************************************************************************************************-->
    //*************************************************************************************************************** */


    $("#getInvoice").click(function () {
        var a = $.trim($("#sltautoId").text());
        if (a.length > 0) {
            var url = "https://localhost:44360/api/getInvoice/" + a;
            window.open(url, '_blank');
        }
        else {
            alert("memo Not Loaded");
        }

    })

    //******************************************************************************************************************************************-->
    //******************************************************************************************************************************************-->
    //******************************************************************************************************************************************-->
    //******************************************************************************************************************************************-->
    //******************************************************************************************************************************************-->
    //******************************************************************************************************************************************-->
    //*************************************************************************************************************** */


    $("#confirmSell").click(function () {
        var a = $.trim($("#sltautoId").text());
        if (a.length > 0) {
            //PUT api/memos/{memoID}/confirmSell
            $.ajax({
                url: "https://localhost:44360/api/memos/" + a + "/confirmSell",
                method: "put",
                headers:
                {
                    ContentType: "application/json"
                },

                datatype: JSON,

                complete: function (xmlHttp, status) {
                    if (xmlHttp.status == 200) {
                        alert("sell Confirmed");
                        //$("#updatemsg").html($("#updProductName").text()+" has Been Successfully Updated");
                    }
                    else {
                        $("#updatemsg").html(xmlHttp.status + ":" + xmlHttp.statusText + ":" + xmlHttp.responseText);
                    }
                }

            });
            //window.open(url, '_blank');
        }
        else {
            alert("memo Not Loaded");
        }

    })
    //******************************************************************************************************************************************-->
    //******************************************************************************************************************************************-->
    //******************************************************************************************************************************************-->
    //******************************************************************************************************************************************-->
    //******************************************************************************************************************************************-->
    //******************************************************************************************************************************************-->
    //*************************************************************************************************************** */

    //Load Memo

    $(".table tbody").on("click", ".loadForSelect", function () {
        var currentRow = $(this).closest("tr");
        var col1 = currentRow.find("td:eq(0)").html();
        var col2 = currentRow.find("td:eq(1)").html();
        var col3 = currentRow.find("td:eq(2)").html();
        var col4 = currentRow.find("td:eq(3)").html();
        var col5 = currentRow.find("td:eq(4)").html();
        var col6 = currentRow.find("td:eq(5)").html();

        $("#sltautoId").html(col1);
        $("#sltMemoNumber").html(col2);
        $("#sltMemoDescription").html(col3);
        $("#sltCreatedOn").html(col4);
        $("#sltBelongsTo").html(col5);
        $("#sltStatus").html(col6);
        //alert(col1);
        $('#tbl1-Modal').modal('hide'); // hide selection modal 
        
        $("#sltmemo").show(); // show selected memo when selected (+loaded)
        

         //load product selection table
        //load memo details
        loadInvoiceData();
        loadProductSelectionTable();
        
        $("#tbl-2").show(); //show product selection table 
        $("#tbl").show(); // show memo details 
        $("#action-card").show(); // hide action card initially
        var element = document.getElementById("sltmemo");
        element.scrollIntoView({
            behavior: "smooth",
            block: "end",
            inline: "nearest",
        });

        
        //loadInvoiceData();
    });

    //******************************************************************************************************************************************-->
    //******************************************************************************************************************************************-->
    //******************************************************************************************************************************************-->
    //******************************************************************************************************************************************-->
    //******************************************************************************************************************************************-->
    //******************************************************************************************************************************************-->
    //*************************************************************************************************************** */

    $(".table tbody").on("click", ".loadForSelectProducts", function () {
        var currentRow = $(this).closest("tr");
        var col1 = currentRow.find("td:eq(0)").html();
        var col2 = currentRow.find("td:eq(1)").html();
        var col3 = currentRow.find("td:eq(2)").html();
        var col4 = currentRow.find("td:eq(3)").html();
        var col5 = currentRow.find("td:eq(4)").html();

        $("#slt2ProductId").html(col1);
        $("#slt2ProductName").html(col2);
        $("#slt2ProductDescription").html(col3);
        $("#slt2Quantity").html(col4);
        $("#slt2Price").html(col5);

        var element = document.getElementById("slt2product");
        element.scrollIntoView({
            behavior: "smooth",
            block: "end",
            inline: "nearest",
        });
    });
    //******************************************************************************************************************************************-->
    //******************************************************************************************************************************************-->
    //******************************************************************************************************************************************-->
    //******************************************************************************************************************************************-->
    //******************************************************************************************************************************************-->
    //******************************************************************************************************************************************-->
    //*************************************************************************************************************** */

    $('.table tbody').on('click', '.loadForUpdate', function () {

        var currentRow = $(this).closest("tr");
        var col1 = currentRow.find("td:eq(0)").html();
        var col2 = currentRow.find("td:eq(1)").html();
        var col3 = currentRow.find("td:eq(2)").html();
        var col4 = currentRow.find("td:eq(3)").html();
        var col5 = currentRow.find("td:eq(4)").html();
        var col6 = currentRow.find("td:eq(5)").html();
        var col7 = currentRow.find("td:eq(6)").html();

        $("#updSellId").text(col1);
        $("#updMemoNumber").text(col2);
        $("#updProductId").text(col3);
        $("#updProductName").text(col4);
        $("#updSellDate").text(col5);
        $("#updQuantity").val(col6);
        $("#updPrice").val(col7);


        var element = document.getElementById("upd");
        element.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
    });

    //******************************************************************************************************************************************-->
    //******************************************************************************************************************************************-->
    //******************************************************************************************************************************************-->
    //******************************************************************************************************************************************-->
    //******************************************************************************************************************************************-->
    //******************************************************************************************************************************************-->
    //*************************************************************************************************************** */


    $('.table tbody').on('click', '.loadForDelete', function () {

        var currentRow = $(this).closest("tr");
        var col1 = currentRow.find("td:eq(0)").html();
        var col2 = currentRow.find("td:eq(1)").html();
        var col3 = currentRow.find("td:eq(2)").html();
        var col4 = currentRow.find("td:eq(3)").html();
        var col5 = currentRow.find("td:eq(4)").html();
        var col6 = currentRow.find("td:eq(5)").html();
        var col7 = currentRow.find("td:eq(6)").html();

        $("#dltSellId").text(col1);
        $("#dltMemoNumber").text(col2);
        $("#dltProductId").text(col3);
        $("#dltProductName").text(col4);
        $("#dltSellDate").text(col5);
        $("#dltQuantity").text(col6);
        $("#dltPrice").text(col7);

        //alert(col1);

        var element = document.getElementById("dlt");
        element.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
    });
    //******************************************************************************************************************************************-->
    //******************************************************************************************************************************************-->
    //******************************************************************************************************************************************-->
    //******************************************************************************************************************************************-->
    //******************************************************************************************************************************************-->
    //******************************************************************************************************************************************-->
    //*************************************************************************************************************** */
    //Load non precessed memos in table
    //done
    function loadNonProcessedMemos() {
        //show table
        $("#list1").show(1000);

        $.ajax({
            url: "https://localhost:44360/api/npsellmemos",
            method: "get",
            headers: {
                //Authorization:"Basic "+btoa("admin:123")
            },
            complete: function (xmlHttp, status) {
                if (xmlHttp.status == 200) {
                    var data = xmlHttp.responseJSON;
                    //console(data);
                    var str = "";
                    for (var i = 0; i < data.length; i++) {
                        var start = "<tr><td>";
                        var end = "</td></tr>";
                        var k = "</td><td>";
                        var a1 = data[i].autoId;
                        var a2 = data[i].MemoNumber;
                        var a3 = data[i].MemoDescription;
                        var a4 = data[i].CreatedOn.substr(0, 10);
                        var a5 = data[i].BelongsTo;
                        var a6 = data[i].Status;

                        var action =
                            "<button class='btn btn-blue loadForSelect'><i class='fa fa-check' aria-hidden='true'></i></button>";
                        //action+="&nbsp;<button class='btn btn-danger loadForDelete'><i class='fa fa-trash' aria-hidden='true'></i></button>";

                        str +=
                            start +
                            a1 +
                            k +
                            a2 +
                            k +
                            a3 +
                            k +
                            a4 +
                            k +
                            a5 +
                            k +
                            a6 +
                            k +
                            action +
                            end;
                    }
                    str = str.replace(new RegExp("null", "g"), "-");
                    $("#list1 tbody").html(str);

                    $("#list1").DataTable();

                } else {
                    $("#msg").html(xmlHttp.status + ":" + xmlHttp.statusText);
                }
            },
        });
    }

    //******************************************************************************************************************************************-->
    //******************************************************************************************************************************************-->
    //******************************************************************************************************************************************-->
    //******************************************************************************************************************************************-->
    //******************************************************************************************************************************************-->
    //******************************************************************************************************************************************-->
    //*************************************************************************************************************** */
    //Load data in table
    //done
    function loadProductSelectionTable() {
        //show table
        $("#list2").show(1000);

        $.ajax({
            url: "https://localhost:44360/api/products",
            method: "get",
            headers: {
                //Authorization:"Basic "+btoa("admin:123")
            },
            complete: function (xmlHttp, status) {
                if (xmlHttp.status == 200) {
                    var data = xmlHttp.responseJSON;
                    //console(data);
                    var str = "";
                    for (var i = 0; i < data.length; i++) {
                        var start = "<tr><td>"; //style='display:none;'
                        var end = "</td></tr>";
                        var k = "</td><td>";
                        var a1 = data[i].ProductId;
                        var a2 = data[i].ProductName;
                        var a3 = data[i].ProductDescription;
                        var a4 = data[i].Quantity;
                        var a5 = data[i].Price;
                        var a6 = data[i].CreatedDate;
                        if (a6 != null) {
                            a6 = data[i].CreatedDate.substr(0, 10);
                        }

                        var a7 = data[i].ModifiedDate;
                        if (a7 != null) {
                            a7 = data[i].ModifiedDate.substr(0, 10);
                        }
                        var a8 = data[i].LastPurchasedDate;
                        if (a8 != null) {
                            a8 = data[i].LastPurchasedDate.substr(0, 10);
                        }
                        var a9 = data[i].LastSoldDate;
                        if (a9 != null) {
                            a9 = data[i].LastSoldDate.substr(0, 10);
                        }
                        var action =
                            "<button class='btn btn-blue loadForSelectProducts'><i class='fa fa-plus-square' aria-hidden='true'></i></button>";
                        //action+="&nbsp;<button class='btn btn-danger loadForDelete'><i class='fa fa-trash' aria-hidden='true'></i></button>";
                        str +=
                        "<tr><td style='display:none;'>" +
                            a1 +
                            "</td><td>" +
                            a2 +
                            "</td><td>" +
                            a3 +
                            "</td><td>" +
                            a4 +
                            "</td><td>" +
                            a5 +
                            "</td><td style='display:none;'>" +
                            a6 +
                            "</td><td style='display:none;'>" +
                            a7 +
                            "</td><td style='display:none;'>" +
                            a8 +
                            "</td><td style='display:none;'>" +
                            a9 +
                            "</td><td>" +
                            action +
                            "</td></tr>";
                    }
                    str = str.replace(new RegExp("null", "g"), "-");
                    $("#list2 tbody").html(str);

                    $("#list2").DataTable();

                    
                } else {
                    $("#msg").html(xmlHttp.status + ":" + xmlHttp.statusText);
                }
            },
        });
    }

    //*************************************************************************************************************** */

    //done *************************************************************************************************************** */
    //Load invoice data in table

    function loadInvoiceData() {
        //show table
        //$("#mainlist").show(1000);
        var memoId = $("#sltautoId").text();
        // endpoint : GET api/memos/{memoID}/sells
        $.ajax({
            url: "https://localhost:44360/api/memos/" + memoId + "/sells",
            method: "get",
            headers: {
                //Authorization:"Basic "+btoa("admin:123")
            },
            complete: function (xmlHttp, status) {
                if (xmlHttp.status == 200) {
                    var data = xmlHttp.responseJSON;
                    //console(data);
                    var str = "";
                    var total=0;
                    for (var i = 0; i < data.length; i++) {
                        /* 
                                    SellId **auto
                                    MemoNumber  **memotable
                                    ProductId **productTable
                                    ProductName <<auto from product ID>> **product Table
                                    SellDate **current date
                                    Quantity
                                    Price
                                    */
                        
                        var a1 = data[i].SellId;
                        var a2 = data[i].MemoNumber;
                        var a3 = data[i].ProductId;
                        var a4 = data[i].ProductName;
                        var a5 = data[i].SellDate;
                        if (a5 != null) {
                            a5 = data[i].SellDate.substr(0, 10);
                        }
                        var a6 = data[i].Quantity;
                        var a7 = data[i].Price;
                        var qp=a6*a7;
                        total+=qp;
                        var action =
                            "<button class='btn btn-blue loadForUpdate'><i class='fa fa-pencil-square' aria-hidden='true'></i></button>";
                        action +=
                            "&nbsp;<button class='btn btn-red loadForDelete'><i class='fa fa-trash' aria-hidden='true'></i></button>";
                        str +=
                        "<tr>"+
                        
                            "<td style='display:none';>" +
                            a1 +
                            "</td><td style='display:none';>" +
                            a2 +
                            "</td><td style='display:none';>" +
                            a3 +
                            "</td><td>" +
                            a4 +
                            "</td><td style='display:none';>" +
                            a5 +
                            "</td><td>" +
                            a6 +
                            "</td><td>" +
                            a7 +
                            "</td><td>" +
                            qp+
                            "</td><td>" +
                            action +
                            "</td>"+
                        "</tr>";
                    }
                    //str=str.replace(new RegExp("null", 'g'), "-");
                    $("#mainlist tbody").html(str);
                    $("#total").text(total);
                    //alert(str);
                    //$("#mainlist").DataTable();

                   
                } else {
                    $("#msg").html(xmlHttp.status + ":" + xmlHttp.statusText);
                }
            },
        });
    }

    //******************************************************************************************************************************************-->
    //******************************************************************************************************************************************-->
    //******************************************************************************************************************************************-->
    //******************************************************************************************************************************************-->
    //******************************************************************************************************************************************-->
    //******************************************************************************************************************************************-->
    //*************************************************************************************************************** */
    // POST Information
    function postData() {
        /**
         * SellId **auto
          MemoNumber  **memotable
          ProductId **productTable
          ProductName <<auto from product ID>> **product Table
          SellDate **current date
          Quantity
          Price
         */

        // get memo data
        var memoId = $("#sltautoId").text();

        $("#sltMemoNumber").text();
        // $("#sltMemoDescription").text();
        //$("#sltCreatedOn").text();
        // $("#sltBelongsTo").text();
        // $("#sltStatus").text();
        // get product data 
        $("#slt2ProductId").text();
        $("#slt2ProductName").text();
        $("#slt2ProductDescription").text();
        $("#slt2Quantity1").text();
        $("#slt2Price1").text();



        $.ajax({
            url: "https://localhost:44360/api/memos/" + memoId + "/sells",
            method: "post",
            headers: {
                ContentType: "application/json",
            },

            data: {
                MemoNumber: $("#sltMemoNumber").text(),
                ProductId: $("#slt2ProductId").text(),
                ProductName: $("#slt2ProductName").text(),
                Quantity: $("#slt2Quantity1").val(),
                Price: $("#slt2Price1").val()
            },
            complete: function (xmlHttp, status) {
                if (xmlHttp.status == 201) {
                    $("#addToInvoicemsg").html($("#slt2ProductId").text() + " Added");

                    $("#slt2ProductId").text("");
                    $("#slt2ProductName").text("");
                    $("#slt2ProductDescription").text("");
                    $("#slt2Quantity1").val("");
                    $("#slt2Price1").val("");

                    $("#slt2Quantity").text("");
                    $("#slt2Price").text("");

                    loadInvoiceData();
                } else {
                    $("#addToInvoicemsg").html(xmlHttp.status + ":" + xmlHttp.statusText + ":" + xmlHttp.responseText);
                }
            },
            success: function () {
                var s = $("#ProductName").val() + "has been inserted successfully";
            },
        });
    }
    //******************************************************************************************************************************************-->
    //******************************************************************************************************************************************-->
    //******************************************************************************************************************************************-->
    //******************************************************************************************************************************************-->
    //******************************************************************************************************************************************-->
    //******************************************************************************************************************************************-->
    //*************************************************************************************************************** */
    //update data
    function updateData() {
        /*
        $("#updSellId").text(col1);
     $("#updMemoNumber").text(col2);
     $("#updProductId").text(col3);
     $("#updProductName").text(col4);
     $("#updSellDate").text(col5);
     $("#updQuantity").val(col6);
     $("#updPrice").val(col7);
        */
        var memoId = $("#sltautoId").text();
        var sellId = $("#updSellId").text();

        $.ajax({

            url: "https://localhost:44360/api/memos/" + memoId + "/sells/" + sellId,
            method: "put",
            headers:
            {
                ContentType: "application/json"
            },

            data:
            {
                MemoNumber: $("#updMemoNumber").text(),
                ProductId: $("#updProductId").text(),
                ProductName: $("#updProductName").text(),
                Quantity: $("#updQuantity").val(),
                Price: $("#updPrice").val()
            },
            complete: function (xmlHttp, status) {
                if (xmlHttp.status == 200) {
                    $("#updatemsg").html($("#updProductName").text() + " has Been Successfully Updated");

                    //empty update form
                    $("#updSellId").text("");
                    $("#updMemoNumber").text("");
                    $("#updProductId").text("");
                    $("#updProductName").text("");
                    $("#updSellDate").text("");
                    $("#updQuantity").val("");
                    $("#updPrice").val("");

                    loadInvoiceData();
                }
                else {
                    $("#updatemsg").html(xmlHttp.status + ":" + xmlHttp.statusText + ":" + xmlHttp.responseText);
                }
            }

        });
    }
    //******************************************************************************************************************************************-->
    //******************************************************************************************************************************************-->
    //******************************************************************************************************************************************-->
    //******************************************************************************************************************************************-->
    //******************************************************************************************************************************************-->
    //******************************************************************************************************************************************-->
    //*************************************************************************************************************** */
    function deleteData() {

        var memoId = $("#sltautoId").text();
        var sellId = $("#dltSellId").text();

        var id = $("#dltProductId").html();
        $.ajax({
            url: "https://localhost:44360/api/memos/" + memoId + "/sells/" + sellId,
            method: "delete",
            complete: function (xmlHttp, status) {
                if (xmlHttp.status == 204) {
                    $("#deletemsg").html(sellId + " has been deleted successfully");

                    //empty delete form
                    $("#dltSellId").text("");
                    $("#dltMemoNumber").text("");
                    $("#dltProductId").text("");
                    $("#dltProductName").text("");
                    $("#dltSellDate").text("");
                    $("#dltQuantity").text("");
                    $("#dltPrice").text("");
                    loadInvoiceData();
                }
                else {
                    $("#deletemsg").html(xmlHttp.status + ":" + xmlHttp.statusText + ":" + xmlHttp.responseText);
                }
            }
        });
    }

    //******************************************************************************************************************************************-->
    //******************************************************************************************************************************************-->
    //******************************************************************************************************************************************-->
    //******************************************************************************************************************************************-->
    //******************************************************************************************************************************************-->
    //******************************************************************************************************************************************-->
    //*************************************************************************************************************** */

});