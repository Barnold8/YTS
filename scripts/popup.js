
// Note: fooDiv is a placeholder ID

function generateVideo(elem){

  const video = document.createElement("div")
  const imageDiv = document.createElement("div")
  const image = document.createElement("img")
  const title = document.createElement("p")
  const link  = document.createElement("a") // more used to actually store the link in an elem rather than for user side use
  const time  = document.createElement("p")

  link.href = elem["href"]
  title.innerText = elem["title"]
  time.innerText = elem["time"]
  image.src = elem["img"]
  
  video.classList.add("queueVideo") 
  title.classList.add("title")
  time.classList.add("time")
  imageDiv.classList.add("thumbnail")


  imageDiv.appendChild(image)
  imageDiv.appendChild(time)

  title.appendChild(link)
  video.appendChild(imageDiv)
  video.appendChild(title)
  

  // queue.push(video.toString()) // to perserve queue later on

  document.getElementById("fooDiv").appendChild(video);

  return video
}


function redirectToYoutube(){
  chrome.tabs.update({url: "https://youtube.com"});
  window.close(); 
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
      
      const video = generateVideo(elem)



      document.getElementById("fooDiv").appendChild(video);
     

    }
    document.getElementById("generate").remove()
    chrome.storage.session.set({
        queueInfo:[{ 
                    intialQueue: true,
                    videoQueue: response.payload 
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
        // if(result.queueInfo != null && result.queueInfo[0]["intialQueue"] === true){
        //     // console.log(result)
        //     document.body.innerText = "Hello"
        //     return
        // }

        var genQueue = document.createElement("button")
        genQueue.classList.add("generateQueueButton")
        genQueue.setAttribute('id', 'generate')
        genQueue.innerText = "Generate"

        document.body.appendChild(genQueue)

        document.getElementById("generate").addEventListener("click", generateQueue);

  });

}
