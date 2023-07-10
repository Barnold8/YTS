//TODO: 
    // error handling for no video queues available


function grabLink(text) {

    var urlRegex = /(https?:\/\/[^\s]+)/g;
    var link = text.match(urlRegex);
    return link

}

function timeVideoProcess(time) {

    if (time.length == 3) {

        return parseInt(time[0], 10) * Math.pow(60, 2) + parseInt(time[0], 10) * Math.pow(60, 1) + parseInt(time[0], 10) * Math.pow(60, 0)
    } else {
        return parseInt(time[0], 10) * Math.pow(60, 1) + parseInt(time[0], 10) * Math.pow(60, 0)
    }

}

function processQueue() {

    queueContainer = document.getElementsByTagName("ytd-playlist-panel-video-renderer")
    queue = []
    imageClass = ".yt-core-image--fill-parent-height"
    titleClass = "#video-title"
    timeRegex = /(\d{1,2}:)?\d{1,2}:\d\d/g

    if (queueContainer.length > 1) { // only sort queues longer than 1 elem, useless to sort 1 elem queue
        let meta_videoID = 0
        for (const elem of queueContainer) {

            meta_time = elem.innerText.match(timeRegex).toString()

            meta_title = elem.querySelector(titleClass).innerText

            meta_href = elem.childNodes[2].href

            meta_imgLink = elem.querySelector(imageClass).src

            meta_imgLink = (grabLink(meta_imgLink))[0].split(">")[0]

            meta_queueLength = queueContainer.length // May change this so the payload contains the length rather than all of the videos. This just seems nicer for me rn

            queue.push({
                time: meta_time,
                title: meta_title,
                href: meta_href,
                img: meta_imgLink,
                videoID: meta_videoID,
                queueLength: meta_queueLength
            })
            meta_videoID++
        }

        queue.sort(function compare(t1, t2) {

            timeLeft = t1["time"].split(":")
            timeRight = t2["time"].split(":")

            timeLeft = timeVideoProcess(timeLeft)
            timeRight = timeVideoProcess(timeRight)

            return timeLeft - timeRight

        })

        let newID = 0

        Array.from(
            queue
        ).forEach(function (element) {
            element["videoID"] = newID
            newID++
        });

        return queue
    }
    return null
}

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        switch (request.type) {
            case "getInitialQueue":
                sendResponse({ payload: processQueue(), message: null })
                break
            default:
                sendResponse({ payload: null, message: `Message was ${request.type}` })
                break;

        }

    }
);

// https://stackoverflow.com/questions/29971898/how-to-create-an-accurate-timer-in-javascript - Make timer accurate!!!!!!

var observer = new MutationObserver(function (mutationsList, observer) {

    const change_by_MAX = 0.1

    // to access any change in elem to know something changed
    for (var mutation of mutationsList) {

        if (mutation.type === "attributes") { // use other mutation types for when the user presses arrow keys to manipulate video time

            // Attempt clear of timer incase one already exists, used to update timer. If no timer exists, error persists, try catch as a workaround.
            try { clearInterval(timer); }
            catch (e) { }

            // Duration = total video time | Time passed = current watch time to video 
            duration = document.getElementsByClassName("ytp-time-duration")[0].innerText
            time_passed = document.getElementsByClassName("ytp-time-current")[0].innerText

            now = new Date()

            videoEnd = new Date(
                now.getFullYear(),
                now.getMonth(),
                now.getDate(),
                now.getHours(),
                now.getMinutes() + parseInt(duration.split(":")[0] - parseInt(time_passed.split(":")[0])),
                now.getSeconds() + parseInt(duration.split(":")[1] - parseInt(time_passed.split(":")[1]))
            )

            timer = setInterval(async function () {

                var now = new Date().getTime();
                // obtain current youtube player state. Done by hooking into the play button on the video player
                video_state = document.getElementsByClassName("ytp-play-button")[0].getAttribute("data-title-no-tooltip") // Pause means video is playing, play means video is paused


                if (video_state === "Pause") {
                    // var distance = time_to_end - now;
                    var distance = videoEnd.getTime() - now;
                } else {
                    var distance = Number.MAX_SAFE_INTEGER
                }

                console.log(distance / 60000)

                if (distance / 60000 < change_by_MAX) {
                    clearInterval(timer);

                    // change video
                    chrome.runtime.sendMessage({ type: "changeVideo" }, function (response) {


                    });

                }
            }, 1000);
            return
        }
    }

    // videoQueueHolder = document.getElementsByTagName("ytd-playlist-panel-renderer")[1]

    // // videoQueueHolder.style.display = ( videoQueueHolder.display.holder == "" ? "none" : "" )
    // videoQueueHolder.style.display = "none"


});

document.addEventListener('DOMContentLoaded', function () {

    video = document.getElementsByClassName("ytp-play-button")

    observer.observe(video[0], { attributes: true });

});








