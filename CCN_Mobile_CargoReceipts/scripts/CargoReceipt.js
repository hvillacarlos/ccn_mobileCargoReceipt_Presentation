var lstCity;
var clickedAWBPrefix;
var clickedAWBSuffix;
    lstCity = new kendo.data.DataSource
               (
                    {
                         transport:
                        {
                            
                            read:
                            {
                                
                                //url: "http://localhost:2198/BusinessLogic/Service1.svc/getCities",
                                url: "http://itdpaula/CargoReceipt/Service1.svc/GetCities",
                                data:
                                {
                                    Accept: "application/json"
                                }
                            }
                        },
                    schema: {data: "data"}
                    }
               );
function getCargoReceiptDetail()
{   
   

    var searchURL="http://172.16.202.166/CargoReceipt/Service1.svc/GetCargoReceiptRecords?" +
               "AwbPrefix="+clickedAWBPrefix+"&AwbSuffix="+clickedAWBSuffix+
                "&IssuingFromDate=&IssuingToDate="+
                "&AcceptanceFromDate=&AcceptanceToDate="+
               "&Origin=&Destination="+
                "&companyId=TRAINING";//+document.getElementById("TE").value;   
   
   $.ajax({

            type: "GET",
            contentType: "application/json; charset=utf-8",
            url: searchURL,
            cache: false,
            async: false,
            corssDomain: true,
            dataType: "json",
            success: function (data) {
                var result = data;
                
                document.getElementById("AWBNoTxtDetail").value=result[0].AWBNumber;
                document.getElementById("txtIssuingDateDetail").value=result[0].IssuingDate;
                document.getElementById("txtAcceptanceDateDetail").value=result[0].AcceptanceDate;
                document.getElementById("txtOriginDetail").value=result[0].Origin;
                document.getElementById("txtDestinationDetail").value=result[0].Destination;
                /*document.getElementById("txtLastFWBDetail").value=result[0].LastFWBRecdDateTime;
                document.getElementById("txtLastFSUDetail").value=result[0].LastRCSRecdDateTime;
                document.getElementById("txtLastPrintedDetail").value=result[0].LastPrintDateTime;*/
                    
                }
        });
    window.location.href = "#tabstrip-CargoDetail"

}
function searchCargoReceipts()
{   
   
    var AWBPrefix=document.getElementById("AWBNoTxt").value.substring(0,3);
    var AWBSuffix=document.getElementById("AWBNoTxt").value.substring(3);
    clickedAWBSuffix=AWBSuffix;
    clickedAWBPrefix=AWBPrefix;
    var searchURL="http://172.16.202.166/CargoReceipt/Service1.svc/GetCargoReceiptRecords?" +
               "AwbPrefix="+AWBPrefix+"&AwbSuffix="+AWBSuffix+
                "&IssuingFromDate="+document.getElementById("txtIssuedFromDate").value+"&IssuingToDate="+document.getElementById("txtIssuedToDate").value+
                "&AcceptanceFromDate="+document.getElementById("txtAcceptanceFromDate").value+"&AcceptanceToDate="+document.getElementById("txtAcceptanceToDate").value+
               "&Origin="+document.getElementById("drpOrigin").value+"&Destination="+document.getElementById("drpDestination").value+""+
                "&companyId=TRAINING";//+document.getElementById("TE").value;
    /*searchURL="http://172.16.202.166/CargoReceipt/Service1.svc/GetCargoReceiptRecords?AwbPrefix=&AwbSuffix=&IssuingFromDate="+
    "&IssuingToDate=&AcceptanceFromDate=&AcceptanceToDate=&Origin=SIN&Destination=LAX&companyId=TRAINING"*/
   
   $.ajax({

            type: "GET",
            contentType: "application/json; charset=utf-8",
            url: searchURL,
            cache: false,
            async: false,
            corssDomain: true,
            dataType: "json",
            success: function (data) {
                
                var result = data;
                var items=[];
                
                $.each(result, function (key, value) 
                    {     
                        items.push('<li class><a class="km-listview-link" data-role="listview-link" onclick="getCargoReceiptDetail()">' + value.AWBNumber + '</a></li>');                                            
                     });
                
                    $('#searchResult').html(items.join(''));
                    
                }
        });
    window.location.href = "#lookup-layout"

}
function PageLoad()
{
/*    var x=document.getElementById("txtIssuedFromDate");
    var CurrentDate=new Date();
    var CurrentMonth;*/
    document.getElementById("AWBNoTxt").value="61837349454";
    LoadCity();
/*    CurrentMonth=(CurrentDate.getMonth()+1).toString();
    if(CurrentMonth.length==1) 
        CurrentMonth="0"+CurrentMonth;  
    
    x.value=CurrentDate.getFullYear().toString()+"-"+CurrentMonth+"-"+CurrentDate.getDate().toString();*/
    
}
function LoadCity(Object)
{
   var cityURL="http://172.16.202.166/CargoReceipt/Service1.svc/GetCities";
    $.ajax({

            type: "GET",
            contentType: "application/json; charset=utf-8",
            url: cityURL,
            async: false,
            corssDomain: true,
            dataType: "json",
            success: function (data) {
                
                    var result = data;
                      
                    $.each(result, function (key, value) 
                    {
                        var appenddata = "<option value = '" + value.CityCode + " '>" + value.CityName + " </option>";
                        $('#drpOrigin').html($('#drpOrigin').html() + appenddata);
                        $('#drpDestination').html($('#drpDestination').html() + appenddata);
                     
                     });
                }
        });
    
 
}
        







 

    function showBloggers(e) {

        bloggersData.fetch();

    }

