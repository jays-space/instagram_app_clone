import React, {useState} from 'react';
import {View, Image, StyleSheet, TextInput, Alert} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useMutation} from '@apollo/client';

// CONTEXTS
import {useAuthContext} from '../../contexts/AuthContext';

// TYPES
import {CreateNavigationProp, CreateRouteProp} from '../../types/navigation';
import {CreatePostMutation, CreatePostMutationVariables} from '../../API';

// GQL
import {createPost} from './queries';

// COMPONENTS
import {Button} from '../../components/Button';
import {Carousel} from '../../components/Carousel';
import {VideoPlayer} from '../../components/VideoPlayer';

// STYLES
import {colors} from '../../theme/colors';

const CreatePostScreen = () => {
  const navigation = useNavigation<CreateNavigationProp>();

  const {currentUserId} = useAuthContext();
  const [description, setDescription] = useState('');

  const route = useRoute<CreateRouteProp>();
  const {image, images, video} = route?.params;

  const [onCreatePost] = useMutation<
    CreatePostMutation,
    CreatePostMutationVariables
  >(createPost);

  const submit = async () => {
    try {
      await onCreatePost({
        variables: {
          input: {
            description,
            image,
            images,
            video,
            nofComments: 0,
            nofLikes: 0,
            userID: currentUserId,
          },
        },
      });
      navigation.popToTop();
      navigation.navigate('HomeStack');
    } catch (e) {
      Alert.alert('Error uploading the post, ', (e as Error).message);
    }
  };

  let content = null;
  if (image) {
    content = (
      <Image
        source={{
          uri: image,
        }}
        resizeMode="cover"
        style={styles.image}
      />
    );
  } else if (images && images?.length > 0) {
    content = <Carousel images={images} />;
  } else if (video) {
    content = <VideoPlayer video={video} />;
  }

  return (
    <View style={styles.root}>
      <View style={styles.content}>{content}</View>
      <TextInput
        placeholder="Description..."
        style={styles.input}
        multiline
        // numberOfLines={5}
        value={description}
        onChangeText={setDescription}
      />

      <Button title="Submit" onPress={submit} />
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

export default CreatePostScreen;
