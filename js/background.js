// 匹配显示pageaction
// chrome.runtime.onInstalled.addListener(function(){
//     chrome.declarativeContent.onPageChanged.removeRules(undefined, function(){
//         chrome.declarativeContent.onPageChanged.addRules([
//             {
//                 conditions: [
//                     // 只有打开百度才显示pageAction
//                     new chrome.declarativeContent.PageStateMatcher({pageUrl: {urlContains: 'baidu.com'}})
//                 ],
//                 actions: [new chrome.declarativeContent.ShowPageAction()]
//             }
//         ]);
//     });
// });
// 添加右键菜单
// chrome.contextMenus.create({
//     title: "测试右键菜单",
//     onclick: function(){alert('您点击了右键菜单！');}
// });


// //监听所有请求
// chrome.webRequest.onCompleted.addListener(function(details){
//     // alert(JSON.stringify(details.url))
//     // alert(JSON.stringify(details))
// 	// 请求完毕，返回的相关数据，都在details中
// 	// 拿到数据后，可以通过chrome.extension.sendMessage({msg:"getNetworkResource", data:details});将数据通知popup.html
// },{urls: ["<all_urls>"]},["responseHeaders"]);
