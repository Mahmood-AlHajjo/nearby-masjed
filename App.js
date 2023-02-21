import * as React from 'react';
import { Text } from "react-native";
import { extendTheme, NativeBaseProvider } from "native-base";
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';

import Main from '@navigators/Main';
import { customTheme, fonts } from '@style'


function App() {
  const [fontsLoaded] = useFonts(fonts);
  if (!fontsLoaded) {
    return <Text>Loading</Text>
  }
  const theme = extendTheme(customTheme);

  return (
    <NativeBaseProvider theme={theme}>
      <NavigationContainer>
        <Main />
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

export default App;
