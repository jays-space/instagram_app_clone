import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';

// COMPONENTS
import {Button} from '../Button';

// STYLES
import {colors} from '../../theme/colors';

interface IApiErrorMessage {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

const ApiErrorMessage = ({
  title = 'Error',
  message = 'Unknown Error',
  onRetry = () => {},
}: IApiErrorMessage) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/error.png')}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
      <Button title="Retry" onPress={onRetry} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  image: {
    width: '70%',
    height: 200,
  },
  title: {
    fontSize: 18,
    margin: 20,
  },
  message: {
    color: colors.grey,
    marginBottom: 10,
  },
});

export default ApiErrorMessage;
