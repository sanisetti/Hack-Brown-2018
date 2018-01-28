var isOn

chrome.storage.onChanged.addListener(function(changes, namespace) {
	for (key in changes) {
	  var storageChange = changes[key];
	  console.log('Storage key "%s" in namespace "%s" changed. ' +
	              'Old value was "%s", new value is "%s".',
	              key,
	              namespace,
	              storageChange.oldValue,
	              storageChange.newValue);
	  if (key == "pupilExtensionActive") {
	  	isOn = storageChange.newValue;
	  }
	}

});

chrome.storage.sync.set({'pupilExtensionActive': true}, function () {
	console.log("data saved");
	isOn = true
});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    if (request.status == "query")
      sendResponse({status: isOn});
  });




