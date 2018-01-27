$(document).ready(function () {
	
	console.log("Loaded Page")

	$('img').each(function () {
		console.log("found an image")
		if (!$(this).attr('alt')) {
			console.log("no alt!")
		}
	})

})
