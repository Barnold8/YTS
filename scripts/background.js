
//TODO: 
    // Remove queue elements and replace with new sorted elements
    // disallow non queue to work
    // add functionality for mixes to be sorted

const YT = "https://www.youtube.com"

const RE = "[0-9]{0,2}:[0-9]{1,2}"

function foo(){

    a = document.getElementsByTagName("ytd-playlist-panel-video-renderer")
    queue = []

    for(const elem of a){
        time = elem.innerText.match("[0-9]{0,2}:[0-9]{1,2}")
        queue.push([time,elem])
    }

    queue.sort(function compare(t1,t2){

        timeLeft = t1[0][0].split(":")
        timeRight = t2[0][0].split(":")

        timeLeft = parseInt(timeLeft[0])*60 + parseInt(timeLeft[1])
        timeRight = parseInt(timeRight[0])*60 + parseInt(timeRight[1])

        return timeLeft - timeRight

    })

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



