import React from 'react';
import {Linking} from 'react-native';
import RootTabNavigator from './src/navigation';
import {Amplify} from 'aws-amplify';
// @ts-ignore
// import {withAuthenticator} from 'aws-amplify-react-native';
import config from './src/aws-exports';
import {AuthContextProvider} from './src/contexts/AuthContext';
import InAppBrowser from 'react-native-inappbrowser-reborn';

const urlOpener = async (url: string, redirectUrl: string) => {
  await InAppBrowser.isAvailable();
  const response = await InAppBrowser.openAuth(url, redirectUrl, {
    showTitle: false,
    enableUrlBarHiding: true,
    enableDefaultShare: false,
    ephemeralWebSession: false,
  });

  if (response.type === 'success') {
    Linking.openURL(response.url);
  }
};

const updatedConfig = {
  ...config,
  oauth: {
    ...config.oauth,
    urlOpener,
  },
};

Amplify.configure(updatedConfig);

const App = () => {
  return (
    <AuthContextProvider>
      <RootTabNavigator />
    </AuthContextProvider>
  );
};

// const signUpConfig = {
//   hideAllDefaults: true,
//   signUpFields: [
//     {
//       label: 'Full Name',
//       placeholder: 'Full Name',
//       key: 'name',
//       required: true,
//       displayOrder: 1,
//       type: 'string',
//     },
//     {
//       label: 'Username',
//       placeholder: 'Username',
//       key: 'username',
//       required: true,
//       displayOrder: 2,
//       type: 'string',
//     },
//     {
//       label: 'Email',
//       placeholder: 'Email',
//       key: 'email',
//       required: true,
//       displayOrder: 3,
//       type: 'string',
//     },
//     {
//       label: 'Password',
//       placeholder: 'Password',
//       key: 'password',
//       required: true,
//       displayOrder: 4,
//       type: 'string',
//     },
//   ],
// };

// export default withAuthenticator(App, {signUpConfig});
export default App;
