chrome.tabs.onUpdated.addListener(async function
    (tabId, changeInfo, tab) {
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
            //   chrome.tabs.update({url: "https://youtube.com"});
            // //   window.close(); 
            //   console.log("Changing video")
            //   return
                console.log(tab.url)
          }
        });
      }
    }
  );


// const filter = {
// url: [
//     {
//     urlMatches: 'https://www.youtube.com/',
//     },
// ],
// };

// chrome.webNavigation.onCompleted.addListener(() => {
//     console.info("The user has loaded my favorite website!");
// });

// console.log("Hello world!!!!")