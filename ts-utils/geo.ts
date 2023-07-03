const deg2rad = (deg: number) => {
  return deg * (Math.PI / 180);
};

const getDistanceBetweenCoordinates = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
  unit: 'km' | 'mi' = 'km'
) => {
  const R = unit === 'mi' ? 3958.8 : 6371; // Radius of the earth in km or mi
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km or mi
  return d;
};