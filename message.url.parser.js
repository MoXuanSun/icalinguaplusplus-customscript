import { staticFilePath, stormJs } from "./storm.js";

const urlTitleCacheMap = new Map();

export function moduleInit() {
	stormJs.registerEventListener("newMessageCardCreated", function (e) {
		console.log(e);
		// for (let i of e.data.msgElements.urlElements) {
		// 	//如果节点是a标签，说明这是一个链接
		// 	let content = i.lastElementChild;
		// 	//去掉下划线 影响美感
		// 	content.parentNode.style = "text-decoration:none;";
		// 	content.textContent = " ";
		// 	let superlinkicon = document.createElement("img");
		// 	superlinkicon.src = staticFilePath + "superlink.png";
		// 	superlinkicon.style = "width:15px;height:15px;padding-right:5px;vertical-align:middle;";
		// 	//获取上一级a标签
		// 	let url = content.parentNode.href;
		// 	let domain = url.split("/")[2];
		// 	let img = document.createElement("img");
		// 	//终于解决对齐的问题了！！！https://segmentfault.com/q/1010000006045085
		// 	img.style = "width:15px;height:15px;vertical-align:middle;";
		// 	if (domain.split(".").length > 2) {
		// 		img.src = "https://api.xinac.net/icon/?url=https://" + domain;
		// 	} else {
		// 		img.src = "https://api.xinac.net/icon/?url=https://www." + domain;
		// 	}
		// 	// console.log(img.src);
		// 	let title = document.createElement("span");
		// 	title.style = "width:15px;height:15px;padding-left:5px;vertical-align:middle;";
		// 	if (!urlTitleCacheMap.has(url)) {
		// 		let xhr = new XMLHttpRequest();
		// 		// console.log(url);
		// 		stormJs.xhrGet(
		// 			xhr,
		// 			url,
		// 			"document",
		// 			{
		// 				"user-agent":
		// 					"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36",
		// 			},
		// 			function (e) {
		// 				if (xhr.readyState == 4 && xhr.status == 200) {
		// 					if (
		// 						xhr.response.lastElementChild != undefined &&
		// 						xhr.response.lastElementChild.firstElementChild != undefined
		// 					) {
		// 						let title_node;
		// 						let title_txt;
		// 						//b站个人空间直接用xhr获取会导致title不全，是因为动态加载的原因，访问的时候还没有加载
		// 						if (domain === "space.bilibili.com") {
		// 							//复用xhr
		// 							// console.log(url.split("/")[3].split("?")[0]);
		// 							// xhrGet(
		// 							// 	xhr,
		// 							// 	"https://api.bilibili.com/x/space/acc/info?mid=" +
		// 							// 		url.split("/")[3].split("?")[0],
		// 							// 	{
		// 							// 		"user-agent":
		// 							// 			"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36",
		// 							// 	},
		// 							// 	function () {
		// 							// 		if (xhr.readyState == 4 && xhr.status == 200) {
		// 							// 			let json = JSON.parse(xhr.response);
		// 							// 			// console.log(json);
		// 							// 			if (json.data.name == undefined) {
		// 							// 				xhr.abort();
		// 							// 				xhr.open(
		// 							// 					"GET",
		// 							// 					"https://api.bilibili.com/x/space/acc/info?mid=" +
		// 							// 						url.split("/")[3].split("?")[0],
		// 							// 					true
		// 							// 				);
		// 							// 				xhr.send();
		// 							// 			} else {
		// 							// 				title.textContent = json.data.name + "的个人空间";
		// 							// 				// console.log(title_txt);
		// 							// 				urlTitleCacheMap.set(
		// 							// 					url,
		// 							// 					json.data.name + "的个人空间"
		// 							// 				);
		// 							// 			}
		// 							// 		}
		// 							// 	}
		// 							// );
		// 							console.log(xhr.response);
		// 							title.textContent = url;
		// 							console.log(title_txt);
		// 							urlTitleCacheMap.set(url, url);
		// 						} else {
		// 							title_node =
		// 								xhr.response.lastElementChild.firstElementChild.getElementsByTagName(
		// 									"title",
		// 								)[0];
		// 							console.log(xhr.response);
		// 							title_txt = title_node.textContent;
		// 							if (url.length > 80) {
		// 								url = url.substring(0, 80) + "...";
		// 							}
		// 							if (title_txt == "") {
		// 								title_txt = url;
		// 							}
		// 							title.textContent = title_txt;
		// 							// console.log(title_txt);
		// 							urlTitleCacheMap.set(url, title_txt);
		// 						}
		// 					} else {
		// 						if (url.length > 80) {
		// 							url = url.substring(0, 80) + "....";
		// 						}
		// 						title_txt = url;
		// 						title.textContent = title_txt;
		// 						urlTitleCacheMap.set(url, title_txt);
		// 					}
		// 				}
		// 			},
		// 			function (e) {
		// 				console.log("加载网站：" + url + " 时出现错误");
		// 				if (url.length > 80) {
		// 					url = url.substring(0, 80) + "....";
		// 				}
		// 				title.textContent = url;
		// 				// console.log(url);
		// 				urlTitleCacheMap.set(url, url);
		// 			},
		// 		);
		// 	} else {
		// 		title.textContent = urlTitleCacheMap.get(url);
		// 	}
		// 	content.appendChild(superlinkicon);
		// 	content.appendChild(img);
		// 	content.appendChild(title);
		// }
		//如果是span节点 说明是文本
		// if (i.tagName == "SPAN") {
		//
		// }
	});
	// stormJs.registerEventListener("customMenuItemClick", function () {
	// 	console.log("!!");
	// });
}
