import React, {memo, useRef, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  ViewabilityConfig,
  ViewToken,
} from 'react-native';
import {useQuery} from '@apollo/client';

// TYPES
import {ListPostsQuery, ListPostsQueryVariables} from '../../API';

// GQL
import {listPosts} from './queries';

// COMPONENTS
import {FeedPost} from '../../components/FeedPost';
import {ApiErrorMessage} from '../../components/ApiErrorMessage';

const HomeScreen = () => {
  const [viewableItemIndex, setViewableItemIndex] = useState<number>(0);

  const {data, loading, error, refetch} = useQuery<
    ListPostsQuery,
    ListPostsQueryVariables
  >(listPosts);

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

  if (loading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return (
      <ApiErrorMessage title="error fetching posts" message={error.message} />
    );
  }

  const POSTS = data?.listPosts?.items || [];

  return (
    <FlatList
      data={POSTS}
      keyExtractor={item => (item ? item?.id : '')}
      renderItem={({item: post, index: fIndex}) =>
        post && (
          <FeedPost
            key={post?.id}
            post={post}
            isViewable={viewableItemIndex === fIndex} // is post visible
          />
        )
      }
      showsVerticalScrollIndicator={false}
      onViewableItemsChanged={onViewableItemsChanged.current}
      viewabilityConfig={viewabilityConfig}
      refreshing={loading}
      onRefresh={refetch}
    />
  );
};

export default memo(HomeScreen);
