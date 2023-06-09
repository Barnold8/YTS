
const YT = "https://www.youtube.com"

const RE = "[0-9]{0,2}:[0-9]{1,2}"

function foo(){

    a = document.getElementsByTagName("ytd-playlist-panel-video-renderer")
    queue = {}
    
    for(const elem of a){
        
        // console.log(elem)
        time = elem.innerText.match("[0-9]{0,2}:[0-9]{1,2}")
        queue[elem.innerText] = {
            "Element": elem,
            "time": time
        }
    }

    for(var key in queue) {
        var value = queue[key];
        console.log(key)
    }
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



