import {useMutation} from '@apollo/client';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Alert, StyleSheet, Text} from 'react-native';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
  renderers,
} from 'react-native-popup-menu';
import Entypo from 'react-native-vector-icons/Entypo';

// CONTEXTS
import {useAuthContext} from '../../contexts/AuthContext';

// TYPES
import {DeletePostMutation, DeletePostMutationVariables, Post} from '../../API';
import {FeedNavigationProp} from '../../types/navigation';

// GQL
import {deletePost} from './queries';

interface IPostMenu {
  post: Post;
}

const PostMenu = ({post}: IPostMenu) => {
  const navigation = useNavigation<FeedNavigationProp>();
  const {currentUserId} = useAuthContext();

  const isCurrentUserPost = post?.User?.id === currentUserId;

  const [onDeletePostStart] = useMutation<
    DeletePostMutation,
    DeletePostMutationVariables
  >(deletePost, {variables: {input: {id: post?.id, _version: post?._version}}});

  const onDeletePost = async () => {
    try {
      await onDeletePostStart();
    } catch (e) {
      Alert.alert('Error deleting post', (e as Error).message);
    }
  };

  const onDeleteOptionPressed = () => {
    Alert.alert('Are you sure?', 'Deleting a post id permanent', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete post',
        style: 'destructive',
        onPress: onDeletePost,
      },
    ]);
  };

  const onEditOptionPressed = () => {
    navigation.navigate('UpdatePost', {postId: post?.id});
  };

  return (
    <Menu renderer={renderers.SlideInMenu} style={styles.root}>
      <MenuTrigger>
        <Entypo name="dots-three-horizontal" size={16} />
      </MenuTrigger>

      <MenuOptions>
        <MenuOption onSelect={() => Alert.alert('Reported')}>
          <Text style={styles.optionText}>Report</Text>
        </MenuOption>

        {isCurrentUserPost && (
          <>
            <MenuOption onSelect={onDeleteOptionPressed}>
              <Text style={[styles.optionText, {color: 'red'}]}>Delete</Text>
            </MenuOption>

            <MenuOption onSelect={onEditOptionPressed}>
              <Text style={styles.optionText}>Edit</Text>
            </MenuOption>
          </>
        )}
      </MenuOptions>
    </Menu>
  );
};

const styles = StyleSheet.create({
  root: {
    marginLeft: 'auto',
  },
  optionText: {
    textAlign: 'center',
    fontSize: 20,
    padding: 10,
  },
});

export default PostMenu;
