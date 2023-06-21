
//TODO: 
    // error handling for no video queues available

function processQueue(){

    queueContainer = document.getElementsByTagName("ytd-playlist-panel-video-renderer")
    queue = []

    if(queueContainer.length > 1){ // only sort queues longer than 1 elem, useless to sort 1 elem queue

        for(const elem of queueContainer){
            // console.log(elem)
            // console.log(elem.childNodes)

            time = elem.innerText.match("[0-9]{0,2}:[0-9]{1,2}").toString()
            // queue.push([time,elem.children[0].href])
            // queue.push([time,elem.childNodes[2].href,elem.childNodes[2].innerText])
            queue.push({time: time, title: elem.childNodes[2].innerText, href: elem.childNodes[2].href})
            
        }
        console.log(queue)
        queue.sort(function compare(t1,t2){
            console.log(`t1 ${t1} | t2 ${t2}`)
            console.log(`t1 ${t1["time"]} | t2 ${t2["time"]}`)
            timeLeft = t1["time"].split(":")
            timeRight = t2["time"].split(":")
    
            timeLeft = parseInt(timeLeft[0])*60 + parseInt(timeLeft[1])
            timeRight = parseInt(timeRight[0])*60 + parseInt(timeRight[1])
    
            return timeLeft - timeRight
    
        })
        
        return queue
    }

}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        switch(request.type){
            case "getInitialQueue":
                sendResponse({payload: processQueue()})
                break
            default:
                sendResponse({payload: null,message: `Message was ${request.type}`})
                break;
            
        }
        sendResponse({payload: processQueue() })
    }
  );





