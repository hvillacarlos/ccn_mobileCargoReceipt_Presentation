(function (global) {
    var mobileSkin = "",
        app = global.app = global.app || {};

    
    document.addEventListener("deviceready", onDeviceReady, false);
    document.addEventListener("touchstart", function() {}, false);
    
    function onDeviceReady() 
    {
       navigator.splashscreen.hide();
        $(document.body).height(window.innerHeight);
        document.getElementById('btnOpenPDF').onclick = function() 
        {
       //var app = new Application();
           app.Run();
         }
    }                                                    
     function Application() { }

            Application.prototype.Run = function() {
        	if (device.uuid == "e0101010d38bde8e6740011221af335301010333" || device.uuid == "e0908060g38bde8e6740011221af335301010333") {
        		alert("Not Supported in Simulator.");
             	}
        	else {
        		var infoDiv = document.getElementById("infoField");
        		var path = this.getWorkingFolder().replace('http://', 'file://') + "Sample1.pdf";
        		infoDiv.innerText = path;
                
        		if (device.platform === 'Android') {
        			window.open(path, '_system');
        		}
        		else {
        			window.open(path, '_blank');
        		}
        	}
        }

            Application.prototype.getWorkingFolder = function() {
            	var path = window.location.href.replace('index.html', '');
            	return path;
            }
        
    app.application = new kendo.mobile.Application(document.body, { layout: "tabstrip-layout"});

    app.changeSkin = function (e) {
        if (e.sender.element.text() === "Flat") {
            e.sender.element.text("Native");
            mobileSkin = "flat";
        }
        else {
            e.sender.element.text("Flat");
            mobileSkin = "";
        }

        app.application.skin(mobileSkin);
    };
})(window);