import React from 'react';
import {FlatList, StyleSheet} from 'react-native';

// TYPES
import {Post} from '../../API';

// COMPONENTS
import FeedGridItem from './FeedGridItem.component';

interface IFeedGridView {
  data: (Post | null)[];
  ListHeaderComponent?:
    | React.ComponentType<any>
    | React.ReactElement
    | null
    | undefined;
}

const FeedGridView = ({data, ListHeaderComponent}: IFeedGridView) => {
  return (
    <FlatList
      data={data}
      keyExtractor={item => (item ? item.id : '')}
      renderItem={({item: post}) => post && <FeedGridItem post={post} />}
      numColumns={3}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
      ListHeaderComponent={ListHeaderComponent}
    />
  );
};

const styles = StyleSheet.create({
  container: {paddingBottom: 10, marginHorizontal: -1},
});

export default FeedGridView;
