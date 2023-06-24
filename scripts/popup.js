
// Note: fooDiv is a placeholder ID

function resolveHost(){

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

}

function swapVideo(evt){

  let idSTR = "videoid"
  var element = evt.currentTarget
  var direction = element.func_param
  var videoID = element.closest('li').getAttribute(idSTR)

  chrome.storage.session.get(["queueInfo"]).then((result) => { // reinit the queue 

    

  });
//   chrome.storage.session.set({
//     queueInfo:[{ 
//                 intialQueue: true,
//                 videoQueue: response.payload 
//               }]
// }).then(() => {
//                 console.log("Initial queue has been set");
// });
}

function generateVideo(elem){ // add div for the title

  const arrowWidth = 15
  const arrowHeight = 15
  const arrowColour = "#FFFFFF"

  const upArrow = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="${arrowColour}" height="${arrowHeight}" width="${arrowWidth}px" version="1.1" id="Layer_1" viewBox="0 0 330 330" xml:space="preserve"><path id="XMLID_224_" d="M325.606,229.393l-150.004-150C172.79,76.58,168.974,75,164.996,75c-3.979,0-7.794,1.581-10.607,4.394  l-149.996,150c-5.858,5.858-5.858,15.355,0,21.213c5.857,5.857,15.355,5.858,21.213,0l139.39-139.393l139.397,139.393  C307.322,253.536,311.161,255,315,255c3.839,0,7.678-1.464,10.607-4.394C331.464,244.748,331.464,235.251,325.606,229.393z"/></svg>`
  const downArrow = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="${arrowColour}" height="${arrowHeight}" width="${arrowWidth}px" version="1.1" id="Layer_1" viewBox="0 0 330 330" xml:space="preserve"><path id="XMLID_225_" d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393  c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393  s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z"/></svg>`

  const video = document.createElement("li")
  const imageDiv = document.createElement("div")
  const time = document.createElement("div")
  const image = document.createElement("img")
  const titleDiv = document.createElement("div")
  const title = document.createElement("p")
  const link  = document.createElement("a") // more used to actually store the link in an elem rather than for user side use
  const buttonContainer = document.createElement("div")
  const down  = document.createElement("div")
  const up  = document.createElement("div")

  link.href = elem["href"]
  title.innerText = elem["title"]
  time.innerText = elem["time"]
  image.src = elem["img"]
  down.innerHTML = downArrow
  up.innerHTML = upArrow
  
  up.setAttribute('id', 'up')
  down.setAttribute('id', 'down')
  video.setAttribute('videoID',elem["videoID"])

  title.appendChild(link)

  video.classList.add("queueContainer") 
  title.classList.add("title")
  image.classList.add("thumbnail")
  imageDiv.classList.add("thumbnailContainer")
  time.classList.add("timeContainer")
  titleDiv.classList.add("titleContainer")
  buttonContainer.classList.add("videoFuncContainer")
  down.classList.add("videoFunc")
  up.classList.add("videoFunc")

  imageDiv.appendChild(image)
  imageDiv.appendChild(time)

  titleDiv.appendChild(title)
  titleDiv.appendChild(buttonContainer)

  buttonContainer.appendChild(up)
  buttonContainer.appendChild(down)

  video.appendChild(imageDiv)
  video.appendChild(titleDiv)

  document.getElementById("fooDiv").appendChild(video);

  Array.from(
      document.getElementsByClassName("videoFunc"))
        .forEach(function(element) {
            element.addEventListener('click', swapVideo);
            element.func_param = element.id
      });


  
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

    const queueContainer = document.createElement("ul")
    queueContainer.setAttribute('id', 'queueContainer')
    document.getElementById("fooDiv").appendChild(queueContainer)

    for(const elem of response.payload ){
    
      const video = generateVideo(elem)
      
      queueContainer.appendChild(video)

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

  if(!(URL.includes("youtube"))){ // TODO:  Fix the weird CSS for the redirect robot 

    document.getElementById("fooDiv").remove()

    resolveHost()

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
