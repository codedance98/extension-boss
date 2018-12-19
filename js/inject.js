/*
* @Author: Marte
* @Date:   2018-08-29 17:04:07
* @Last Modified by:   Marte
* @Last Modified time: 2018-08-29 17:04:19
*/

// 'use strict';
// // 页面注入js
// function injectCustomJs(jsPath)
// {
//     jsPath = jsPath || 'js/inject.js';
//     var temp = document.createElement('script');
//     temp.setAttribute('type', 'text/javascript');
//     // 获得的地址类似：chrome-extension://ihcokhadfjfchaeagdoclpnjdiokfakg/js/inject.js
//     temp.src = chrome.extension.getURL(jsPath);
//     temp.onload = function()
//     {
//         // 放在页面不好看，执行完后移除掉
//         this.parentNode.removeChild(this);
//     };
//     document.head.appendChild(temp);
// }

// document.addEventListener('DOMContentLoaded', function()
// {
//     console.log('加载新DOM元素');
//     injectCustomJs()
// });
