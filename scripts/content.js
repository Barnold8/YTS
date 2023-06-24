
//TODO: 
    // error handling for no video queues available

function grabLink(text){

        var urlRegex = /(https?:\/\/[^\s]+)/g;
        var link = text.match(urlRegex);
        return link
}

function timeVideoProcess(time,index=0,seconds = 0){
  
    if(time.length < 1){
      return seconds
    }
        
    time.shift()
  
    return(timeVideoProcess(
            time,
            index+1,
            seconds + parseInt(time[0],10) * Math.pow(60,index) 
        ))
  
}

function processQueue(){

    queueContainer = document.getElementsByTagName("ytd-playlist-panel-video-renderer")
    queue = []
    imageClass = ".yt-core-image--fill-parent-height"
    titleClass = "#video-title"
    timeRegex =  /(\d{1,2}:)?\d{1,2}:\d\d/g



    if(queueContainer.length > 1){ // only sort queues longer than 1 elem, useless to sort 1 elem queue
        let meta_videoID = 0
        for(const elem of queueContainer){
            
            meta_time = elem.innerText.match(timeRegex).toString()
        
            meta_title = elem.querySelector(titleClass).innerText 

            meta_href = elem.childNodes[2].href
            
            meta_imgLink = elem.querySelector(imageClass).src

            meta_imgLink = (grabLink(meta_imgLink))[0].split(">")[0]

            meta_queueLength = queueContainer.length // May change this so the payload contains the length rather than all of the videos. This just seems nicer for me rn

            queue.push({
                time: meta_time, 
                title: meta_title, 
                href: meta_href,
                img: meta_imgLink,
                videoID: meta_videoID,
                queueLength: meta_queueLength
            })
            meta_videoID++
        }

        queue.sort(function compare(t1,t2){

            timeLeft = t1["time"].split(":")
            timeRight = t2["time"].split(":")
            
            // timeLeft = timeVideoProcess(timeLeft,0,0)
            // timeRight = timeVideoProcess(timeRight,0,0)
            
            timeLeft = parseInt(timeLeft[0])*60 + parseInt(timeLeft[1])
            timeRight = parseInt(timeRight[0])*60 + parseInt(timeRight[1])

            return timeLeft - timeRight
    
        })
        
        return queue
    }
    return undefined
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





