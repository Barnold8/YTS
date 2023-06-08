
const YT = "https://www.youtube.com"




function foo(){
    f = document.getElementsByClassName("items");
    a = document.getElementsByTagName("yt-formatted-string")
    for(const elem of a){
        elem.innerHTML = "AAA"
    }
    return f

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
            
            console.log(f)
        })
    }else{
        chrome.scripting.executeScript({
           
            target: {tabId : tab.id},
            func: bar

        }).then(f => {
            
        })
    }
})