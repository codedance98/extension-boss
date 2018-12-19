let buttonNode;
chrome.storage.local.get('checkList',(data)=>{
    if(data.checkList){
        buttonNode = `<div class='zc-node'>
            <p class='title'>去搜Ta :</p>
            <ul id='zcUl'>
                ${data.checkList.zhilian ? `<li class='zhilian'>智联</li>` : ``}
                ${data.checkList.fen ? `<li class='fen'>纷简历</li>` : ``}
                ${data.checkList.job51 ? `<li class='job51'>51job</li>` : ``}
                ${data.checkList.mai ? `<li class='maimai'>脉脉</li>` : ``}
            </ul>
        </div>` 
    }else{
        buttonNode = `<div class='zc-node'>
            <p class='title'>去搜Ta :</p>
            <ul id='zcUl'>
                <li class='fen'>纷简历</li>
                <li class='zhilian'>智联</li>
                <li class='job51'>51job</li>
                <li class='maimai'>脉脉</li>    
            </ul>
        </div>`
    }
})
let timer = ''
timer = setInterval(main,1000)
function main(){
    if(checkPage()){
         xiangqing()
    }else{
        const URL = window.location.href
        if(URL === 'https://www.zhipin.com/chat/im?mu=recommend'){
            tuijian()
        }else if(URL === "https://www.zhipin.com/chat/im?mu=search"){
            sousuo()
        }else if(URL === 'https://www.zhipin.com/chat/im?mu=chat'){
            goutong()
        }
    }
}
// 推荐
function tuijian(){
    // append
    $("#recommend-list .candidate-card").children('ul').children("li").each(function(){
        if($(this).find('.zc-node').length === 0){
            $(this).append(buttonNode)
            // click event register
            $(this).children(".zc-node").children("ul").children("li.zhilian").click(function(){
                let temp = $(this).parent().parent().prev().children(".chat-info").children(".text").children(".experience").children("span").text()
                let job = temp.split(' ')[3]
                let company = temp.split(' ')[1]
                savaLocal(job,company)
                job = job.indexOf('曾任') !== -1 ? job.replace('曾任','') : job 
                let linkUrl = `https://ihr.zhaopin.com/resumesearch/searchlist/?keyword=${job}`
                window.open(linkUrl);  
            })
            $(this).children(".zc-node").children("ul").children("li.fen").click(function(){
                let temp = $(this).parent().parent().prev().children(".chat-info").children(".text").children(".experience").children("span").text()
                let job = temp.split(' ')[3]
                let company = temp.split(' ')[1]
                savaLocal(job,company)
                let linkUrl = `http://www.fenjianli.com/search`
                window.open(linkUrl);  
            })
            $(this).children(".zc-node").children("ul").children("li.maimai").click(function(){
                let temp = $(this).parent().parent().prev().children(".chat-info").children(".text").children(".experience").children("span").text()
                let job = temp.split(' ')[3]
                let company = temp.split(' ')[1]
                savaLocal(job,company)
                job = job.indexOf('曾任') !== -1 ? job.replace('曾任','') : job  
                // let linkUrl = `https://maimai.cn/web/search_center?type=feed&query=${company} ${job}&highlight=true`
                let linkUrl = `https://maimai.cn/zp`
                window.open(linkUrl);  
            })
            $(this).children(".zc-node").children("ul").children("li.job51").click(function(){
                let temp = $(this).parent().parent().prev().children(".chat-info").children(".text").children(".experience").children("span").text()
                let job = temp.split(' ')[3]
                let company = temp.split(' ')[1]
                savaLocal(job,company)
                let linkUrl = `https://ehire.51job.com/Candidate/SearchResumeIndexNew.aspx`
                window.open(linkUrl);  
            })
        }
    })
}
// 搜索
function sousuo(){
    // append
    let liNode = $('.frame-container').contents().find(".sec-content.search-card").children('ul').children("li")
    liNode.each(function(){
        if($(this).find('.zc-node').length === 0){
            $(this).append(buttonNode)
            $(this).children('.zc-node').css('top',"27px") 
            // click event register
            $(this).children(".zc-node").children("ul").children("li.zhilian").click(function(){
                let temp = $(this).parent().parent().prev().children(".item-detail").children(".jobs-former").children("p").eq(0).text()
                let job = temp.slice(0,temp.indexOf("－"))
                let company = temp.slice(temp.indexOf("－")+1)
                savaLocal(job,company)
                job = job.indexOf('曾任') !== -1 ? job.replace('曾任','') : job 
                let linkUrl = `https://ihr.zhaopin.com/resumesearch/searchlist/?keyword=${job}`
                window.open(linkUrl);  
            })
            $(this).children(".zc-node").children("ul").children("li.fen").click(function(){
                let temp = $(this).parent().parent().prev().children(".item-detail").children(".jobs-former").children("p").eq(0).text()
                let job = temp.slice(0,temp.indexOf("－"))
                let company = temp.slice(temp.indexOf("－")+1)
                savaLocal(job,company)
                let linkUrl = `http://www.fenjianli.com/search`
                window.open(linkUrl);  
            })
            $(this).children(".zc-node").children("ul").children("li.maimai").click(function(){
                let temp = $(this).parent().parent().prev().children(".item-detail").children(".jobs-former").children("p").eq(0).text()
                let job = temp.slice(0,temp.indexOf("－"))
                let company = temp.slice(temp.indexOf("－")+1)
                savaLocal(job,company)
                job = job.indexOf('曾任') !== -1 ? job.replace('曾任','') : job  
                let linkUrl = `https://maimai.cn/web/search_center?type=feed&query=${company} ${job}&highlight=true`
                window.open(linkUrl);  
            })
            $(this).children(".zc-node").children("ul").children("li.job51").click(function(){
                let temp = $(this).parent().parent().prev().children(".item-detail").children(".jobs-former").children("p").eq(0).text()
                let job = temp.slice(0,temp.indexOf("－"))
                let company = temp.slice(temp.indexOf("－")+1)
                savaLocal(job,company)
                let linkUrl = `https://ehire.51job.com/Candidate/SearchResumeIndexNew.aspx`
                window.open(linkUrl);  
            })
        }
    })
}
// 沟通
function goutong(){
    // append
    if($('.chat-list .chat-info .zc-node').length === 0){
        $(".chat-list .chat-info").css('position',"relative")
        $(".chat-list .chat-info").append(buttonNode)
        $('.chat-list .chat-info .zc-node').css('top',"0") 
        $('.chat-list .chat-info .zc-node').css('left',"70px")
        // save 
        let temp = $(".text p:first-child span:first-child").html()
        if(temp){
            let firstIndex = temp.indexOf("<") || 0
            let lastIndex = temp.lastIndexOf(">") + 1 || 0
            // click event register
            $(".zhilian").click(()=>{
                let company = temp.slice(0,firstIndex)
                let job = temp.slice(lastIndex)
                savaLocal(job,company)
                job = job.indexOf('曾任') !== -1 ? job.replace('曾任','') : job  
                let linkUrl = `https://ihr.zhaopin.com/resumesearch/searchlist/?keyword=${job}`
                window.open(linkUrl);    
            })
            $(".fen").click(()=>{
                let company = temp.slice(0,firstIndex)
                let job = temp.slice(lastIndex)
                savaLocal(job,company)
                let linkUrl = `http://www.fenjianli.com/search`
                window.open(linkUrl);    
            })
            $('.maimai').click(()=>{
                let company = temp.slice(0,firstIndex)
                let job = temp.slice(lastIndex)
                savaLocal(job,company)
                job = job.indexOf('曾任') !== -1 ? job.replace('曾任','') : job  
                let linkUrl = `https://maimai.cn/web/search_center?type=feed&query=${company} ${job}&highlight=true`
                window.open(linkUrl);  
            })
            $('.job51').click(()=>{
                let company = temp.slice(0,firstIndex)
                let job = temp.slice(lastIndex)
                savaLocal(job,company)
                let linkUrl = `https://ehire.51job.com/Candidate/SearchResumeIndexNew.aspx`
                window.open(linkUrl);  
            })
        }  
    }
}
// 详情
function xiangqing(){
    // append
    $('.resume-item').each(function(){
        let titleNode = $(this).children('h3.title')
        if(titleNode.html() === '工作经历' && $(this).find('.zc-node').length === 0){
            $(this).find('.history-item').each(function(){
                $(this).css('position',"relative")
                $(this).append(buttonNode)
                if($(this).index() === 0){
                    $(this).find('.zc-node').css('top','0px')
                }else{
                    $(this).find('.zc-node').css('top','18px')
                }
                // 解决内容位置偏移问题
                $(this).find('.project-title').css('left','-83px')
                $(this).find(".zhilian").click(function(){
                    let company = getInfo($(this))[0].trim()
                    let job = getInfo($(this))[1].trim()
                    job = job.indexOf('曾任') !== -1 ? job.replace('曾任','') : job 
                    savaLocal(job,company)
                    let linkUrl = `https://ihr.zhaopin.com/resumesearch/searchlist/?keyword=${job}`
                    window.open(linkUrl);    
                })
                $(this).find(".fen").click(function(){
                    let company = getInfo($(this))[0].trim()
                    let job = getInfo($(this))[1].trim()
                    job = job.indexOf('曾任') !== -1 ? job.replace('曾任','') : job
                    savaLocal(job,company)
                    let linkUrl = `http://www.fenjianli.com/search`
                    window.open(linkUrl);    
                })
                $(this).find('.maimai').click(function(){
                    let company = getInfo($(this))[0].trim()
                    let job = getInfo($(this))[1].trim()
                    job = job.indexOf('曾任') !== -1 ? job.replace('曾任','') : job
                    savaLocal(job,company)
                    let linkUrl = `https://maimai.cn/web/search_center?type=feed&query=${company} ${job}&highlight=true`
                    window.open(linkUrl);  
                })
                $(this).find('.job51').click(function(){ 
                    let company = getInfo($(this))[0].trim()
                    let job = getInfo($(this))[1].trim()
                    job = job.indexOf('曾任') !== -1 ? job.replace('曾任','') : job
                    savaLocal(job,company)
                    let linkUrl = `https://ehire.51job.com/Candidate/SearchResumeIndexNew.aspx`
                    window.open(linkUrl);  
                })
            })
        }
    })
}
// detail get info
function getInfo(self){
    let temp = self.parent().parent().siblings('h4.name').html()
    if(temp.indexOf('<em class="h">').length !== -1){
        temp = temp.replace('<em class="h">','')
        temp = temp.replace('</em>','')
        temp = temp.replace('<em class="vline">','/')
        temp = temp.replace('</em>','')
        let tempArr = temp.split('/')
        return tempArr
    }else{
        let tempArr = temp.replace('<em class="vline"></em>','/').split('/')
        return tempArr
    } 
}
// check detail page
function checkPage(){
    let temp = false
    $('.resume-item h3.title').each(function(){
        if($(this).html() === '工作经历'){
            temp = true
        }
    })
    return temp
}
// save Chrome local store
function savaLocal(job,company){
    chrome.storage.local.set({'job': job.indexOf('曾任') !== -1 ? job.replace('曾任','') : job });
    chrome.storage.local.set({'company': company});
}

