import React from 'react';
import { Box, Text } from "native-base";


const UserMessage = ({ numberOfMosques }) => {
  return (
    <Box alignSelf="center" bg={'warmGray.100'} py="3" px="2" mb="3" shadow={2} rounded="lg" >
      {numberOfMosques > 0 ?
        <Text fontSize="10" fontFamily="body" fontWeight="300" fontStyle="normal" >
          You're here,
          <Text fontSize="12" fontFamily="body" fontWeight="500" color="red.600"> {numberOfMosques} </Text>
          mosques around you in 3000 meters away
        </Text> :
        <Text fontSize="10" fontFamily="body" fontWeight="300" fontStyle="normal" color="red.600" >
          Sorry, There aren't mosques around you in 3000 meters away
        </Text>
      }
    </Box>
  )
}

export default UserMessage
