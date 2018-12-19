let buttonNode;
let DOMheight = 72 + 57 * 4;
chrome.storage.local.get('checkList',(data)=>{
    for(let i in data.checkList){
        if(!data.checkList[i]){
            DOMheight -= 57
        }
    }
    if(data.checkList){
        buttonNode = `<div class='zc-node'>
                <p class='title'>去搜Ta >></p>
                <ul id='zcUl'>
                    ${data.checkList.zhilian ? `<li class='zhilian'>智联</li>` : ``}
                    ${data.checkList.fen ? `<li class='fen'>纷简历</li>` : ``}
                    ${data.checkList.job51 ? `<li class='job51'>51job</li>` : ``}
                    ${data.checkList.mai ? `<li class='maimai'>脉脉</li>` : ``}
                </ul>
        </div>` 
    }else{
        buttonNode = `<div class='zc-node'> 
                <p class='title'>去搜Ta >></p>
                <ul id='zcUl'>
                    <li class='zhilian'>智联</li>
                    <li class='fen'>纷简历</li>
                    <li class='job51'>51job</li>
                    <li class='maimai'>脉脉</li>    
                </ul>
        </div>`
    }
})
$(document).ready(function(){
    // 设置底部悬浮框z-index 防止新增元素作用在底部标签上面
    $('.checkAll.all-checkbox-container.affix').css('z-index','20')
}) 
let timer = ''
timer = setInterval(main,1000)
function main(){
    let URL = window.location.href
    if(URL.indexOf('https://ihr.zhaopin.com/resume/details/') != -1){
        detail()
    }else{
        list()
    }
}
function list(){
    if($('.search-details-item').length > 0){
        $('.search-details-item').each(function(){
            if($(this).find('.zc-node').length === 0){
                $(this).css('position','relative')
                $(this).append(buttonNode)
                $(this).find('.zc-node').hover(show,hide)
                $(this).find('.zc-node').click(function(e){
                    e.stopPropagation()
                })
                $(this).find('.zhilian').click(function(){

                })
                $(this).find('.fen').click(function(){
                    let job =  $(this).parents('.zc-node').siblings('.clearfix').find('.dqzw-D').html()
                    let company = $(this).parents('.zc-node').siblings('.clearfix').find('.dqgs-D').html()
                    savaLocal(job,company)
                    let linkUrl = `http://www.fenjianli.com/search`
                    window.open(linkUrl); 
                })
                $(this).find('.job51').click(function(){
                    let job =  $(this).parents('.zc-node').siblings('.clearfix').find('.dqzw-D').html()
                    let company = $(this).parents('.zc-node').siblings('.clearfix').find('.dqgs-D').html()
                    savaLocal(job,company)
                    let linkUrl = `https://ehire.51job.com/Candidate/SearchResumeIndexNew.aspx`
                    window.open(linkUrl);
                })
                $(this).find('.maimai').click(function(){
                    let job =  $(this).parents('.zc-node').siblings('.clearfix').find('.dqzw-D').html()
                    let company = $(this).parents('.zc-node').siblings('.clearfix').find('.dqgs-D').html()
                    savaLocal(job,company)
                    let linkUrl = `https://maimai.cn/zp`
                    window.open(linkUrl);
                })
            }
        })
    }
}

function detail(){
    if($('.dave-resDetail-name').find('.zc-node').length === 0){
        // 以下代码为详情页浮动框的操作按钮
        // $('.dave-resDetail-name').css('position','relative')
        // $('.dave-resDetail-name').append(buttonNode)
        // $('.dave-resDetail-name').find('.zc-node p.title').html('搜索Ta :')
        // $('.dave-resDetail-name').find('.zc-node').css('width','auto').css('bottom','8px').css('left','100px')
        $('.dave-workExpInfo.dave-pr').each(function(){
            if($(this).find('.zc-node').length === 0){
                $(this).css('position','relative')
                $(this).append(buttonNode)
                $(this).find('.zc-node p.title').html('搜索Ta :')
                $(this).find('.zc-node').css('width','auto').css('top','30px').css('left','180px')
                $(this).find('.fen').click(function(){
                    let companyDom = $(this).parents('.zc-node').siblings('.dave-exp-title').children('.fs16.company_name.fl')
                    let company = companyDom.html()
                    let job = companyDom.next().text().indexOf('|') ? companyDom.next().text().replace('|','').trim() : companyDom.next().text().trim()
                    savaLocal(job,company)
                    let linkUrl = `http://www.fenjianli.com/search`
                    window.open(linkUrl); 
                })
                $(this).find('.job51').click(function(){
                    let companyDom = $(this).parents('.zc-node').siblings('.dave-exp-title').children('.fs16.company_name.fl')
                    let company = companyDom.html()
                    let job = companyDom.next().text().indexOf('|') ? companyDom.next().text().replace('|','').trim() : companyDom.next().text().trim()
                    savaLocal(job,company)
                    let linkUrl = `https://ehire.51job.com/Candidate/SearchResumeIndexNew.aspx`
                    window.open(linkUrl);
                })
                $(this).find('.maimai').click(function(){
                    let companyDom = $(this).parents('.zc-node').siblings('.dave-exp-title').children('.fs16.company_name.fl')
                    let company = companyDom.html()
                    let job = companyDom.next().text().indexOf('|') ? companyDom.next().text().replace('|','').trim() : companyDom.next().text().trim()
                    savaLocal(job,company)
                    let linkUrl = `https://maimai.cn/web/search_center?type=feed&query=${company} ${job}&highlight=true`
                    window.open(linkUrl);
                })
            }
        })
    }
}

function show(){
    $(this).css('width',DOMheight + 'px')
    $(this).children('p.title').html('搜索Ta :')
}
           
function hide(){
    $(this).css('width','70px')
    $(this).children('p.title').html('搜索Ta >>')
}

// save Chrome local store
function savaLocal(job,company){
    chrome.storage.local.set({'job': job.indexOf('曾任') ? job.replace('曾任','') : job });
    chrome.storage.local.set({'company': company});
}