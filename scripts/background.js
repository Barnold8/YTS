
const YT = "https://www.youtube.com"


function foo(){
    console.log("foo")
    return document.title}

chrome.action.onClicked.addListener(async (tab) => {

    if(tab.url.startsWith(YT)){
        chrome.scripting.executeScript({
            target: {tabId : tab.id},
            func: foo

        }).then(() => console.log("foo"))
        console.log("Site is YT")

    }else{
        console.log(`Site is not YT it is: ${tab.url}`)
    }
    

})