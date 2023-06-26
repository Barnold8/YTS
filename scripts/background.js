
chrome.tabs.onUpdated.addListener(async function
    (tabId, changeInfo, tab) {
      r = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/gi;
      if (changeInfo.url) {
        chrome.storage.session.get(["queueInfo"]).then((result) => { // reinit the queue 
          if(
            result.queueInfo != null 
                && 
            result.queueInfo[0]["intialQueue"] === true
                &&
            tab.url.includes("youtube")
                &&
            tab.url.includes("index")
            ){
                //This code is a mess...
                if(tab.url.match(r) != result.queueInfo[0]["nextVideo"].href.match(r) && changeInfo.status === 'complete' ){

                    console.log(`left link ${tab.url} | right link ${ result.queueInfo[0]["nextVideo"].href.split("&pp")[0]}`)
                  
                }
                return
          }
        });
      }
    }
  );



// chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
//     if (changeInfo.status == 'complete' && tab.status == 'complete' && tab.url != undefined) {
//         if (!tabUpdated) {
//             console.log("tab load complete");
//             tabUpdated = true;
          
//         }
//     }

// });


// chrome.webNavigation.onHistoryStateUpdated.addListener(function(details) {
//     if(details.frameId === 0) {
//         // Fires only when details.url === currentTab.url
//         chrome.tabs.get(details.tabId, function(tab) {
//             if(tab.url === details.url) {
//                 console.log("onHistoryStateUpdated");
//             }
//         });
//     }
// });