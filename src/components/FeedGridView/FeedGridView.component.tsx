import {FlatList, StyleSheet} from 'react-native';
import React from 'react';
import {IPost} from '../../types/models';
import FeedGridItem from './FeedGridItem.component';

interface IFeedGridView {
  data: IPost[];
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
      keyExtractor={item => item.id}
      renderItem={({item: post}) => <FeedGridItem post={post} />}
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
