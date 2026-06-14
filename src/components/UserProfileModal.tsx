import React, { useState } from 'react';
import { UserProfile } from '../types';
import { 
  X, 
  User, 
  Mail, 
  Phone, 
  Shield, 
  MapPin, 
  Locate, 
  LogOut, 
  LogIn, 
  CheckCircle,
  Clock
} from 'lucide-react';
import { INDIAN_CITIES_COORDS, getCityCoordinates } from '../utils/geo';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile: UserProfile;
  onUpdateProfile: (profile: UserProfile) => void;
}

export default function UserProfileModal({ 
  isOpen, 
  onClose, 
  userProfile, 
  onUpdateProfile 
}: UserProfileModalProps) {
  const [name, setName] = useState(userProfile.name);
  const [email, setEmail] = useState(userProfile.email);
  const [phone, setPhone] = useState(userProfile.phone);
  const [licenseType, setLicenseType] = useState(userProfile.licenseType);
  const [locationName, setLocationName] = useState(userProfile.locationName);
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(userProfile.coordinates);
  
  const [geoStatus, setGeoStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [geoMessage, setGeoMessage] = useState('');

  if (!isOpen) return null;

  // Handle GPS location detection
  const handleDetectGPS = () => {
    if (!navigator.geolocation) {
      setGeoStatus('error');
      setGeoMessage('Geolocation is not supported by your browser.');
      return;
    }

    setGeoStatus('loading');
    setGeoMessage('Accessing high-precision GPS telemetry...');

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        
        setCoords({ lat, lng });
        setGeoStatus('success');
        
        // Find nearest city from our list to give a pleasant readable label
        let nearestCity = 'Custom Coordinates';
        let minDistance = Infinity;
        
        for (const [cityName, cityCoords] of Object.entries(INDIAN_CITIES_COORDS)) {
          // simple straight line estimate
          const dist = Math.sqrt(
            Math.pow(lat - cityCoords.lat, 2) + Math.pow(lng - cityCoords.lng, 2)
          );
          if (dist < minDistance) {
            minDistance = dist;
            nearestCity = cityName.charAt(0).toUpperCase() + cityName.slice(1);
          }
        }
        
        const friendlyName = `${nearestCity} (GPS: ${lat.toFixed(4)}, ${lng.toFixed(4)})`;
        setLocationName(friendlyName);
        setGeoMessage(`Successfully acquired coordinates! Nearest identified hub: ${nearestCity}`);
      },
      (error) => {
        setGeoStatus('error');
        setGeoMessage(`GPS failed: ${error.message}. Please select cities manually below.`);
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  };

  const handleCitySelect = (cityName: string) => {
    const matchedCoords = INDIAN_CITIES_COORDS[cityName.toLowerCase()];
    if (matchedCoords) {
      setCoords(matchedCoords);
      setLocationName(cityName);
      setGeoStatus('success');
      setGeoMessage(`Position snapped to pre-mapped terminal: ${cityName}`);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Sniff clean coordinates based on string text if we manually typed it
    let finalCoords = coords;
    if (!finalCoords || locationName !== userProfile.locationName) {
      const match = getCityCoordinates(locationName);
      if (match) {
        finalCoords = match;
      }
    }

    onUpdateProfile({
      name,
      email,
      phone,
      licenseType,
      locationName: locationName || 'Unknown Location, IN',
      coordinates: finalCoords,
      isLoggedIn: true
    });
    
    onClose();
  };

  const handleLogout = () => {
    onUpdateProfile({
      name: '',
      email: '',
      phone: '',
      licenseType: 'LMV Badge',
      locationName: 'Not Logged In',
      coordinates: null,
      isLoggedIn: false
    });
    onClose();
  };

  return (
    <div id="modal-container" className="fixed inset-0 z-100 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-950/70 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div 
        id="profile-modal-box" 
        className="relative bg-white rounded-3xl overflow-hidden shadow-2xl max-w-lg w-full border border-slate-100 animate-in fade-in zoom-in-95 duration-200 z-10 flex flex-col max-h-[90vh]"
      >
        {/* Banner with modern gradient and road vector style */}
        <div className="bg-slate-900 text-white p-6 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-emerald-600/10 pointer-events-none" />
          
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white p-1.5 transition-colors focus:outline-none"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="flex items-center space-x-3 relative z-10">
            <div className="h-11 w-11 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-md">
              <User className="h-5.5 w-5.5" />
            </div>
            <div>
              <h2 className="font-sans font-bold text-lg leading-tight">Driver Registry & Credentials</h2>
              <p className="text-[11px] text-slate-400 font-mono tracking-wide mt-0.5">
                {userProfile.isLoggedIn ? 'LOGGED IN PROFILE' : 'VISITOR TERMINAL'}
              </p>
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <form onSubmit={handleSave} className="overflow-y-auto p-6 space-y-6 flex-1">
          
          {/* Geolocation Detection Controller */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide flex items-center gap-1.5">
                  <Locate className="h-4 w-4 text-blue-600" />
                  <span>Real-time GPS Tracking</span>
                </h4>
                <p className="text-[11px] text-slate-500 mt-0.5">Detect nearest active vacancies via coordinate matching</p>
              </div>
              <button
                type="button"
                id="gps-trigger-btn"
                onClick={handleDetectGPS}
                className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors cursor-pointer flex items-center gap-1"
              >
                <Locate className="h-3.5 w-3.5" />
                <span>GPS Locate</span>
              </button>
            </div>

            {/* Geolocation Messages */}
            {geoStatus !== 'idle' && (
              <div className={`px-3 py-2 rounded-lg text-xs leading-relaxed font-sans ${
                geoStatus === 'loading' ? 'bg-amber-50 text-amber-800 border border-amber-100' :
                geoStatus === 'success' ? 'bg-emerald-50 text-emerald-800 border border-emerald-100' :
                'bg-rose-50 text-rose-800 border border-rose-100'
              }`}>
                {geoStatus === 'loading' && (
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 animate-spin text-amber-500" />
                    <span>{geoMessage}</span>
                  </span>
                )}
                {geoStatus === 'success' && (
                  <span className="flex items-center gap-1.5">
                    <CheckCircle className="h-3.5 w-3.5 text-emerald-500" />
                    <span>{geoMessage}</span>
                  </span>
                )}
                {geoStatus === 'error' && (
                  <span>{geoMessage}</span>
                )}
              </div>
            )}

            {/* Indian Major Hubs Quick Selector */}
            <div className="space-y-1.5 pt-2 border-t border-slate-200/60">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Or snap to mapped Indian hubs:</span>
              <div className="flex flex-wrap gap-1.5">
                {['Mumbai', 'Bengaluru', 'Pune', 'Chennai', 'New Delhi', 'Kochi'].map((city) => (
                  <button
                    type="button"
                    key={city}
                    onClick={() => handleCitySelect(city)}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-colors ${
                      locationName.toLowerCase().startsWith(city.toLowerCase())
                        ? 'bg-blue-100 text-blue-700 border border-blue-200'
                        : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
                    }`}
                  >
                    {city}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wide">Driver Bio Information</h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Name Input */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600 flex items-center gap-1">
                  <User className="h-3.5 w-3.5 text-slate-400" />
                  <span>Full Name</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Kumar"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/15"
                />
              </div>

              {/* License Type Selector */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600 flex items-center gap-1">
                  <Shield className="h-3.5 w-3.5 text-slate-400" />
                  <span>Heavy/Light License</span>
                </label>
                <select
                  value={licenseType}
                  onChange={(e) => setLicenseType(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/15 bg-white"
                >
                  <option value="HGV Class A">HGV Class A (Multi-Axle Semi-Trucks)</option>
                  <option value="HGV Class B">HGV Class B (Medium Rigid Trucks)</option>
                  <option value="LMV Badge">LMV Badge (Light Transport Vans / Courier)</option>
                  <option value="Chauffeur Badge">Chauffeur Badge (Premium Sedans)</option>
                </select>
              </div>

              {/* Email Input */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600 flex items-center gap-1">
                  <Mail className="h-3.5 w-3.5 text-slate-400" />
                  <span>Email Address</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. driver@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/15"
                />
              </div>

              {/* Phone Input */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600 flex items-center gap-1">
                  <Phone className="h-3.5 w-3.5 text-slate-400" />
                  <span>Mobile Line</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 XXXXX XXXXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/15"
                />
              </div>
            </div>

            {/* Typed Location Target */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-600 flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5 text-slate-400" />
                <span>Base Terminal/City Location</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Mumbai, MH"
                value={locationName}
                onChange={(e) => {
                  setLocationName(e.target.value);
                  // clear custom coordinate markers on typing unless matching city string
                  const match = getCityCoordinates(e.target.value);
                  if (match) {
                    setCoords(match);
                  } else {
                    setCoords(null);
                  }
                }}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/15"
              />
              <p className="text-[10px] text-slate-400 font-sans">
                {coords 
                  ? `Mapped Coordinate Snap-in: [Lat: ${coords.lat.toFixed(4)}, Lng: ${coords.lng.toFixed(4)}]` 
                  : 'City coordinate resolution pending. Nearest sorting is active once pre-mapped cities are input.'}
              </p>
            </div>
          </div>

          {/* Action row */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
            {userProfile.isLoggedIn ? (
              <button
                type="button"
                onClick={handleLogout}
                className="px-4 py-2.5 bg-rose-50 text-rose-600 hover:bg-rose-100 font-semibold text-xs rounded-xl transition-all flex items-center gap-1.5 focus:outline-none"
              >
                <LogOut className="h-4 w-4" />
                <span>Sign Out Account</span>
              </button>
            ) : (
              <div />
            )}
            
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold text-xs rounded-xl transition-colors focus:outline-none"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-xs hover:shadow-md transition-all flex items-center gap-1.5 focus:outline-none cursor-pointer"
              >
                <LogIn className="h-4 w-4" />
                <span>Save Registry</span>
              </button>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
}
