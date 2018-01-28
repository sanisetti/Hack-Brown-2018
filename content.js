$(document).ready(function () {

	console.log("Loaded Page")
  var numRequests = 0;
	$('*').each(function () {
		if ($(this).is('img')) {
			console.log(numRequests);
			if(numRequests >= 5){
				return;
			}
			var image = this;
			console.log($(this).attr('src'))
			if (!$(this).attr('alt')) {
				console.log("no alt!")
				numRequests = numRequests + 1;
				sourceImageUrl = $(this).attr('src');

				 // Replace the subscriptionKey string value with your valid subscription key.
				 var subscriptionKey = "6d4d15f30dcc42ba81e90db3b638b2ae";

				 // Replace or verify the region.
				 //
				 // You must use the same region in your REST API call as you used to obtain your subscription keys.
				 // For example, if you obtained your subscription keys from the westus region, replace
				 // "westcentralus" in the URI below with "westus".
				 //
				 // NOTE: Free trial subscription keys are generated in the westcentralus region, so if you are using
				 // a free trial subscription key, you should not need to change this region.
				 var uriBase = "https://westcentralus.api.cognitive.microsoft.com/vision/v1.0/analyze";

				 // Request parameters.
				 var params = {
						 "visualFeatures": "Description",
						 "details": "",
						 "language": "en",
				 };

				 // Display the image.
				 //var sourceImageUrl = document.getElementById("inputImage").value;
				 //document.querySelector("#sourceImage").src = sourceImageUrl;

				 // Perform the REST API call.
				 $.ajax({
						 url: uriBase + "?" + $.param(params),

						 // Request headers.
						 beforeSend: function(xhrObj){
								 xhrObj.setRequestHeader("Content-Type","application/json");
								 xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
						 },

						 type: "POST",

						 // Request body.
						 data: '{"url": ' + '"' + sourceImageUrl + '"}',
				 })

				 .done(function(data) {
						 // Show formatted JSON on webpage.
						 //$("#responseTextArea").val(JSON.stringify(data, null, 2));
						 var obj = JSON.parse(JSON.stringify(data, null, 2));
						 console.log(obj.description.captions[0].text);
						 $(image).attr('alt', obj.description.captions[0].text);
				 })

				 .fail(function(jqXHR, textStatus, errorThrown) {
						 // Display error message.
						 var errorString = (errorThrown === "") ? "Error. " : errorThrown + " (" + jqXHR.status + "): ";
						 errorString += (jqXHR.responseText === "") ? "" : jQuery.parseJSON(jqXHR.responseText).message;
						 console.log(errorString);
				 });
			}
			else {
				if($(this).attr('alt').split(" ").length <= 2){
					numRequests = numRequests + 1;
					sourceImageUrl = $(this).attr('src');

					 // Replace the subscriptionKey string value with your valid subscription key.
					 var subscriptionKey = "6d4d15f30dcc42ba81e90db3b638b2ae";

					 // Replace or verify the region.
					 //
					 // You must use the same region in your REST API call as you used to obtain your subscription keys.
					 // For example, if you obtained your subscription keys from the westus region, replace
					 // "westcentralus" in the URI below with "westus".
					 //
					 // NOTE: Free trial subscription keys are generated in the westcentralus region, so if you are using
					 // a free trial subscription key, you should not need to change this region.
					 var uriBase = "https://westcentralus.api.cognitive.microsoft.com/vision/v1.0/analyze";

					 // Request parameters.
					 var params = {
							 "visualFeatures": "Description",
							 "details": "",
							 "language": "en",
					 };

					 // Display the image.
					 //var sourceImageUrl = document.getElementById("inputImage").value;
					 //document.querySelector("#sourceImage").src = sourceImageUrl;

					 // Perform the REST API call.
					 $.ajax({
							 url: uriBase + "?" + $.param(params),

							 // Request headers.
							 beforeSend: function(xhrObj){
									 xhrObj.setRequestHeader("Content-Type","application/json");
									 xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
							 },

							 type: "POST",

							 // Request body.
							 data: '{"url": ' + '"' + sourceImageUrl + '"}',
					 })

					 .done(function(data) {
							 // Show formatted JSON on webpage.
							 //$("#responseTextArea").val(JSON.stringify(data, null, 2));
							 var obj = JSON.parse(JSON.stringify(data, null, 2));
							 console.log(obj.description.captions[0].text);
							 $(image).attr('alt', obj.description.captions[0].text);
					 })

					 .fail(function(jqXHR, textStatus, errorThrown) {
							 // Display error message.
							 var errorString = (errorThrown === "") ? "Error. " : errorThrown + " (" + jqXHR.status + "): ";
							 errorString += (jqXHR.responseText === "") ? "" : jQuery.parseJSON(jqXHR.responseText).message;
							 console.log(errorString);
					 });

				}
			}
		}
	})
})
