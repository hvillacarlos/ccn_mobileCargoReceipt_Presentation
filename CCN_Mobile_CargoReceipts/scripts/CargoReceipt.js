var lstCity;
var clickedAWBPrefix;
var clickedAWBSuffix;
var loggedCompanyID=1111;
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
function loginAuthentication()
{    

    
    
    var RandomValue=Math.random();
    var searchURL="http://172.16.202.166/CargoReceipt/Service1.svc/Login?CompanyID="+document.getElementById("CompanyID").value+"&Username="+document.getElementById("Username").value+"&Password="+document.getElementById("password").value+"&rand="+RandomValue;


   $.ajax({

            type: "GET",
            contentType: "application/json; charset=utf-8",
            url: searchURL,
            cache: false,
            async: false,
            corssDomain: true,
            dataType: "json",
            success: function (data) {
                if(data.Status==null)
                {
                        $('#login-message').text("Login failed.");
                }   
                else
                {
                    
                    saveSetting(document.getElementById("CompanyID").value,document.getElementById("Username").value,document.getElementById("password").value);    
                }
                
                
                    
                }
        });
    
    //window.location.href = "Login.html"    

}
function shareCargoReceipt()
{
    document.getElementById("AWBNoTxtShare").value=document.getElementById("AWBNoTxtDetail").value;
    window.location.href = "#tabstrip-share";    
}
function sharePrompt()
{
    alert("Successfully Shared");
    
}
function getCargoReceiptDetail(passedAWBNumber,NotificationSetting)
{   
   
    clickedAWBPrefix=passedAWBNumber.substring(0,3);
    clickedAWBSuffix=passedAWBNumber.substring(4);
    
    var RandomValue=Math.random();
    var searchURL="http://172.16.202.166/CargoReceipt/Service1.svc/GetCargoReceiptRecords?" +
               "AwbPrefix="+clickedAWBPrefix+"&AwbSuffix="+clickedAWBSuffix+
                "&IssuingFromDate=&IssuingToDate="+
                "&AcceptanceFromDate=&AcceptanceToDate="+
               "&Origin=&Destination="+
                "&companyId=TRAINING&rand="+RandomValue;//+document.getElementById("TE").value;   

   $("#Notification").show();
   if(NotificationSetting==" ")       
        setNotificationSetting(passedAWBNumber);       
    else
        setNotificationSetting(NotificationSetting);
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
                
                document.getElementById("AWBNoTxt").value=clickedAWBPrefix+clickedAWBSuffix;
                document.getElementById("AWBNoTxtDetail").value=result[0].AWBNumber;
                document.getElementById("txtIssuingDateDetail").value=result[0].IssuingDate;
                document.getElementById("txtAcceptanceDateDetail").value=result[0].AcceptanceDate;
                document.getElementById("txtOriginDetail").value=result[0].Origin;
                document.getElementById("txtDestinationDetail").value=result[0].Destination;
                
                if(result[0].CompleteDetails=="0")
                    setNotificationSetting("false"); 
                
                /*document.getElementById("txtLastFWBDetail").value=result[0].LastFWBRecdDateTime;
                document.getElementById("txtLastFSUDetail").value=result[0].LastRCSRecdDateTime;
                document.getElementById("txtLastPrintedDetail").value=result[0].LastPrintDateTime;*/
                    
                }
        });
    window.location.href = "#tabstrip-CargoDetail"

}
function searchCargoReceipts()
{   
    var RandomValue=Math.random();
    var AWBPrefix=document.getElementById("AWBNoTxt").value.substring(0,3);
    var AWBSuffix=document.getElementById("AWBNoTxt").value.substring(3);
    
    var searchURL="http://172.16.202.166/CargoReceipt/Service1.svc/GetCargoReceiptRecords?" +
               "AwbPrefix="+AWBPrefix+"&AwbSuffix="+AWBSuffix+
                "&IssuingFromDate="+document.getElementById("txtIssuedFromDate").value+"&IssuingToDate="+document.getElementById("txtIssuedToDate").value+
                "&AcceptanceFromDate="+document.getElementById("txtAcceptanceFromDate").value+"&AcceptanceToDate="+document.getElementById("txtAcceptanceToDate").value+
               "&Origin="+document.getElementById("drpOrigin").value+"&Destination="+document.getElementById("drpDestination").value+""+
                "&companyId=TRAINING&rand="+RandomValue;//+document.getElementById("TE").value;
    //earchURL="http://172.16.202.166/CargoReceipt/Service1.svc/GetCargoReceiptRecords?AwbPrefix=&AwbSuffix=&IssuingFromDate="+
    //&IssuingToDate=&AcceptanceFromDate=&AcceptanceToDate=&Origin=SIN&Destination=LAX&companyId=TRAINING&rand="+RandomValue;

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
                        items.push('<li class><a class="km-listview-link" data-role="listview-link" onClick="getCargoReceiptDetail(\'' + value.AWBNumber + '\',\' \');">' + value.AWBNumber + '</a></li>');                                            
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
    //document.getElementById("AWBNoTxt").value="61837349454";
    checkSession();    
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
                      
                    $('#drpOrigin').html($('#drpOrigin').html() + "<option > </option>");
                    $('#drpDestination').html($('#drpDestination').html() + "<option> </option>");
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


 function authenticateUser() 
 {
     //PageLoad();
     window.location.href = "mainpage.html"
      //app.application.navigate("mainpage.html");
 }

