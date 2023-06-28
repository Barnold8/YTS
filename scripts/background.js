
// chrome.tabs.onUpdated.addListener(async function // NOTE: SEE WHAT EVENT IS UPDATING THE PAGE AND TRY AND MANIPULATE THAT

//     (tabId, changeInfo, tab) {
//       r = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/gi;
      
//       if (tab.url !== undefined && changeInfo.status == "complete") {
//         console.log(changeInfo.url,tab.url)
//         // chrome.storage.session.get(["queueInfo"]).then((result) => { // reinit the queue 
//         //   if(
//         //     result.queueInfo != null 
//         //         && 
//         //     result.queueInfo[0]["intialQueue"] === true
//         //         &&
//         //     tab.url.includes("youtube")
//         //         &&
//         //     tab.url.includes("index")
//         //     ){
//         //         //This code is a mess...
//         //         if(tab.url.match(r) != result.queueInfo[0]["nextVideo"].href.match(r) && changeInfo.status === 'complete' ){

//         //             console.log(`left link ${tab.url.match(r)} | right link ${ result.queueInfo[0]["nextVideo"].href.match(r)}`)
                  
//         //         }else{
//         //             console.log(`${tab.url} and ${ result.queueInfo[0]["nextVideo"].href.split("&pp")[0]} are equal links`)
//         //         }
//         //         return
//         //   }
//         // });
//       }
//     }
//   );
