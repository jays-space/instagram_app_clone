import React, {memo} from 'react';
import {FlatList, SafeAreaView, StyleSheet} from 'react-native';

// COMPONENTS
import {Comment} from '../../components/Comment';

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
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({root: {padding: 10}});

export default memo(CommentsScreen);
