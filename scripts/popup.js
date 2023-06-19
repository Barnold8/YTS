

var query = {active: true, currentWindow: true}

function callBack(tabs){
  var currentTab = tabs[0]
}

function generateQueue(){
  (async () => {
    const tabs = await chrome.tabs.query({currentWindow: true, active: true});
    const response = await chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"});


    console.log(response.payload )

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