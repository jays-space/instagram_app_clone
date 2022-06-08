import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useMutation, useQuery} from '@apollo/client';
import {useForm, Control, Controller} from 'react-hook-form';
import * as ImagePicker from 'react-native-image-picker';

// CONTEXTS
import {useAuthContext} from '../../contexts/AuthContext';

// TYPES
import {
  GetUserQuery,
  GetUserQueryVariables,
  UpdateUserMutation,
  UpdateUserMutationVariables,
  User,
} from '../../API';

// GQL
import {getUser, updateUser} from './queries';

// COMPONENTS
import {ApiErrorMessage} from '../../components/ApiErrorMessage';

// STYLES
import {colors} from '../../theme/colors';
import fonts from '../../theme/fonts';
import {DEFAULT_USER_IMAGE} from '../../config';

//* Creates a new type based on another type.
//* However, Pick enables us to select specific keys we'd like to pass into the new type.
//* This makes it such that if we edit/update the original interface/type, we automatically get the edits to the picked keys in the new type as well
type IEditableUserField = 'name' | 'username' | 'bio' | 'website' | 'image';
type IEditableUser = Pick<User, IEditableUserField>;

interface ICustomInput {
  label: string;
  name: IEditableUserField;
  control: Control<IEditableUser, object>;
  rules?: object;
  multiline?: boolean;
}

const URL_REGEX =
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

const CustomInput = ({
  label = 'Your label',
  name,
  control,
  rules = {},
  multiline = false,
}: ICustomInput) => (
  <Controller
    control={control}
    name={name}
    rules={rules}
    render={({
      field: {onChange, onBlur, value},
      fieldState: {error, isTouched},
    }) => {
      return (
        <View style={styles.inputContainer}>
          <Text style={styles.label}>{label}</Text>

          {/* Input & Error text1 */}
          <View style={{flex: 1}}>
            <TextInput
              placeholder={label}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value || ''}
              multiline={multiline}
              style={[
                styles.input,
                {
                  borderColor:
                    error && isTouched ? colors.error : colors.border,
                },
              ]}
            />

            {error && isTouched && (
              <Text style={{color: colors.error}}>
                {error.message || error.type}
              </Text>
            )}
          </View>
        </View>
      );
    }}
  />
);

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

    navigation.goBack();
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

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  avatar: {
    width: '30%',
    aspectRatio: 1,

    borderRadius: 100,
  },
  button: {
    color: colors.primary,
    fontSize: fonts.size.md,
    fontWeight: fonts.weight.semi_bold,

    margin: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  label: {
    width: '20%',
  },
  input: {
    borderBottomWidth: 1,
    // borderColor: colors.border,

    minHeight: 50,
  },
});
