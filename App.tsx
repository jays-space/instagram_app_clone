import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

// SCREENS
import {HomeScreen} from './src/screens/Home';
import {CommentsScreen} from './src/screens/Comments';
import {ProfileScreen} from './src/screens/Profile';
import {EditProfileScreen} from './src/screens/EditProfile';
import {PostUploadScreen} from './src/screens/PostUploadScreen';

const App = () => {
  return (
    <SafeAreaView style={styles.root}>
      <PostUploadScreen />
      {/* <EditProfileScreen /> */}
      {/* <ProfileScreen /> */}
      {/* <CommentsScreen /> */}
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
