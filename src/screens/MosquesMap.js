import React, { useEffect, useState } from 'react';
import { MAPBOX_SECRET_KEY } from "@env";
import MapboxGL from '@rnmapbox/maps';
import { StyleSheet, View } from 'react-native'
import { Center, Button } from "native-base";
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

import Modal from '@components/map/Modal';
import Menu from '@components/map/Menu';
import UserMessage from '@components/map/UserMessage';
import ErrorMessage from "@components/common/ErrorMessage";
import { featuresFormatter, goToGoogleMap, mapStyleType } from '@utils/helpers'


MapboxGL.setAccessToken(MAPBOX_SECRET_KEY);

const MosquesMap = ({ navigation, route }) => {
  const { params } = route
  const [mosques, setMosques] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showCompass, setShowCompass] = useState(false);
  const [showScaleBar, setShowScaleBar] = useState(false);
  const [styleTypeMap, setStyleTypeMap] = useState('Street');
  const [permissionLocation, setPermissionLocation] = useState('granted');
  const [locationUser, setLocation] = useState(null);
  const [selectedMosque, setSelectedMosque] = useState(null);

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
    setMosques(params?.mosques)
  }, [])

  const onPressMosque = (mosqueInfo) => {
    setSelectedMosque(mosqueInfo)
    setShowModal(true)
  }

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

  return (
    <View style={styles.map}>
      {locationUser &&
        <MapboxGL.MapView style={styles.map} styleURL={mapStyleType(styleTypeMap)} scaleBarEnabled={showScaleBar} compassEnabled={showCompass}>
          <MapboxGL.Camera zoomLevel={14} animationMode='easeTo' centerCoordinate={[locationUser?.coords?.latitude, locationUser?.coords?.longitude]} />
          <MapboxGL.PointAnnotation id='pointAnnotation' title='user location' coordinate={[locationUser?.coords?.latitude, locationUser?.coords?.longitude]} >
            <MapboxGL.Callout>
              <UserMessage numberOfMosques={mosques?.length} />
            </MapboxGL.Callout>
          </MapboxGL.PointAnnotation>
          <MapboxGL.Images id="mosquesImages" images={{ 'mosque-icon': require('@assets/images/mosque.png') }} />
          <MapboxGL.ShapeSource
            id="mosques"
            shape={{ type: 'FeatureCollection', features: featuresFormatter(mosques) }}
            onPress={onPressMosque}
          >
            <MapboxGL.SymbolLayer id="mosqueIcons" style={styles.icon} />
          </MapboxGL.ShapeSource>
        </MapboxGL.MapView>}
      <Modal
        isOpen={showModal}
        mosqueName={selectedMosque?.features?.[0].properties?.name}
        mosqueLocality={selectedMosque?.features?.[0].properties?.locality}
        mosqueStreet={selectedMosque?.features?.[0].properties?.street}
        onClose={setShowModal}
        goToGoogleMap={() => goToGoogleMap(selectedMosque?.coordinates?.latitude, selectedMosque?.coordinates?.longitude)}
      />
      <Menu
        showScaleBar={showScaleBar}
        showCompass={showCompass}
        styleTypeMap={styleTypeMap}
        setShowScaleBar={setShowScaleBar}
        setShowCompass={setShowCompass}
        setStyleTypeMap={setStyleTypeMap}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  icon: {
    iconImage: 'mosque-icon',
    iconSize: 0.06,
    iconAllowOverlap: true,
  },
});

export default MosquesMap;
