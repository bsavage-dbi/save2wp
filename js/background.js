var settings = new Store("settings", {});
var options = settings.toObject();
var wp_username = options['wp_username'];
var wp_password= options['wp_password'];
var wp_url= options['wp_url'];
var readability_token = options['readability_token'];

window.addEventListener("load", initialize);
document.getElementById("btnSave").addEventListener("click",handleClick);

function handleClick(){
	$(document).ready(function(){
	    saveToWordPress();
	});
}

function initialize(){
    $("#loading").hide();	
}

function saveToWordPress(){
	var readability_url = "https://www.readability.com/api/content/v1/parser";
	var source_url;
	var data;

	chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT},
	    function(tabs){
			$(document).ready(function(){
				source_url = tabs[0].url;
				
				if(source_url !== ''){
					 $.ajax({
				        dataType: 'json',
				        url: readability_url,
				        data: { url : source_url, token: readability_token },
				        xhr: function () {
					        var xhr = new window.XMLHttpRequest();
					        //Download progress
					        xhr.addEventListener("progress", function (evt) {
					            console.log(evt.lengthComputable);
					            if (evt.lengthComputable) {
					                var percentComplete = evt.loaded / evt.total;
					                progressElem.html(Math.round(percentComplete * 100) + "%");
					            }
					        }, false);
					        	return xhr;
						    },
					    beforeSend: function () {
					    	$('#popupform').hide();
					        $('#loading').show();
					    }
				    }).done(function(json){
				    	$("#loading").hide();
				    	createPost(json); 		//POST data using WP JSON REST API
				    }).error(function(data){
				    	console.log('Something wrong with '+data);
				    });
				}			
			});
	   }
	);


	
}

function createPost(json){
	var wp_title = json['title'];
	var wp_content = json['content'];
	var inTags = document.getElementById('txtTags').value;
	var wp_tags = inTags.split(',');
	var wp_categories = ['aex2bxc', 'cat1'];
	var wp_source = json['url'];

	$(document).ready(function(){
		$.ajax({ 
			dataType: "json",
			type : "POST",
			url: wp_url,
			headers: { 
				// 'Access-Control-Allow-Origin' : 'all',
				'Content-type': 'application/x-www-form-urlencoded', 
				'Authorization': 'Basic '+btoa(wp_username+":"+wp_password)
			},
			data: {
				'data[title]' : wp_title,
				'data[x-tags]':wp_tags,
				'data[x-categories]': wp_categories,
            	'data[content_raw]' :  wp_content,
            	'data[post_meta]': [{'key' : 'source_url', 'value' : json['url']}],
            	'data[status]' : 'publish'
			},
			xhr: function () {
		        var xhr = new window.XMLHttpRequest();
		        //Download progress
		        xhr.addEventListener("progress", function (evt) {
		            console.log(evt.lengthComputable);
		            if (evt.lengthComputable) {
		                var percentComplete = evt.loaded / evt.total;
		                progressElem.html(Math.round(percentComplete * 100) + "%");
		            }
		        }, false);
		        	return xhr;
			    },
		    beforeSend: function () {
		    	$('#popupform').hide();
		        $('#loading').show();
		    }			 
		}).done(function(data){
			$("#loading").hide();

			alert("Article saved to WordPress");
			window.close();
		}).error(function(data){
	    	console.log('Something wrong with '+data);
	    });

	});
}