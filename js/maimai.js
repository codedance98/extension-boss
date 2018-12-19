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
$(document).ready(function(){
    $(".search_people_input").val(`${job} ${company}`)
    $('.search_btn')[0].click()
    clear()
})
function clear(){
    chrome.storage.local.remove('company')
    chrome.storage.local.remove('job')
}