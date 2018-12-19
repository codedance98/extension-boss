chrome.storage.local.get('job', function(data) {               
    if(data.job && $("#search_keywod_txt")){
        $("#search_keywod_txt").val(data.job) 
    }       
})
chrome.storage.local.get('company', function(data) {               
    if(data.company && $("#search_lastcompany_txt")){
        $("#search_lastcompany_txt").val(data.company) 
        $(document).ready(function(){
            $('#search_submit')[0].click()
            clear()
        })
    }        
})
function clear(){
    chrome.storage.local.remove('company')
    chrome.storage.local.remove('job')
}