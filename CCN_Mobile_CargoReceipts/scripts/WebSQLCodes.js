$data.Entity.extend("CargoReceiptDetails", {
    AWBNumber: { type: 'string' },
    IssuingDate: { type: 'string' },
    AcceptanceDate: { type: 'string' },
    Origin: { type: 'string' },
    Destination: { type: 'string' },
    Notification: { type: 'string' }
});
$data.Entity.extend("SettingDetails", {
    UserName: { type: 'string' },
    Status: { type: 'string' },
    CompanyID: { type: 'string' },    
    DisplayCount: { type: 'string' },
    Notification: { type: 'string' },
    AutoOverride: { type: 'string' }
});

$data.EntityContext.extend("CargoReceipt", {
    CargoReceiptList: { type: $data.EntitySet, elementType: CargoReceiptDetails }
});
$data.EntityContext.extend("Setting", {
    Settings: { type: $data.EntitySet, elementType: SettingDetails }
});
var CargoReceiptDB = new CargoReceipt({provider: 'webSql', databaseName:'MyCargoReceiptDB',}); 
var SettingsDB = new Setting({provider: 'webSql', databaseName:'MySettingsDB',}); 
CargoReceiptDB.onReady(function()
{
    
});
SettingsDB.onReady(function()
{
    
});
function checkSession()
{
    
    
     
     var db = window.openDatabase("MySettingsDB", "", "My WebSQL test database", 5*1024*1024);
    
                    var sqlstr="SELECT * FROM Settings where Status=1";                     
	                    db.transaction(
		                    function(tx)
                            {                                  
                                    tx.executeSql(sqlstr, [], function (tx, results) 
                                    {               
                                        if(results.rows.length>0)                                        
                                      window.location.href = "#tabstrip-home"    
                                        else
                                            window.location.href = "#tabstrip-login"
                                        
                                    });
		                    }
	                    )

    window.location.href = "#tabstrip-history"    
}
function refreshHistory()
{
     $("#searchHistory").empty();  
     var db = window.openDatabase("MyCargoReceiptDB", "", "My WebSQL test database", 5*1024*1024);
    
                    var sqlstr="SELECT * FROM CargoReceiptList Order By AWBNumber"; 
                    var items=[];
	                    db.transaction(
		                    function(tx)
                            {                                  
                                    tx.executeSql(sqlstr, [], function (tx, results) 
                                    {               
                                        if(results.rows.length>0)
                                        {
                                            for(ctr=0;ctr<results.rows.length;ctr++)
                                            {
                                                var result = results.rows.item(ctr);
                                                items.push('<li class><a class="km-listview-link" data-role="listview-link" onclick="getCargoReceiptDetail(\'' + result.AWBNumber + '\',\'' + result.Notification + '\');">' + result.AWBNumber + '</a></li>');                                                                                            
                                            }
                                            $('#searchHistory').html(items.join(''));        
                                        }
                                        
                                    });
		                    }
	                    )

    window.location.href = "#tabstrip-history"
}
function clearHistory()
{
     var db = window.openDatabase("MyCargoReceiptDB", "", "My WebSQL test database", 5*1024*1024);
    
    db.transaction(
		                function(tx){
                                tx.executeSql('DELETE FROM CargoReceiptList');
		                }
    )
    refreshHistory();
}
function setNotificationSetting(passedAWBNumber)
{ 
    if(passedAWBNumber=="false")
    { 
        $("#Notification-switch").kendoMobileSwitch({
                                                checked: false,
                                                onLabel: "YES",
                                                offLabel: "NO"
                                            });
        $("#Notification").hide();
    }
    else if(passedAWBNumber=="true")
    {
        $("#Notification-switch").kendoMobileSwitch({
                                                checked: true,
                                                onLabel: "YES",
                                                offLabel: "NO"
                                            });
    }
    else
    { 
         var db = window.openDatabase("MyCargoReceiptDB", "", "My WebSQL test database", 5*1024*1024);

                    var sqlstr="SELECT * FROM CargoReceiptList Where AWBNumber='"+passedAWBNumber+"' and Notification='true'"; 
	                    db.transaction(
		                    function(tx)
                            {                               
                                    tx.executeSql(sqlstr, [], function (tx, results) 
                                    {                                   
                                        if(results.rows.length>0)
                                        {          
                                            $("#Notification-switch").kendoMobileSwitch({
                                                checked: true,
                                                onLabel: "YES",
                                                offLabel: "NO"
                                            });
                                            
                                        }
                                        else
                                        {
                                            $("#Notification-switch").kendoMobileSwitch({
                                                checked: false,
                                                onLabel: "YES",
                                                offLabel: "NO"
                                            });
                                            
                                        }

                                                                                     
                                            
                                    });
		                    }
	                    )          
    }

}
function addToHistory()
{    
    var db = window.openDatabase("MyCargoReceiptDB", "", "My WebSQL test database", 5*1024*1024);
    
    
                    var sqlstr="SELECT * FROM CargoReceiptList Where AWBNumber='"+document.getElementById("AWBNoTxtDetail").value+"'"; 
	                    db.transaction(
		                    function(tx)
                            {                                  
                                    tx.executeSql(sqlstr, [], function (tx, results) 
                                    {                       
                                        var CargoReceiptInfo = new CargoReceiptDetails();            
                                        if(results.rows.length==0)
                                        {                                                 
                                                    
                                                    CargoReceiptInfo.AWBNumber=document.getElementById("AWBNoTxtDetail").value;
                                                    CargoReceiptInfo.IssuingDate=document.getElementById("txtIssuingDateDetail").value;
                                                    CargoReceiptInfo.AcceptanceDate=document.getElementById("txtAcceptanceDateDetail").value;  
                                                    CargoReceiptInfo.Origin=document.getElementById("txtOriginDetail").value;
                                                    CargoReceiptInfo.Destination=document.getElementById("txtDestinationDetail").value;
                                                    CargoReceiptInfo.Notification=document.getElementById("Notification-switch").checked; 
                
                                                    CargoReceiptDB.add(CargoReceiptInfo);
                                                    CargoReceiptDB.saveChanges();                                           
                                        }                                 
                                    });
                                    sqlstr="UPDATE CargoReceiptList SET Notification='"+document.getElementById("Notification-switch").checked+"' where AWBNumber='"+document.getElementById("AWBNoTxtDetail").value+"'"                                    
                                    tx.executeSql(sqlstr);
		                    }
	                    )
  
}
