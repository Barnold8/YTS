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

    * implement error handling for null queue
    * replace "fooDiv" placeholder id with more meaningful ID
    * display a queue on the popup window - DONE
    * intercept youtube autoplay video change by redirection 
    * button to clear queue
    * detect youtube queue update, add to extension queue, resort
    * allow time regex to pick up on hours - DONE
