
function generateQueue(){

    chrome.runtime.sendMessage({
        msg: "generateQueue", 
    });
    const para = document.createElement("p");
    const node = document.createTextNode("This is a test");
    para.appendChild(node);

    const element = document.getElementById("fooDiv");
    element.appendChild(para);
}

document.getElementById("generateQueue").addEventListener("click", generateQueue);





