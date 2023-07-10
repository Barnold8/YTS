# YTS

## What is it?

This is a chrome extension to aid the use of youtube queues. It works by grabbing the current queue on the page, sorting it and playing the new sorted queue automatically.
I intend to add features, like sorting by author, video title among other things. 

## How to use

Right now, all you can do is click "generate queue". 

### Chrome store

**NOTE** This will be available when the extension is to a workable version. Expect version **1.0**

### Manual

1.
    Clone the repository
    ```sh
        git clone https://github.com/Barnold8/YTS.git
    ```
2.  Go to\
       [chrome://extensions](chrome://extensions) 
    
3.  Click "Load unpacked button" \
        ![Clicking "Load unpacked button"](ReadmeAssets/step3.gif)
4.  Choose the **"YTS"** folder (assuming you have extracted it) \
        ![Choosing the "YTS" folder](ReadmeAssets/step4.gif)
5.  Enjoy!


## TODO

### Current

    * intercept youtube autoplay video change by redirection

    
### Yet to start

    * implement error handling for null queue
    * detect youtube queue update, add to extension queue, resort
    * add a button to refresh whole site so it can re-add its old queue - try style.display = none, etc
    * Shuffle button for video queue, randomises the video queue


## Known bugs

    * Timer
        * Unchecked runtime.lastError: The message port closed before a response was received. (when trying to change videos)
        * countdown isnt updated when skipping with arrow keys on page (not high priority)

    * Queue
        * After last video is done, the next video in the queue on the youtube page is swapped to
        * If the native queue is not to the right of the video, the generation code refuses to work due to a payload not existing??
        * When clicking the queue changing buttons (up,down), the video could change to the video clicked...

    *Other
        * If a video finishes its timer, the current tab the user has open is changed, not the intended original tab
