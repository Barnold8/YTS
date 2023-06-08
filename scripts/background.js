
const YT = "https://www.youtube.com"




chrome.action.onClicked.addListener(async (tab) => {

    if(tab.url.startsWith(YT)){

        console.log("Site is YT")

    }else{
        console.log(`Site is not YT it is: ${tab.url}`)
    }


})