
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {

    switch (request.type) {

        case "getVideos":
            chrome.storage.session.get(["queueInfo"]).then((result) => {  
                if (result.queueInfo != null && result.queueInfo[0]["intialQueue"] === true) {

                    sendResponse({ payload: result, message: null });
                } else {
                    sendResponse({ payload: null, message: "Queue info not found" });
                }
            }).catch((error) => {
                sendResponse({ payload: null, message: "Error retrieving queue info from storage" });
            });
            
            return true;

        case "changeVideo":
            chrome.storage.session.get(["queueInfo"]).then((result) => {  
                if (result.queueInfo != null && result.queueInfo[0]["intialQueue"] === true) {

                    for(let i = 0; i < result.queueInfo[0].videoQueue.length; i++){
                        try{
                        if(result.queueInfo[0].videoQueue[i].title === result.queueInfo[0].currentVideo.title){
                            
                            queueInfo =  result.queueInfo

                            nextVideo = result.queueInfo[0].nextVideo

                            queueInfo[0].currentVideo = result.queueInfo[0].nextVideo
                            queueInfo[0].nextVideo = ( result.queueInfo[0].videoQueue[i+2] ? result.queueInfo[0].videoQueue[i+2] : null)
                            
                            chrome.storage.session.set({ 
                                queueInfo
                            }).then(() => {
                                chrome.tabs.update({url: nextVideo.href})
                            });
                            return true
                        }
                    }catch(error){
                        console.log("Result is ")
                        console.log(result)
                        console.log(result.queueInfo[0].videoQueue[i])
                        console.log( result.queueInfo[0].currentVideo)
                    }

                    }
                } else {
                    console.log("Unexpected error processing the change video operation")
                }
            }).catch((error) => {
                console.log(error)
            });
            
         
            break;
        default:
            sendResponse({ payload: null, message: "Advanced to default case statement\nbackground.js" });
            break;
    }

    return true
});


