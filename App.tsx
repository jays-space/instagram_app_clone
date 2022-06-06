import React from 'react';
import RootTabNavigator from './src/navigation';
import Amplify from 'aws-amplify';
import config from './src/aws-exports';

Amplify.configure(config);

const App = () => {
  return <RootTabNavigator />;
};

export default App;
