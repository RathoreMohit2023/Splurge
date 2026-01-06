import React, { useCallback, useState } from "react";
import { View, StyleSheet } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";

const VideoPlayer = ({ videoUrl }) => {
  const [playing, setPlaying] = useState(true);

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
    }
  }, []);

  const extractVideoId = (url) => {
    if (!url) return "";
    if (url.includes("watch?v=")) {
      return url.split("v=")[1].split("&")[0];
    }
    return url;
  };

  const videoId = extractVideoId(videoUrl);

  return ( 
    <View style={styles.container}>
      <YoutubePlayer
        height={250}
        play={playing}
        videoId={videoId}
        onChangeState={onStateChange}
      />
    </View>
  );
};

export default VideoPlayer;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderRadius: 12,
    overflow: "hidden",
  },
});
