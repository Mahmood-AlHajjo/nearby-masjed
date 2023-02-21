import React from 'react';
import { Menu, Fab, Icon } from "native-base";
import { FontAwesome5 } from "@expo/vector-icons";

const MenuMap = ({
  showScaleBar = false,
  showCompass = false,
  styleTypeMap = 'MapboxGL',
  setShowScaleBar = () => { },
  setShowCompass = () => { },
  setStyleTypeMap = () => { }
}) => {

  return (
    <Menu w="150" mb="3" mr="3" trigger={triggerProps => <Fab accessibilityLabel="More options menu" {...triggerProps} bg="green.700" shadow={2} size="lg" icon={<Icon color="white" as={FontAwesome5} name="magic" size="lg" />} />}>
      <Menu.Item onPress={() => setShowScaleBar(!showScaleBar)}>Scale Bar</Menu.Item>
      <Menu.Item onPress={() => setShowCompass(!showCompass)}>Compass</Menu.Item>
      <Menu.OptionGroup defaultValue={styleTypeMap} title="Map Style" type="radio">
        <Menu.ItemOption value='Light' onPress={() => setStyleTypeMap('Light')}>Light</Menu.ItemOption>
        <Menu.ItemOption value='Dark' onPress={() => setStyleTypeMap('Dark')}>Dark</Menu.ItemOption>
        <Menu.ItemOption value='Street' onPress={() => setStyleTypeMap('Street')}>Street</Menu.ItemOption>
      </Menu.OptionGroup>
    </Menu>
  )
}

export default MenuMap;
