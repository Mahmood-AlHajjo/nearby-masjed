import React, { useEffect, useState } from 'react'
import { Center, Divider, Box, Button, Fab, Icon } from "native-base";
import { FlashList } from "@shopify/flash-list";
import { useIsFocused } from '@react-navigation/native';
import * as Permissions from 'expo-permissions';
import * as Linking from 'expo-linking';
import * as Location from 'expo-location';
import { FontAwesome5 } from "@expo/vector-icons";

import { useAPI } from "@hooks";
import Card from "@components/home/Card";
import Shimmer from "@components/home/Shimmer";
import ErrorMessage from "@components/common/ErrorMessage";


const Mosques = ({ navigation }) => {

  const isFocused = useIsFocused();
  const [location, setLocation] = useState(null);
  const [permissionLocation, setPermissionLocation] = useState('denied');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const latitude = location?.coords?.latitude
  const longitude = location?.coords?.longitude

  const [{ data: mosques, loading: isLoading, error: mosquesError }, fetchMosques] = useAPI(
    `/lat$${latitude},lng$${longitude},rad$3000/`,
    {},
    { data: [], loading: true }
  );

  const getLocationAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status === 'granted') {
      setPermissionLocation('granted')
      const location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    } else if (status === 'denied') {
      setPermissionLocation('denied')
    }
  };

  useEffect(() => {
    getLocationAsync()
  }, [])

  useEffect(() => {
    permissionLocation === 'granted' && fetchMosques()
  }, [permissionLocation])

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchMosques()
    setIsRefreshing(false);
  };


  if (permissionLocation === 'denied') {
    return (
      <>
        <Center flex={1}>
          <Button onPress={() => Linking.openSettings()} size="lg" mb="2" bg="amber.300:alpha.70" color='gray.300' variant="unstyled">
            Go to settings
          </Button>
          <ErrorMessage message={'Please grant location permission in your device!'} colorScheme='warning' />
        </Center>
      </>
    )
  }

  if (mosquesError) {
    return (
      <>
        <Center flex={1}>
          <Button onPress={() => fetchMosques()} isLoading={isLoading} size="lg" mb="2" colorScheme="secondary" variant="subtle">
            Try again
          </Button>
          <ErrorMessage message={'something wrong please try again'} colorScheme='error' />
        </Center>
      </>
    )
  }

  return (
    <>
      <Box _dark={{ bg: "blueGray.900" }} _light={{ bg: "blueGray.50" }} flex={1} >
        {isLoading ?
          <Shimmer />
          :
          <FlashList
            data={mosques}
            renderItem={({ item }) => <Card mosqueName={item?.masjidName} mosqueLocality={item?.masjidAddress?.locality} mosqueStreet={item?.masjidAddress?.street} />}
            estimatedItemSize={200}
            ItemSeparatorComponent={() => <Divider my="4" />}
            ListEmptyComponent={() => <></>}
            ListHeaderComponentStyle={{ paddingTop: 16 }}
            ListFooterComponentStyle={{ paddingTop: 16 }}
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
          />}
      </Box>
      {isFocused && <Fab onPress={() => {
        (permissionLocation && location) && navigation.navigate('Mosques Map', { mosques })
      }} bg="green.700" shadow={2} size="lg" icon={<Icon color="white" as={FontAwesome5} name="map-marked-alt" size="lg" />} />}
    </>
  )
}

export default Mosques
