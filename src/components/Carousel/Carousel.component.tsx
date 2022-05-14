import React, {memo, useRef, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  View,
  ViewabilityConfig,
  ViewToken,
} from 'react-native';
import {colors} from '../../theme/colors';
import {DoublePressable} from '../DoublePressable';

interface ICarousel {
  images: string[];
  onDoublePress?: () => void;
}

const {width} = Dimensions.get('screen');

const Carousel = ({images, onDoublePress = () => {}}: ICarousel) => {
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);

  const viewabilityConfig: ViewabilityConfig = {
    itemVisiblePercentThreshold: 80,
  };

  const onViewableItemsChanged = useRef(
    ({viewableItems}: {viewableItems: Array<ViewToken>}) => {
      if (viewableItems.length > 0) {
        setActiveImageIndex(viewableItems[0].index ?? 0);
      }
    },
  );

  return (
    <View>
      <FlatList
        data={images}
        keyExtractor={item => `image-${item}`}
        renderItem={({item}) => (
          <DoublePressable onDoublePress={onDoublePress}>
            <Image source={{uri: item}} style={styles.image} />
          </DoublePressable>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onViewableItemsChanged={onViewableItemsChanged.current}
        viewabilityConfig={viewabilityConfig}
      />
      <View style={styles.markers}>
        {images.map((_, index) => (
          <View
            key={`image_marker-${index}`}
            style={[
              styles.marker,
              {
                backgroundColor:
                  activeImageIndex === index
                    ? colors.white
                    : colors.transparent.white[40],
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {width, aspectRatio: 1},
  markers: {
    position: 'absolute',
    bottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  marker: {
    marginHorizontal: 5,
    width: 10,
    aspectRatio: 1,
    borderRadius: 10,
  },
});

export default memo(Carousel);
