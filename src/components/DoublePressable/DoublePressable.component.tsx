import React, {memo, PropsWithChildren} from 'react';
import {Pressable} from 'react-native';

interface IDoublePressable {
  onDoublePress?: () => void;
}

const DoublePressable = ({
  onDoublePress = () => {},
  children,
}: PropsWithChildren<IDoublePressable>) => {
  let lastTap = 0;
  const _duration = 300; // in milliseconds

  const handleDoublePress = () => {
    const now = Date.now();
    if (now - lastTap < _duration) {
      onDoublePress();
    }

    lastTap = now;
  };

  return <Pressable onPress={handleDoublePress}>{children}</Pressable>;
};

export default memo(DoublePressable);
