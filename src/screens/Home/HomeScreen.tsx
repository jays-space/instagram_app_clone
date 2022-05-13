import React, {memo} from 'react';
import {FlatList} from 'react-native';

// TYPES
import {IPost} from '../../types/models';

// COMPONENTS
import {FeedPost} from '../../components/FeedPost';

// MOCK
import {POSTS} from '../../mock/post';

const HomeScreen = () => {
  return (
    <FlatList
      data={POSTS}
      keyExtractor={item => item.id}
      renderItem={_renderItem}
      showsVerticalScrollIndicator={false}
    />
  );
};

interface IRenderItem {
  item: IPost;
}

const _renderItem: React.FC<IRenderItem> = ({item: post}) => (
  <FeedPost key={post.id} post={post} />
);

export default memo(HomeScreen);
