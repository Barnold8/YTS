
//TODO: 
    // Remove queue elements and replace with new sorted elements - PARTIAL
    // disallow non queue to work
    // add functionality for mixes to be sorted

const YT = "https://www.youtube.com"

const RE = "[0-9]{0,2}:[0-9]{1,2}"

function foo(){

    queueContainer = document.getElementsByTagName("ytd-playlist-panel-video-renderer")
    queue = []

    if(queueContainer.length > 1){ // only sort queues longer than 1 elem, useless to sort 1 elem queue

        for(const elem of queueContainer){
            time = elem.innerText.match("[0-9]{0,2}:[0-9]{1,2}")
            queue.push([time,elem])
        }
        
        // Uncomment after adding video testing
        // while(queueContainer.length > 0){ // For some reason, removing elems in for loop doesnt remove all videos. could be a synchronous error
        //     queueContainer[0].remove()
        // }
    
        queue.sort(function compare(t1,t2){
    
            timeLeft = t1[0][0].split(":")
            timeRight = t2[0][0].split(":")
    
            timeLeft = parseInt(timeLeft[0])*60 + parseInt(timeLeft[1])
            timeRight = parseInt(timeRight[0])*60 + parseInt(timeRight[1])
    
            return timeLeft - timeRight
    
        })
    
        console.log("========================================")
        console.log(queue)
        console.log("========================================")
    
        console.log(`Queue length ${queue.length}`)
    
        x = document.getElementsByClassName("playlist-items style-scope ytd-playlist-panel-renderer")
        // x[1].innerHTML = "<p>helloooo</p>"
        for(let i = 0; i < queue.length; i++){
            node = document.createElement('ytd-playlist-panel-video-renderer')
            node.innerHTML = queue[i]
            x[1].appendChild(node)
        }
       
    }



    



}


chrome.action.onClicked.addListener(async (tab) => {

    if(tab.url.startsWith(YT)){

        chrome.scripting.executeScript({
           
            target: {tabId : tab.id},
            func: foo

        }).then(f => {
            
           
        })
    }
})



