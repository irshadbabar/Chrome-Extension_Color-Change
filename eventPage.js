chrome.runtime.onMessage.addListener(function(request,sender,sendResponse){
    if(request.todo == "showPageAction"){
        chrome.tabs.query({active:true,currentWindow:true},function (tabs){
            chrome.pageAction.show(tabs[0].id);
        })
        
    }
})

// addEventListener version
document.addEventListener('selectionchange', () => {
    console.log("inside event page" +document.getSelection());
  });





// const contextMenuItem = {
//     "id":"spendMoney",
//     "title":"SpendMoney",
//     "contexts":["selection"]
// };


// chrome.contextMenus.create(contextMenuItem);

// function isInt(value){

//     return !isNaN(value) && 
//     parseInt(Number(value)) == value  &&
//     !isNaN(parseInt(value,10)); 
// }

// chrome.contextMenus.onClicked.addListener(function(clickedData){
//     if(clickedData.menuItemId == "spendMoney" && clickedData.selectionText){
//         if(isInt(clickedData.selectionText)){
//             var subTotal = 0;
//             chrome.storage.sync.get(['total','limit'], function (stored) {
//                 if (stored.total) {
//                     subTotal = parseInt(stored.total);
//                 }
    
//                 const amount = parseInt(clickedData.selectionText);
//                 const limit  = parseInt(stored.limit); 

//                 if (amount > 0 && amount <= limit ) {
    
//                     var total = subTotal + amount;
//                     chrome.storage.sync.set({ total:total })
//                     chrome.storage.sync.set({ limit:(limit - amount) })
//                 }
//                 else{
//                     const notificationOptions = {
//                         type:'basic',
//                         iconUrl:'icon48.png',
//                         title:'Limit Reached',
//                         message:"You have reached your limit, please spend amount according to your limit"
//                     }    
                    
//                     chrome.notifications.create('limitNotification',notificationOptions);
                
//             }
    
//             })
//         }
//     }
// })


// chrome.storage.onChanged.addListener(function (changes,storageName){
//     chrome.browserAction.setBadgeText({"text":changes.limit.newValue.toString()})
// });