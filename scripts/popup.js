

var query = {active: true, currentWindow: true}

function callBack(tabs){
  var currentTab = tabs[0]
}

function generateQueue(){

  chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {"message": "start"});
  });
    
}



document.getElementById("generateQueue").addEventListener("click", generateQueue);