
//TODO: 
    // Remove queue elements and replace with new sorted elements - PARTIAL
    // add functionality for mixes to be sorted

const YT = "https://www.youtube.com"

const RE = "[0-9]{0,2}:[0-9]{1,2}"

function foo(){

    queueContainer = document.getElementsByClassName("playlist-items style-scope ytd-playlist-panel-renderer") // get the queue container

    queue = [] // container for sorted elements

    element = queueContainer[1].children[0] // first video of queue

    if(queueContainer.length > 1){ // only sort queues longer than 1 elem, useless to sort 1 elem queue
      //ytd-playlist-panel-video-renderer
      addElement = document.createElement('ytd-playlist-panel-video-renderer');
      queueContainer[1].appendChild(element)
      
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



