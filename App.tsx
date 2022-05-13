import {SafeAreaView, Text} from 'react-native';
import {colors} from './src/theme/colors';
import fonts from './src/theme/fonts';
import AntDesign from 'react-native-vector-icons/AntDesign';

const App = () => {
  return (
    <SafeAreaView
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text
        style={{
          color: colors.primary,
          fontSize: fonts.size.xl,
          fontWeight: fonts.weight.full,
        }}>
        Hello World
        <AntDesign name="stepforward" size={24} />
      </Text>
    </SafeAreaView>
  );
};

export default App;
