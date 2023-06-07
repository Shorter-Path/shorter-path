// Select location value 
$(function(){
    $('#submitAPIKey').click(function(){
        // Get the existing time value from input box
        let apiKey = $('#apiKey').val();
        // if there's total
        if(apiKey){
        // add this new time into storage 
        chrome.storage.local.set({'apiKey': apiKey}, function(){
            console.log('stored api key');
            close();
        });
    };
    })
})