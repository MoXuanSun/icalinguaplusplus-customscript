import customConfig from "./config.js";

const customMenuItems = [];
const eventList = [
	/**
	 * 	data{
			msgNodeRoot: msgNodeRoot,
			msgElements: {
				textElements: [],
				urlElements: [],
				videoElement: undefined,
				audioElement: undefined,
				imgElement: undefined,
				timeStamp: undefined,
			},
		}
	 */
	"newMessageCardCreated",
	"customMenuItemClick",
];

const staticFilePath = (function () {
	let scriptLocation = document.head.getElementsByTagName("script")[0].src;
	return scriptLocation.substring(-8, scriptLocation.length - 8) + "static/";
})();

const menu = document.createElement("div");
const items = ["计算文本中的算式", "翻译文本"];

let lastSelectedRange;

function simpleCalculator(a, b, type) {
	switch (type) {
		case "+":
			return a + b;
		case "-":
			return a - b;
		case "*":
			return a * b;
		case "/":
			if (b == 0) {
				return 0;
			}
			return a / b;
		default:
			return 0;
	}
}

// const formulaRegex = /\d+[\.\*\+/\-]+[0-9\.\*\+/\-]+(?![=])/g;
// const formulaNumberRegex = /(\d+\.?\d?)/g;
// const formulaSignRegex = /[\+\*/\-]/g;
// //不返回以便节省资源
// const formulaTestRegex = /(?=\d+[\.\*\+/\-]+[0-9\.\*\+/\-]+(?![=]))/;

function displayCustomMenu(x, y, show) {
	menu.style.display = show ? "block" : "none"; //将自定义的“右键菜单”显示出来
	menu.style.left = x + "px"; //设置位置，跟随鼠标
	menu.style.top = y + "px";
	menu.style.position = "absolute";
	menu.style.zIndex = 9999;
	menu.style.visibility = show ? "visible" : "hidden";
}

const itemsOnClickListener = [
	function (e) {
		//没有选中文本
		if (lastSelectedRange.startOffset == lastSelectedRange.endOffset) {
			console.log(lastSelectedRange);
			let content = lastSelectedRange.commonAncestorContainer.parentNode;
			//快捷计算器
			if (formulaTestRegex.test(content.textContent)) {
				let iterator = content.textContent.matchAll(formulaRegex);
				let signs;
				let numbers;
				let formula;
				let result;

				for (cell of iterator) {
					formula = cell[0];
					signs = formula.match(formulaSignRegex);
					numbers = formula.match(formulaNumberRegex);
					result = parseFloat(numbers[0]);
					for (let i = 0; i < signs.length; i += 1) {
						result = simpleCalculator(result, parseFloat(numbers[i + 1]), signs[i]);
						console.log(numbers[i + 1]);
						console.log(result);
					}
					console.log(result);
					content.innerHTML = content.innerHTML.replace(
						//不匹配已经修改过的
						formulaRegex,
						"<span style='text-decoration=underline;background-color:aqua;'>" +
							formula +
							"=" +
							result +
							"</span>",
					);
				}
			}
			// lastSelectedRange.commonAncestorContainer.textContent;
		} else {
			// lastSelectedRange.commonAncestorContainer.textContent
			// 	.to
			// 	.subString(lastSelectedRange.startOffset, lastSelectedRange.endOffset);
		}
	},
	function (e) {
		let content = lastSelectedRange.commonAncestorContainer.parentNode;
		let iframe = document.createElement("iframe");
		content.appendChild(iframe);
		// iframe.src = "https://space.bilibili.com/40203016";
		// window.open("https://www.baidu.com", "查看网址");
	},
];

const eventListenerListMap = (function () {
	let map = new Map();
	for (let i of eventList) {
		map.set(i, []);
	}
	return map;
})();

const mutationObConfig = {
	attributes: false,
	childList: true,
	subtree: false,
};

