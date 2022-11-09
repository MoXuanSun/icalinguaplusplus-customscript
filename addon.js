/** @format */

window.onload = function () {
	let customScriptLocation = document.head.getElementsByTagName("script")[0].src;
	let customScriptNode = document.createElement("script");
	customScriptNode.type = "module";
	customScriptNode.src =
		customScriptLocation.substring(-8, customScriptLocation.length - 8) + "customScripts\\storm.js";
	document.head.appendChild(customScriptNode);	
};
