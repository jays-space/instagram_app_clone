import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  SafeAreaView,
  Text,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useLazyQuery, useMutation, useQuery} from '@apollo/client';
import {useForm} from 'react-hook-form';
import * as ImagePicker from 'react-native-image-picker';

// CONTEXTS
import {useAuthContext} from '../../contexts/AuthContext';

// TYPES
import {
  GetUserQuery,
  GetUserQueryVariables,
  UpdateUserMutation,
  UpdateUserMutationVariables,
  UsersByUsernameQuery,
  UsersByUsernameQueryVariables,
} from '../../API';
import {IEditableUser} from '../../components/CustomInput/CustomInput.component';

// GQL
import {getUser, updateUser, usersByUsername} from './queries';

// COMPONENTS
import {ApiErrorMessage} from '../../components/ApiErrorMessage';
import {CustomInput} from '../../components/CustomInput';

// STYLES
import {styles} from './EditProfileScreen.styles';
import {DEFAULT_USER_IMAGE} from '../../config';

const URL_REGEX =
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

const EditProfileScreen = () => {
  const navigation = useNavigation();

  const {currentUserId} = useAuthContext();
  const [selectedPhoto, setSelectedPhoto] = useState<ImagePicker.Asset | null>(
    null,
  );
  const {control, handleSubmit, setValue} = useForm<IEditableUser>();

  const {data, loading, error} = useQuery<GetUserQuery, GetUserQueryVariables>(
    getUser,
    {variables: {id: currentUserId}},
  );

  const [
    onGetUsernames,
    {
      // data: getUsernamesDate,
      // loading: getUsernamesLoading,
      // error: getUsernamesError,
    },
  ] = useLazyQuery<UsersByUsernameQuery, UsersByUsernameQueryVariables>(
    usersByUsername,
  );

  const [onUpdateUserStart, {loading: updateLoading, error: updateError}] =
    useMutation<UpdateUserMutation, UpdateUserMutationVariables>(updateUser); // CRUD 39:40

  const user = data?.getUser;

  useEffect(() => {
    if (user) {
      setValue('name', user?.name);
      setValue('username', user?.username);
      setValue('website', user?.website);
      setValue('bio', user?.bio);
    }
  }, [user, setValue]);

  // const {control, handleSubmit} = useForm<IEditableUser>({
  //   defaultValues: {
  //     name: user?.name,
  //     username: user?.username,
  //     website: user?.website,
  //     bio: user?.bio,
  //   },
  // });

  const onSubmit = async (formData: IEditableUser) => {
    if (!user) {
      return;
    }
    await onUpdateUserStart({
      variables: {input: {id: user?.id, ...formData, _version: user?._version}},
    });

    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  const onChangePhoto = () => {
    ImagePicker.launchImageLibrary(
      {mediaType: 'photo'},
      ({didCancel, errorCode, assets}) => {
        if (!didCancel && !errorCode && assets && assets.length > 0) {
          //   console.log(assets);
          setSelectedPhoto(assets[0]);
        }
      },
    );
  };

  const validateUsername = async (username: string) => {
    // query the db based on the usersByUsername
    try {
      const response = await onGetUsernames({variables: {username}});

      if (error) {
        Alert.alert('Failed to get the username');
        return 'Failed to get the username';
      }

      const users = response?.data?.usersByUsername?.items;

      // if there are any users with the same username, then return error
      if (users && users?.length > 0 && users[0]?.id !== currentUserId) {
        console.log('taken');
        return 'Username is already taken';
      }
    } catch (e) {
      Alert.alert('Failed to get the username');
    }

    // return valid (username is available)
    console.log('true');

    return true;
  };

  if (loading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return (
      <ApiErrorMessage title="Could not get user" message={error.message} />
    );
  }

  if (updateError) {
    return (
      <ApiErrorMessage
        title="Could not update user"
        message={updateError.message}
      />
    );
  }

  return (
    <SafeAreaView style={styles.root}>
      <Image
        source={{
          uri: selectedPhoto?.uri ?? (user?.image || DEFAULT_USER_IMAGE),
        }}
        style={styles.avatar}
      />
      <Text onPress={onChangePhoto} style={styles.button}>
        Change Profile Photo
      </Text>

      <CustomInput
        name="name"
        control={control}
        rules={{required: 'Name is required'}}
        label="Name"
      />
      <CustomInput
        name="username"
        control={control}
        rules={{
          required: 'Username is required',
          minLength: {
            value: 3,
            message: 'Username should be more that 3 characters.',
          },
          validate: validateUsername,
        }}
        label="Username"
      />
      <CustomInput
        name="website"
        control={control}
        rules={{
          required: false,
          pattern: {value: URL_REGEX, message: 'Invalid URL'},
        }}
        label="Website"
      />
      <CustomInput
        name="bio"
        control={control}
        rules={{
          required: false,
          maxLength: {
            value: 200,
            message: 'Bio should be less than 200 characters.',
          },
        }}
        label="Bio"
        multiline
      />

      <Text onPress={handleSubmit(onSubmit)} style={styles.button}>
        {updateLoading ? 'Submitting...' : 'Submit'}
      </Text>
    </SafeAreaView>
  );
};

export default EditProfileScreen;
