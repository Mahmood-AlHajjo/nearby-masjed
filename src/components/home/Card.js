import React from 'react';
import { Box, Stack, Heading, Text } from 'native-base';


const Card = ({ mosqueName, mosqueLocality, mosqueStreet }) => {
  return (
    <Box px="4">
      <Stack space={2}>
        <Heading size="md" ml="-1" fontFamily="body" fontWeight="300" fontStyle="normal" _light={{ color: "darkBlue.900" }}>
          {mosqueName}
        </Heading>
        <Text fontSize="sm" fontFamily="body" fontWeight="200" fontStyle="normal" _light={{ color: "teal.600" }} _dark={{ color: "teal.500" }} ml="-0.5" mt="-1">
          {mosqueLocality}, {mosqueStreet}
        </Text>
      </Stack>
    </Box>
  )
}

export default Card
