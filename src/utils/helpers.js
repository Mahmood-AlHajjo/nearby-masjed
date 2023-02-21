import * as Linking from 'expo-linking';

export const featuresFormatter = (mosques = []) => {
  const features = mosques.map(mosque => ({
    type: 'Feature',
    properties: { id: mosque?._id, name: mosque.masjidName, locality: mosque?.masjidAddress?.locality, street: mosque?.masjidAddress?.street },
    geometry: { type: 'Point', coordinates: mosque?.masjidLocation?.coordinates },

  }))
  return features || [];
}

export const goToGoogleMap = (longitude, latitude) => {
  const url = `https://www.google.com/maps/search/?api=1&query=${longitude},${latitude}`;
  Linking.openURL(url);
}

export const mapStyleType = (type) => {
  switch (type) {
    case 'Dark':
      return 'mapbox://styles/mapbox/dark-v10';
    case 'Street':
      return 'mapbox://styles/mapbox/streets-v11';
    case 'Light':
      return 'mapbox://styles/mapbox/light-v10';
    default:
      return 'mapbox://styles/mapbox/streets-v11';
  }
}
