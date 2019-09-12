import React, { Component, } from 'react'
import Video from 'video.js'
import initFlash from './videojs-flash'

import './index.less';

class VideoView extends Component {
  componentDidMount() {
    this.initVideo()
  }

  componentWillUnmount() {
    this.player.dispose()
  }

  render() {
    return (
      <div className="video-wrapper">
        <video
          id="video"
          className="video-js vjs-default-skin"
          controls
          preload="auto"
          crossOrigin="anonymous"
        >
          {/* <source
            src="rtmp://live5.cqnews.net:1935/live/TVFLV15"
            type="rtmp/flv"
          /> */}
          {/* <source
            src="rtsp://218.204.223.237:554/live/1/0547424F573B085C/gsfp90ef4k0a6iap.sdp"
            type="rtmp/flv"
          /> */}
          <source
            src="//vjs.zencdn.net/v/oceans.mp4"
            type="video/mp4"
          />
        </video>
      </div>
    )
  }

  initVideo = () => {
    Video.options.flash.swf = require('../../../../assets/video/video-js.swf')

    initFlash()

    this.player = Video('video', {
      bigPlayButton: false,
      textTrackDisplay: false,
      posterImage: false,
      errorDisplay: false,
      controlBar: false,
    })
    this.player.play()
  }
}

export default VideoView