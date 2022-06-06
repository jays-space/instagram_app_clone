import React, {useState} from 'react';
import {Auth} from 'aws-amplify';
import {View, Text, StyleSheet, ScrollView, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {useForm} from 'react-hook-form';
import {useRoute} from '@react-navigation/native';

// TYPES
import {
  ConfirmEmailNavigationProp,
  ConfirmEmailRouteProp,
} from '../../../types/navigation';

// COMPONENTS
import FormInput from '../components/FormInput';
import CustomButton from '../components/CustomButton';
// import SocialSignInButtons from '../components/SocialSignInButtons';

type ConfirmEmailData = {
  username: string;
  code: string;
};

const ConfirmEmailScreen = () => {
  const route = useRoute<ConfirmEmailRouteProp>();
  const navigation = useNavigation<ConfirmEmailNavigationProp>();

  const {control, handleSubmit, watch} = useForm<ConfirmEmailData>({
    defaultValues: {username: route.params.username},
  });

  const usr = watch('username'); // store value of field in variable

  const [isLoading, setIsLoading] = useState(false);

  const onConfirmPressed = async ({code, username}: ConfirmEmailData) => {
    if (isLoading) {
      return;
    } else {
      setIsLoading(true);
    }

    try {
      await Auth.confirmSignUp(username, code);
      navigation.navigate('Sign in');
    } catch (e) {
      Alert.alert('Oopsie!', (e as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const onSignInPress = () => {
    navigation.navigate('Sign in');
  };

  const onResendPress = async () => {
    try {
      await Auth.resendSignUp(usr);
      Alert.alert('Check your email', 'The code has been sent');
    } catch (e) {
      Alert.alert('Oopsie!', (e as Error).message);
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={styles.title}>Confirm your email</Text>

        <FormInput
          name="username"
          control={control}
          placeholder="Username"
          rules={{
            required: 'Username is required',
          }}
        />

        <FormInput
          name="code"
          control={control}
          placeholder="Enter your confirmation code"
          rules={{
            required: 'Confirmation code is required',
          }}
        />

        <CustomButton
          text={isLoading ? 'Loading...' : 'Confirm'}
          onPress={handleSubmit(onConfirmPressed)}
        />

        <CustomButton
          text="Resend code"
          onPress={onResendPress}
          type="SECONDARY"
        />

        <CustomButton
          text="Back to Sign in"
          onPress={onSignInPress}
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#051C60',
    margin: 10,
  },
  text: {
    color: 'gray',
    marginVertical: 10,
  },
  link: {
    color: '#FDB075',
  },
});

export default ConfirmEmailScreen;
