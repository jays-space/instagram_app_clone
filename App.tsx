import React from 'react';
import RootTabNavigator from './src/navigation';
import {Amplify} from 'aws-amplify';
// @ts-ignore
// import {withAuthenticator} from 'aws-amplify-react-native';
import config from './src/aws-exports';

Amplify.configure(config);

const App = () => {
  return <RootTabNavigator />;
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
