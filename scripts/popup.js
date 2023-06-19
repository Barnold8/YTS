
// Note: fooDiv is a placeholder ID

window.onload = async function() {
  const tabs = await chrome.tabs.query({currentWindow: true, active: true});
  const URL = tabs[0].url

  if(!(URL.includes("youtube"))){

    document.getElementById("fooDiv").remove()
    document.getElementById("generateQueue").remove()

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

    questionableIMG.src = "../images/Questionable.png"
    information.innerText = "This doesn't seem to be Youtube..."
    gotoYoutube.innerText = "Go there?"

    imageContainer.appendChild(questionableIMG)
    imageContainer.appendChild(information)
    verticalButtonContainer.appendChild(gotoYoutube)
    buttonContainer.appendChild(verticalButtonContainer)
    document.body.appendChild(imageContainer)
    document.body.appendChild(buttonContainer)

    


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