
//TODO: 
    // error handling for no video queues available

function foo(){

    var element = evt.currentTarget
    console.log(element.outerText)

}

function grabLink(text){

        var urlRegex = /(https?:\/\/[^\s]+)/g;
        var link = text.match(urlRegex);
        return link

}

function timeVideoProcess(time,index=0,seconds = 0){
  
    if(time.length == 3){

        return parseInt(time[0],10) * Math.pow(60,2)  + parseInt(time[0],10) * Math.pow(60,1) + parseInt(time[0],10) * Math.pow(60,0)
    }else{
        return parseInt(time[0],10) * Math.pow(60,1) + parseInt(time[0],10) * Math.pow(60,0)
    }
  
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

            timeLeft = timeVideoProcess(timeLeft,0,0)
            timeRight = timeVideoProcess(timeRight,0,0)
            
            return timeLeft - timeRight
    
        })

        let newID = 0
        
        Array.from(
                queue
            ).forEach(function(element) {
                  element["videoID"] = newID
                  newID++
            });
        
        return queue
    }
    return null
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        switch(request.type){
            case "getInitialQueue":
                sendResponse({payload: processQueue(), message: null})
                break
            default:
                sendResponse({payload: null,message: `Message was ${request.type}`})
                break;
            
        }
        
    }
  );


var observer = new MutationObserver(function(mutationsList, observer) {
    for (var mutation of mutationsList){
        console.log('The ' + mutation.attributeName + ' attribute was modified.');
    }

    if(document.getElementsByTagName("ytd-playlist-panel-renderer")[1]){
        document.getElementsByTagName("ytd-playlist-panel-renderer")[1].remove()
    }
    
});

document.addEventListener('DOMContentLoaded', function() {
    
    console.log(document.getElementsByTagName("ytd-playlist-panel-renderer"))
    
    console.log("Page loaded")
    let video;
    video = document.getElementsByClassName("html5-video-container")
    video = video[0].getElementsByTagName('video')

    observer.observe(video[0], { attributes: true});
    
});










