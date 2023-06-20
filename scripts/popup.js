
// Note: fooDiv is a placeholder ID

function redirectToYoutube(){
  chrome.tabs.update({url: "https://youtube.com"});
  window.close(); 
}

function generateQueue(){

  (async () => {
    const tabs = await chrome.tabs.query({currentWindow: true, active: true});
    const response = await chrome.tabs.sendMessage(tabs[0].id, {type: "getInitialQueue"});
    queue = []

    if(response.payload === null){
      const node = document.createElement("div");
      node.innerText = "No queue was found, try refreshing the page."
      document.getElementById("fooDiv").appendChild(node);
      return;
    }

    console.log(response.payload)

    for(const elem of response.payload ){
      
      const node = document.createElement("a");
      node.href = elem[1]
      node.innerText = elem[1]
      console.log(`Node IS: ${node.toString()}`)
      queue.push(node.toString()) // to perserve queue later on

      document.getElementById("fooDiv").appendChild(node);

    }
    
    chrome.storage.session.set({
        queueInfo:[{ 
                    intialQueue: true,
                    videoQueue: queue 
                  }]
    }).then(() => {
                    console.log("Initial queue has been set");
    });
    


  })();

}

window.onload = async function() {
  const tabs = await chrome.tabs.query({currentWindow: true, active: true});
  const URL = tabs[0].url

  if(!(URL.includes("youtube"))){

    document.getElementById("fooDiv").remove()

    var imageContainer = document.createElement("div")
    var questionableIMG = document.createElement("img")
    var information = document.createElement("p")
    var buttonContainer = document.createElement("div")
    var verticalButtonContainer = document.createElement("div")
    var gotoYoutube = document.createElement("button")

    imageContainer.classList.add("imageContainer") 
    questionableIMG.classList.add("questionableIMG") 
    information.classList.add("wrongSiteInfo")
    buttonContainer.classList.add("redirectButtonContainer")
    verticalButtonContainer.classList.add("verticalButtonContainer")
    gotoYoutube.classList.add("youtubeRedirect")

    gotoYoutube.setAttribute('id', 'redirect')

    questionableIMG.src = "../images/Questionable.png"
    information.innerText = "This doesn't seem to be Youtube..."
    gotoYoutube.innerText = "Go there?"

    imageContainer.appendChild(questionableIMG)
    imageContainer.appendChild(information)
    verticalButtonContainer.appendChild(gotoYoutube)
    buttonContainer.appendChild(verticalButtonContainer)
    document.body.appendChild(imageContainer)
    document.body.appendChild(buttonContainer)

    document.getElementById("redirect").addEventListener("click", redirectToYoutube);

    return // stops function from processing other code
  }

  chrome.storage.session.get(["queueInfo"]).then((result) => { // reinit the queue 
        if(result.queueInfo != null && result.queueInfo[0]["intialQueue"] === true){
            console.log(result)
            document.body.innerText = "Hello"
            return
        }

        var genQueue = document.createElement("button")
        genQueue.classList.add("generateQueueButton")
        genQueue.setAttribute('id', 'generate')
        genQueue.innerText = "Generate"

        document.body.appendChild(genQueue)

        document.getElementById("generate").addEventListener("click", generateQueue);

  });

}
