
window.onload = async function() {
  const tabs = await chrome.tabs.query({currentWindow: true, active: true});
  const URL = tabs[0].url
  if(!(URL.includes("youtube"))){
    document.getElementById("fooDiv").remove()
    document.getElementById("generateQueue").remove()
  }
}

function generateQueue(){
  (async () => {
    const tabs = await chrome.tabs.query({currentWindow: true, active: true});
    const response = await chrome.tabs.sendMessage(tabs[0].id, {type: "getInitialQueue"});

    if(response.payload === null){
      const node = document.createElement("div");
      node.innerText = "No queue was found, try refreshing the page."
      document.getElementById("fooDiv").appendChild(node);
      return;
    }

    for(const elem of response.payload ){
      const node = document.createElement("a");
      console.log(elem)
      node.href = elem[1]
      node.innerText = elem[1]
      document.getElementById("fooDiv").appendChild(node);

    }

  })();

}




document.getElementById("generateQueue").addEventListener("click", generateQueue);