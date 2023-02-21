import React from "react";
import { Skeleton, VStack, Box, Stack, Divider } from "native-base";

const ShimmerCard = () => {
  return (
    <Stack space={2} px="4">
      <Skeleton size="32" h="5" rounded="full" startColor="light.300" />
      <Skeleton.Text lines={1} w="80%" maxW="220" pt="1" startColor="teal.100" />
    </Stack>
  )
}

const Shimmer = () => {
  const ShimmerCards = new Array(9).fill('').map((index) => <ShimmerCard key={index + Math.random()} />);

  return (
    <Box my="4">
      <VStack space="4" divider={<Divider />}>
        {ShimmerCards}
      </VStack>
    </Box>
  )
}

export default Shimmer
