$(function () {

    var color = $("#fontColor").val();
    $("#fontColor").on("change paste keyup",function(){
        color = $(this).val();
    })

    $("#changeColor").click(function(){
        chrome.tabs.query({active:true,currentWindow:true},function(tabs){
            chrome.tabs.sendMessage(tabs[0].id,{todo:"changeColor",clickedColor:color});
        })
    })
    
})