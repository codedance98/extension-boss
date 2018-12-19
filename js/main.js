'use strict';
$(".login").click(()=>{
    window.open('http://www.zhichou.com/')
})
let year = new Date().getFullYear()
let month = new Date().getMonth() + 1 < 10 ? "0" + (new Date().getMonth() + 1) : new Date().getMonth() + 1 
let day =  new Date().getDate() < 10 ? `0${new Date().getDate()}` : new Date().getDate()
$(".date").html(`${year}-${month}-${day}`)
// set checked value
let localData = {}
$(document).ready(function(){
    chrome.storage.local.get('checkList',(data)=>{
        if(data.checkList){
            for(let i in data.checkList){
                $(`input#${i}`).prop('checked',data.checkList[i])
                localData[i] = data.checkList[i]
            }
        }else{
            localData = {
                zhilian: true,
                fen: true,
                job51: true,
                mai: true
            }
        }
    })
    // 监测变化
    $('input#zhilian').click(function(){
        localData.zhilian = $(this).prop('checked')
        save()
    })
    $('input#fen').click(function(){
        localData.fen = $(this).prop('checked')
        save()
    })
    $('input#job51').click(function(){
        localData.job51 = $(this).prop('checked')
        save()
    })
    $('input#mai').click(function(){
        localData.mai = $(this).prop('checked')
        save()
    })
})
function save(){
    chrome.storage.local.set({'checkList': localData});
    chrome.storage.local.get('checkList',(data)=>{})
}