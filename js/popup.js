var toggleOn = false
console.log("javascript loaded")

chrome.storage.sync.get("pupilExtensionActive", function(response) {
	console.log(response.pupilExtensionActive)
	bg = document.getElementById("background");
	if (!(response.pupilExtensionActive)) {
		toggleOn = false
		if (!(background.classList.contains("off"))) {
			bg.classList.add('off');
		}
		if (!power.classList.contains("down")) {
			power.classList.add("down");
		} 
	} else {
		toggleOn = true
	}
})

document.getElementById("background").addEventListener("click", function () {

	if (!toggleOn) {
		this.classList.remove('off');
		toggleOn = true;

		// save this setting in browser storage
		chrome.storage.sync.set({'pupilExtensionActive': true}, function () {
			
		});

	} else {
		this.classList.add('off');
		toggleOn = false;

		// save this setting in browser storage
		chrome.storage.sync.set({'pupilExtensionActive': false}, function () {
			console.log("data saved");
		});
	}

	var power = document.getElementById("power");
	if (!power.classList.contains("down")) {
		power.classList.add("down");
	} else {
		power.classList.remove("down");
	}
})

chrome.storage.onChanged.addListener(function(changes, namespace) {
	for (key in changes) {
	  var storageChange = changes[key];
	  console.log('Storage key "%s" in namespace "%s" changed. ' +
	              'Old value was "%s", new value is "%s".',
	              key,
	              namespace,
	              storageChange.oldValue,
	              storageChange.newValue);
	}
});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    if (request.startRequest == true)
      sendResponse({startResponse: toggleOn});
  });