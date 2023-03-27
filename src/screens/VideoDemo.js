import React, {
  useState,
  useRef,
} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import useStateRef from '../hooks/useStateRef';
import Style from '../styles/Style';
import sampleVideoSource from '../assets/sample.mov';
import VideoContainer from '../components/Videos/VideoContainer';
import VideoProgressBar from '../components/Videos/VideoProgressBar';

const EVENT_LINES = 18;

const VideoDemo = () => {

  // Init Refs
  const playerRef = useRef(null);
  const playPauseButtonRef = useRef(null);

  // State
  const [source, setSource] = useState(sampleVideoSource);
  // const [videoEventStack, setVideoEventStack] = useState([]);
  const [videoDuration, setVideoDuration] = useState(0);
  const [videoTime, setVideoTime] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // State Refs
  const [pausedRef, isPaused, setPaused] = useStateRef(true);

  // Video Events

  function pushVideoEventStack(event, params) {
    let eventStr = event + '(' + (params ? JSON.stringify(params) : '') + ')';
    console.log('Video event: ' + eventStr);
  }

  function onReadyForDisplay() {
    setIsReady(true);
    pushVideoEventStack('onReadyForDisplay');
  }

  function onLoad(data) {
    setIsLoading(false);
    setVideoDuration(data.duration);
    pushVideoEventStack('onLoad', data);
  }

  function onLoadStart(data) {
    setIsLoading(true);
    pushVideoEventStack('onLoadStart', data);
  }

  function onPlaybackRateChange(data) {
    setIsPlaying(data.playbackRate > 0);
    pushVideoEventStack('onPlaybackRateChange', data);
  }

  function onProgress(data) {
    setVideoTime(data.currentTime);
    pushVideoEventStack('onProgress', data);
  }

  function onEnd() {
    setVideoTime(0);
    setPaused(true);
    setIsPlaying(false);
    pushVideoEventStack('onEnd');
  }

  function onError(error) {
    pushVideoEventStack('onError', error);
  }

  function formatTime(time) {
    let seconds = parseInt(time, 10);
    let hours = Math.floor(seconds / 3600);
    let minutes = Math.floor((seconds - hours * 3600) / 60);
    seconds = seconds - hours * 3600 - minutes * 60;
    let timeFormat = '';
    if (hours > 0) {
      if (hours < 10) {
        hours = '0' + hours;
      }
      timeFormat += hours + ':';
    }
    if (minutes < 10) {
      minutes = '0' + minutes;
    }
    if (seconds < 10) {
      seconds = '0' + seconds;
    }
    // Fix NaN
    if (isNaN(minutes)) {
      minutes = '-';
    }
    if (isNaN(seconds)) {
      seconds = '-';
    }
    timeFormat += minutes + ':' + seconds;
    return timeFormat;
  }

  return (
    <>
      <VideoContainer
        ref={playerRef}
        source={source}
        paused={isPaused()}
        onReadyForDisplay={onReadyForDisplay}
        onLoadStart={onLoadStart}
        onLoad={onLoad}
        onPlaybackRateChange={onPlaybackRateChange}
        onProgress={onProgress}
        onEnd={onEnd}
        onError={onError}
      />

      <VideoProgressBar
        duration={videoDuration}
        time={videoTime}
        style={styles.progressBar}
        seek={(seconds) => {
          playerRef.current.seek(seconds);
        }}
      />
      <View style={styles.videoControls}>
        <TouchableOpacity
          ref={playPauseButtonRef}
          style={[styles.videoControl, isPaused() && { backgroundColor: Style.buttonUnfocusedColor }]} onPress={((e) => {
            setPaused(!isPaused());
          })}>
          <Text style={styles.videoControlText}>
            {isPaused() ? 'Play' : 'Pause'}
          </Text>
        </TouchableOpacity>
        <View style={styles.videoTime}>
          <Text style={styles.videoTimeText}>
            {formatTime(videoTime) + ' / ' + formatTime(videoDuration)}
          </Text>
        </View>
      </View>
    </>
  );
};

export default VideoDemo;

const styles = StyleSheet.create({

  videoOverlayVisible: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },

  progressBar: {
    position: 'absolute',
    bottom: Style.px(135),
    width: '96%',
    marginLeft: '2%',
  },
  videoControls: {
    position: 'absolute',
    width: '100%',
    height: Style.px(140),
    bottom: 0,
    backgroundColor: 'black',
    opacity: 0.8,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  videoControl: {
    width: Style.px(200),
    height: Style.px(100),
    margin: Style.px(20),
    backgroundColor: Style.buttonFocusedColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoControlText: {
    fontSize: Style.px(30),
  },
  videoTime: {
    flex: 1,
    height: Style.px(100),
    margin: Style.px(20),
    justifyContent: 'center',
  },
  videoTimeText: {
    fontSize: Style.px(20),
    color: 'white',
  },
});
