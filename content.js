chrome.runtime.sendMessage({todo:"showPageAction"});

chrome.runtime.onMessage.addListener(function(request,sender,sendResponse){
    if(request.todo == "changeColor"){
        var addedColor = request.clickedColor;
        $(".dates").css('color',addedColor);
    }
})