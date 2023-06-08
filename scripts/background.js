
const YT = "https://www.youtube.com"


function foo(){

    return document.title

}

chrome.action.onClicked.addListener(async (tab) => {

    if(tab.url.startsWith(YT)){

        chrome.scripting.executeScript({
           
            target: {tabId : tab.id},
            func: foo

        }).then(() => console.log("foo"))
    }
    

})