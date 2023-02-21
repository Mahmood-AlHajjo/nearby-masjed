import React, { useState } from 'react';
import { Text, Heading, Icon, Box, Stack, Button, Modal } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet } from 'react-native';


const ModalMap = ({
  isOpen = false,
  mosqueName,
  mosqueLocality,
  mosqueStreet,
  onClose = () => { },
  goToGoogleMap = () => { }
}) => {

  return (
    <Modal isOpen={isOpen} animationPreset='fade' onClose={() => onClose(false)} size='lg'>
      <Box bg={'warmGray.100'} py="4" px="3" shadow={2} rounded="lg" style={styles.box} >
        <Stack space={2}>
          <Heading size="md" ml="-1" fontFamily="body" fontWeight="300" fontStyle="normal" _light={{ color: "darkBlue.900" }}>
            {mosqueName}
          </Heading>
          <Text fontSize="12" fontFamily="body" fontWeight="200" fontStyle="normal" _light={{ color: "teal.600" }} _dark={{ color: "teal.500" }} ml="-0.5" mt="-1">
            {mosqueLocality}, {mosqueStreet}
          </Text>
          <Button onPress={goToGoogleMap} size="md" bg="green.600" variant="solid" endIcon={<Icon as={MaterialCommunityIcons} name="google-maps" size="lg" />}>
            Open in Google Maps
          </Button>
        </Stack>
      </Box>
    </Modal>
  )
}

export default ModalMap;

const styles = StyleSheet.create({
  box: {
    borderColor: '#166534',
    borderLeftWidth: 4,
    borderRightWidth: 4,
    pointerEvents: 'auto'
  }
})
