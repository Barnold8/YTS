
//TODO: 
    // Remove queue elements and replace with new sorted elements - PARTIAL
    // add functionality for mixes to be sorted
    // try and go through all sub elements of a queue item and store data



console.log("Content script loaded")

const YT = "https://www.youtube.com"

const RE = "[0-9]{0,2}:[0-9]{1,2}"

function processQueue(){

    queueContainer = document.getElementsByTagName("ytd-playlist-panel-video-renderer")
    queue = []
    console.log("================= Queue Container =================")

    console.log(queueContainer)

    console.log("================= Queue Container =================")

    if(queueContainer.length > 1){ // only sort queues longer than 1 elem, useless to sort 1 elem queue

        for(const elem of queueContainer){
            // console.log(elem)
            console.log(elem.children)
            time = elem.innerText.match("[0-9]{0,2}:[0-9]{1,2}")
            queue.push([time,elem.children[0].href])
        }
       
        queue.sort(function compare(t1,t2){
    
            timeLeft = t1[0][0].split(":")
            timeRight = t2[0][0].split(":")
    
            timeLeft = parseInt(timeLeft[0])*60 + parseInt(timeLeft[1])
            timeRight = parseInt(timeRight[0])*60 + parseInt(timeRight[1])
    
            return timeLeft - timeRight
    
        })
        
        return queue
    }

}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log("onMessage request")
        sendResponse({payload: processQueue() })
    }
  );





