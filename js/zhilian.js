chrome.storage.local.get('company', function(data) {               
    if(data.company && $("#companyName")){
        $("#companyName").val(data.company) 
        $(document).ready(function(){
            $('#AsyncSearchResume')[0].click()
            clear()
        })
    }        
})
function clear(){
    chrome.storage.local.remove('company')
    chrome.storage.local.remove('job')
}