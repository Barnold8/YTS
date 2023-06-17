
function generateQueue(){

    chrome.runtime.sendMessage({
        msg: "generateQueue", 
    });

}

document.getElementById("generateQueue").addEventListener("click", generateQueue);





