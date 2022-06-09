import React, {useEffect, useState} from 'react';
import {View, StyleSheet, TextInput, ActivityIndicator} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useMutation, useQuery} from '@apollo/client';

// CONTEXTS
import {useAuthContext} from '../../contexts/AuthContext';

// TYPES
import {
  CreateNavigationProp,
  UpdatePostRouteProp,
} from '../../types/navigation';

// GQL
import {getPost, updatePost} from './queries';

// COMPONENTS
import {Button} from '../../components/Button';

// STYLES
import {colors} from '../../theme/colors';
import {
  GetPostQuery,
  GetPostQueryVariables,
  UpdatePostMutation,
  UpdatePostMutationVariables,
} from '../../API';
import {ApiErrorMessage} from '../../components/ApiErrorMessage';

const UpdatePostScreen = () => {
  const navigation = useNavigation<CreateNavigationProp>();
  const [description, setDescription] = useState('');
  const {currentUserId} = useAuthContext();
  const route = useRoute<UpdatePostRouteProp>();
  const {postId} = route?.params;

  const {data, loading, error} = useQuery<GetPostQuery, GetPostQueryVariables>(
    getPost,
    {
      variables: {id: postId},
    },
  );

  const [onUpdatePostStart, {data: updatePostData, error: updatePostError}] =
    useMutation<UpdatePostMutation, UpdatePostMutationVariables>(updatePost);

  // Get most updated post data from db and set to state
  useEffect(() => {
    if (data) {
      setDescription(data?.getPost?.description || '');
    }
  }, [data]);

  // update most current data
  const submit = async () => {
    await onUpdatePostStart({
      variables: {
        input: {
          id: postId,
          description,
          userID: currentUserId,
          _version: data?.getPost?._version,
        },
      },
    });

    if (updatePostData) {
      navigation.goBack();
    }
  };

  if (loading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return (
      <ApiErrorMessage title="Cannot fetch post" message={error.message} />
    );
  }

  if (updatePostError) {
    return (
      <ApiErrorMessage
        title="Cannot update post"
        message={updatePostError.message}
      />
    );
  }

  return (
    <View style={styles.root}>
      <TextInput
        placeholder="Description..."
        style={styles.input}
        multiline
        // numberOfLines={5}
        value={description}
        onChangeText={setDescription}
      />

      <Button title={loading ? 'Submitting...' : 'Submit'} onPress={submit} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    // padding: 10,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
  },
  content: {
    width: '100%',
    aspectRatio: 1,
  },
  input: {
    marginVertical: 10,
    alignSelf: 'stretch',
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 5,
  },
});

export default UpdatePostScreen;
