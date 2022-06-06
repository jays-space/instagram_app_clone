import React, {useState} from 'react';
import {
  View,
  Image,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import {Auth} from 'aws-amplify';

// CONTEXTS
import {useAuthContext} from '../../../contexts/AuthContext';

// TYPES
import {SignInNavigationProp} from '../../../types/navigation';

// COMPONENTS
import FormInput from '../components/FormInput';
import CustomButton from '../components/CustomButton';
import SocialSignInButtons from '../components/SocialSignInButtons';

type ISignInData = {
  username: string;
  password: string;
};

const SignInScreen = () => {
  const {height} = useWindowDimensions();
  const navigation = useNavigation<SignInNavigationProp>();
  const {setCurrentUser} = useAuthContext();

  const [isLoading, setIsLoading] = useState(false);

  const {control, handleSubmit, reset} = useForm<ISignInData>();

  const onSignInPressed = async ({username, password}: ISignInData) => {
    if (isLoading) {
      // if currently loading => return
      return;
    } else {
      setIsLoading(true);
    }

    try {
      const cognitoUser = await Auth.signIn(username, password);

      //* save currentUser in context
      setCurrentUser({...cognitoUser});
    } catch (e) {
      // if account not yet confirmed to confirm email page
      if ((e as Error).name === 'UserNotConfirmedException') {
        navigation.navigate('Confirm email', {username});
      } else {
        Alert.alert('Oopsie!', (e as Error).message);
      }
    } finally {
      setIsLoading(false);
      reset();
    }

    // validate user
    // navigation.navigate('Home');
  };

  const onForgotPasswordPressed = () => {
    navigation.navigate('Forgot password');
  };

  const onSignUpPress = () => {
    navigation.navigate('Sign up');
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Image
          source={require('../../../assets/images/logo.png')}
          style={[styles.logo, {height: height * 0.3}]}
          resizeMode="contain"
        />

        <FormInput
          name="username"
          placeholder="Username"
          control={control}
          rules={{required: 'Username is required'}}
        />

        <FormInput
          name="password"
          placeholder="Password"
          secureTextEntry
          control={control}
          rules={{
            required: 'Password is required',
            minLength: {
              value: 3,
              message: 'Password should be minimum 3 characters long',
            },
          }}
        />

        <CustomButton
          text={isLoading ? 'Loading...' : 'Sign In'}
          onPress={handleSubmit(onSignInPressed)}
        />

        <CustomButton
          text="Forgot password?"
          onPress={onForgotPasswordPressed}
          type="TERTIARY"
        />

        <SocialSignInButtons />

        <CustomButton
          text="Don't have an account? Create one"
          onPress={onSignUpPress}
          type="TERTIARY"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: '70%',
    maxWidth: 300,
    maxHeight: 200,
  },
});

export default SignInScreen;
