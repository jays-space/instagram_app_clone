import React, {memo} from 'react';
import {FlatList, SafeAreaView, StyleSheet} from 'react-native';

// COMPONENTS
import {Comment} from '../../components/Comment';
import Input from './Input.component';

// MOCK
import {COMMENTS} from '../../mock/comments';

const CommentsScreen = () => {
  return (
    <SafeAreaView style={styles.root}>
      <FlatList
        data={COMMENTS}
        keyExtractor={item => item.id}
        renderItem={({item: comment}) => (
          <Comment comment={comment} includeDetails />
        )}
        contentContainerStyle={styles.container}
      />

      <Input />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {flex: 1},
  container: {paddingHorizontal: 10},
});

export default memo(CommentsScreen);