const messageCardHandler0 = function (messageNode) {
	//不为空说明是消息
	let data = {
		msgNodeRoot: messageNode,
		msgElements: {
			textElements: [],
			urlElements: [],
			videoElement: undefined,
			audioElement: undefined,
			imgElement: undefined,
			timestampElement: undefined,
		},
	};
	for (let child of messageNode.children) {
		// console.log(child.className);
		switch (child.className) {
			//图片
			case "vac-image-container vac-image-container-loading":
				// child.addEventListener("click", function (e) {
				// 	console.log("1");
				// });
				break;
			//时间戳
			case "vac-text-timestamp":
				data.timestampElement = child.lastElementChild;
				break;
			//语音信息
			case "vac-audio-message":
				// child.addEventListener("click", function (e) {
				// 	console.log("3");
				// });
				break;
			//视频信息
			case "vac-video-container":
				break;
			//文本/url
			default:
				for (let childchild of child.lastElementChild.children) {
					//超链接信息 需开启超链接高亮功能
					if (childchild.tagName == "A") {
						console.log(childchild);
						data.msgElements.urlElements.push(childchild.lastElementChild);
					} else if (childchild.tagName == "SPAN") {
						console.log(childchild);
						data.msgElements.textElements.push(childchild.lastElementChild);
					}
				}

			// child.addEventListener("click", function (e) {
			// 	if (menu.style.visibility == "hidden") {
			// 		displayCustomMenu(e.clientX, e.clientY, true);
			// 		lastSelectedRange = window.getSelection().getRangeAt(0);
			// 		// console.log(window.getSelection().getRangeAt(0));
			// 		//停止冒泡传递 https://www.cnblogs.com/Wayou/p/react_event_issue.html
			// 		e.stopPropagation();
			// 	} else {
			// 		displayCustomMenu(e.clientX, e.clientY, false);
			// 	}
			// });
		}
	}

	for (let listener of eventListenerListMap.get("newMessageCardCreated")) {
		listener({
			eventType: "newMessageCardCreated",
			data: data,
		});
	}

	//vac-image-container -- 图片

	//通过最后一个时间戳元素访问他的上一个兄弟元素,访问他的子节点，如果为空则说明是非文本消息
	// let messageContentNode =
	// 	msgNodeRoot.lastChild.previousElementSibling.lastElementChild.lastElementChild;

	//如果消息节点树不为空，说明有文字消息
	// if (messageContentNode != undefined) {
	//循环解析每一个节点		console.log(messageContentNode);
	// console.log(msgNodeRoot);
	// console.log(messageContentNode);
	// console.log(messageContentNode.parentNode.children);
	// }
};

const messageCardHandler = function (messageCardNodeRoot) {
	let msgNodeRoot = messageCardNodeRoot.lastChild.lastChild.lastChild.lastChild;
	if (msgNodeRoot == undefined) return;
	messageCardHandler0(msgNodeRoot);
};

const mutationOb = function (mutationsList, observer) {
	//这是一个临时的class 创建气泡时会出现 之后会变为空
	for (let mutation of mutationsList) {
		if (
			mutation.type === "childList" &&
			mutation.removedNodes.length === 0 &&
			mutation.addedNodes[0].className ===
				"vac-fade-message-enter vac-fade-message-enter-active"
		) {
			messageCardHandler(mutation.addedNodes[0]);
		}
	}
};
const observer = new MutationObserver(mutationOb);

const roomSelectedFunc = function (e) {
	let interval = setInterval(() => {
		console.log("test");
		let content =
			document.getElementsByClassName("vac-container-scroll")[0].lastChild.lastChild
				.lastElementChild;
		if (content.tagName == "SPAN") {
			console.log("roomSelected");
			// console.log(content);
			for (let childchild of content.children) {
				messageCardHandler(childchild);
			}
			observer.observe(content, mutationObConfig);
			clearInterval(interval);
		}
	}, 200);

	// e.stopPropagation();
};

(function init() {
	for (let i of customConfig.plugins) {
		import("./" + i + ".js").then(function (m) {
			m.moduleInit();
		});
	}

	if (document.getElementsByClassName("root")[0].getElementsByClassName("root") == undefined) {
		//列表消息容器的上一层可能也是root类的
		for (let i of document.getElementsByClassName("root")) {
			i.onclick = roomSelectedFunc;
		}
	} else {
		for (let i of document.getElementsByClassName("root")[0].getElementsByClassName("root")) {
			i.onclick = roomSelectedFunc;
		}
	}

	menu.className = "custom-right-menu";
	menu.style.visibility = "hidden";
	menu.style.display = "none";

	document.body.insertBefore(menu, document.getElementById("app"));
	for (let i = 0; i < items.length; i++) {
		let item = document.createElement("div");
		item.textContent = items[i];
		item.addEventListener("click", itemsOnClickListener[i]);
		menu.appendChild(item);
	}

	document.body.addEventListener("click", function (e) {
		if (menu.style.visibility != "hidden") {
			displayCustomMenu(0, 0, false);
		}
	});
})();

const stormJs = {
	registerEventListener: function (event, callback) {
		if (eventListenerListMap.has(event)) {
			let event_list = eventListenerListMap.get(event);
			event_list.push(callback);
		}
	},
	registerCustomMenuItem: function (itemName) {
		customMenuItems.append(itemName);
	},
	//这个函数未来会变动
	xhrGet: function xhrGet(xhr, url, responseType, header, callback, error) {
		xhr.open("GET", url, true);
		xhr.responseType = responseType;
		xhr.header = header;
		xhr.timeout = 5000;
		xhr.onreadystatechange = callback;
		xhr.onerror = error;
		xhr.ontimeout = error;
		try {
			xhr.send();
		} catch (e) {
			error(e);
		}
	},
};

export { staticFilePath, customConfig, stormJs };
