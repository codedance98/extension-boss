let job,company
chrome.storage.local.get('job', function(data) {               
    if(data.job){
        job = data.job
    }       
})
chrome.storage.local.get('company', function(data) {
    if(data.company){
        company = data.company
        
    }           
})
// 发起请求
$(document).ready(function(){
    if(company){
        $('.el-input__inner').each(function(){
            if($(this).attr('placeholder') === '请输入公司名称关键词'){
              var ev = new Event('input', { bubbles: true});
              ev.simulated = true;
              var element = $(this)[0];
              element.value = company;
              element.dispatchEvent(ev);
            }
            if($(this).attr('placeholder') === '请输入关键词'){
              var ev = new Event('input', { bubbles: true});
              ev.simulated = true;
              var element = $(this)[0];
              element.value = job;
              element.dispatchEvent(ev);
            }
            $('.el-button.search-btn.el-button--primary.el-button--mini.is-round')[0].click()  
            clear()
        })
    }
})
function clear(){
    chrome.storage.local.remove('company')
    chrome.storage.local.remove('job')
}
function getData(job,company){
    $.post('http://www.fenjianli.com/search/list',{
        keywords:job,
        companyName:company
    },function(data){
        
    })
}
