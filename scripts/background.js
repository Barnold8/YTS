
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
        default:
            sendResponse({ payload: null, message: "Advanced to default case statement\nbackground.js" });
            break;
    }

    return true
});