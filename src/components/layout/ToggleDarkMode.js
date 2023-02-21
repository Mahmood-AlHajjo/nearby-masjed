import React from "react";
import { IconButton, Icon, useColorMode } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const ToggleDarkMode = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      onPress={toggleColorMode}
      icon={<Icon as={MaterialCommunityIcons} name="theme-light-dark" size='md' color="white" />}
    />
  )
}

export default ToggleDarkMode
