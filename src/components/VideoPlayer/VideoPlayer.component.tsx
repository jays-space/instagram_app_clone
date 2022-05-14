import React, {memo, useState} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import Video from 'react-native-video';
import Ionicons from 'react-native-vector-icons/Ionicons';

// STYLES
import {colors} from '../../theme/colors';

interface IVideoPlayer {
  video: string;
  isViewable: boolean;
}

const VideoPlayer = ({video, isViewable}: IVideoPlayer) => {
  const [isMuted, setIsMuted] = useState(true);

  //   if (!viewableItemIndex) {
  //     setIsMuted(true);
  //   }

  return (
    <View>
      <Video
        source={{uri: video}}
        style={styles.video}
        resizeMode="cover"
        repeat
        paused={!isViewable}
        muted={isMuted}
      />

      <Pressable
        style={styles.buttonContainer}
        onPress={() => setIsMuted(value => !value)}>
        <Ionicons
          name={isMuted ? 'volume-medium' : 'volume-mute'}
          size={24}
          color={colors.white}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  video: {
    width: '100%',
    aspectRatio: 1,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: colors.transparent.black[60],
  },
});

export default memo(VideoPlayer);
