import React from "react";
import { HStack, Text, Box } from "native-base";
import { StatusBar } from 'expo-status-bar';
import { getHeaderTitle } from '@react-navigation/elements';
import ToggleDarkMode from './ToggleDarkMode';
import { IconButton, Icon, useColorMode } from "native-base";
import { Ionicons } from "@expo/vector-icons";


const AppBar = ({ navigation, route, options, back }) => {
  const title = getHeaderTitle(options, route.title);
  const { name } = route;

  return (
    <>
      <StatusBar style="light" />
      <Box safeAreaTop bg="green.800" />
      <HStack bg="green.800" px="1" py="3" justifyContent="space-between" alignItems="center" w="100%">
        <HStack alignItems="center" pl="3">
          {name === 'Mosques Map' &&
            <IconButton
              onPress={() => navigation.goBack()}
              icon={<Icon as={Ionicons} name="arrow-back-outline" size='md' color="white" />}
            />}
          <Text fontFamily="body" fontWeight="300" fontStyle="normal" color="white" fontSize="20" letterSpacing='lg' >
            {title}
          </Text>
        </HStack>
        <HStack alignItems="center" pr="3">
          <ToggleDarkMode />
        </HStack>
      </HStack>
    </>
  )
}

export default AppBar
