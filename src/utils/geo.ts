export interface Coordinates {
  lat: number;
  lng: number;
}

export const INDIAN_CITIES_COORDS: Record<string, Coordinates> = {
  'mumbai': { lat: 19.0760, lng: 72.8777 },
  'delhi': { lat: 28.6139, lng: 77.2090 },
  'new delhi': { lat: 28.6139, lng: 77.2090 },
  'bengaluru': { lat: 12.9716, lng: 77.5946 },
  'bangalore': { lat: 12.9716, lng: 77.5946 },
  'pune': { lat: 18.5204, lng: 73.8567 },
  'chennai': { lat: 13.0827, lng: 80.2707 },
  'kochi': { lat: 9.9312, lng: 76.2673 },
  'hyderabad': { lat: 17.3850, lng: 78.4867 },
  'kolkata': { lat: 22.5726, lng: 88.3639 },
  'ahmedabad': { lat: 23.0225, lng: 72.5714 },
  'jaipur': { lat: 26.9124, lng: 75.7873 },
  'gurugram': { lat: 28.4595, lng: 77.0266 },
  'gurgaon': { lat: 28.4595, lng: 77.0266 },
  'noida': { lat: 28.5355, lng: 77.3910 }
};

export function getCityCoordinates(locationStr: string): Coordinates | null {
  const normalized = locationStr.toLowerCase();
  
  // Look for any of our predefined cities
  for (const [cityName, coords] of Object.entries(INDIAN_CITIES_COORDS)) {
    if (normalized.includes(cityName)) {
      return coords;
    }
  }
  
  // Fallbacks: Check if coordinate representation exists in string like "lat: 19.07, lng: 72.8"
  const matchReg = /lat:\s*([0-9.-]+),\s*lng:\s*([0-9.-]+)/i;
  const match = locationStr.match(matchReg);
  if (match) {
    const lat = parseFloat(match[1]);
    const lng = parseFloat(match[2]);
    if (!isNaN(lat) && !isNaN(lng)) {
      return { lat, lng };
    }
  }

  return null;
}

export function calculateDistance(coord1: Coordinates, coord2: Coordinates): number {
  const R = 6371; // Radius of the Earth in km
  const dLat = deg2rad(coord2.lat - coord1.lat);
  const dLon = deg2rad(coord2.lng - coord1.lng);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(coord1.lat)) * Math.cos(deg2rad(coord2.lat)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d;
}

function deg2rad(deg: number): number {
  return deg * (Math.PI / 180);
}
