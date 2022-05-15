import React, {memo, useRef, useState} from 'react';
import {FlatList, ViewabilityConfig, ViewToken} from 'react-native';

// COMPONENTS
import {FeedPost} from '../../components/FeedPost';

// MOCK
import {POSTS} from '../../mock/post';

const HomeScreen = () => {
  // const [activePostId, setActivePOstId] = useState<string | null>(null);
  const [viewableItemIndex, setViewableItemIndex] = useState<number>(0);

  const viewabilityConfig: ViewabilityConfig = {
    itemVisiblePercentThreshold: 51,
  };

  //* could also use the item id as a basis for comparison instead of indexes
  const onViewableItemsChanged = useRef(
    ({viewableItems}: {viewableItems: Array<ViewToken>}) => {
      if (viewableItems.length > 0) {
        setViewableItemIndex(viewableItems[0].index ?? 0);
      }
    },
  );

  return (
    <FlatList
      data={POSTS}
      keyExtractor={item => item.id}
      renderItem={({item: post, index: fIndex}) => (
        <FeedPost
          key={post.id}
          post={post}
          isViewable={viewableItemIndex === fIndex} // is post visible
        />
      )}
      showsVerticalScrollIndicator={false}
      onViewableItemsChanged={onViewableItemsChanged.current}
      viewabilityConfig={viewabilityConfig}
    />
  );
};

export default memo(HomeScreen);
