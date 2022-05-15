import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

// SCREENS
import {HomeScreen} from './src/screens/Home';
import {CommentsScreen} from './src/screens/Comments';

const App = () => {
  return (
    <SafeAreaView style={styles.root}>
      <CommentsScreen />
      {/* <HomeScreen /> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

export default App;
