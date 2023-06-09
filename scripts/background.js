
const YT = "https://www.youtube.com"

const RE = "[0-9]{0,2}:[0-9]{1,2}"

function foo(){

    a = document.getElementsByTagName("ytd-playlist-panel-video-renderer")
    queue = []
    
    for(const elem of a){
        // console.log(elem)
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


    return a

}
function bar(){
  
    collection = document.getElementsByClassName('question-hyperlink')
    for (let i = 0; i < collection.length; i++) {
        collection[i].style.backgroundColor = "blue";
    }
    return collection
    
}

chrome.action.onClicked.addListener(async (tab) => {

    // console.log(tab.id)

    if(tab.url.startsWith(YT)){

        chrome.scripting.executeScript({
           
            target: {tabId : tab.id},
            func: foo

        }).then(f => {
            
           
        })
    }else{
        chrome.scripting.executeScript({
           
            target: {tabId : tab.id},
            func: bar

        }).then(f => {
            
        })
    }
})



