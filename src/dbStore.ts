import { Job, JobApplication, TrackSession, CareerAnalytics, UserProfile } from './types';

export const INITIAL_JOBS: Job[] = [
  {
    id: 'job-1',
    title: 'Interstate Long-Haul 18-Wheeler Operator',
    company: 'Apex Freightways',
    logoBg: 'bg-emerald-600',
    logoInitials: 'AF',
    category: 'Heavy Truck',
    salary: '₹85,000 - ₹1,10,000 / Month',
    duration: 'Permanent Contract',
    deliveryTime: 'Flexible Rotational Shifts',
    location: 'Mumbai, MH to Delhi NCR',
    description: 'Seeking experienced heavy-goods vehicle (HGV) Class-A equivalent drivers for long-haul routes across the Golden Quadrilateral highway corridor. Freightliner & Tata Prima multi-axle tractors equipped with modern sleeper cabs.',
    requirements: [
      'Valid Indian HGV heavy vehicle driving license',
      'Minimum 3 years of national highway (Golden Quadrilateral) experience',
      'Clean motor vehicle record (MVR) with active transport authority clearance',
      'Ability to pass routine physical fitness and sight checkups'
    ],
    status: 'Open',
    postedAt: '2026-06-10',
    companyLogoId: 'Truck',
    loadImageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80',
    loadWeight: '22 Metric Tons (Heavy Cargo Steel)',
    companyLogoUrl: 'https://images.unsplash.com/photo-1516841273335-e39b37888115?auto=format&fit=crop&w=150&q=85'
  },
  {
    id: 'job-2',
    title: 'Medical Supply Cargo Van Courier',
    company: 'MediSpeed Express',
    logoBg: 'bg-teal-500',
    logoInitials: 'MS',
    category: 'Courier Delivery',
    salary: '₹280 - ₹350 / Hour',
    duration: 'Full-Time Position',
    deliveryTime: 'Day Shift (06:00 AM - 02:00 PM)',
    location: 'Bengaluru, KA',
    description: 'Urgent express distribution of temperature-controlled vaccines, clinical diagnostic assays, and critical care medical apparatus to regional multi-specialty hospitals and pharmacies around central Bengaluru.',
    requirements: [
      'Valid light motor vehicle (LMV) badge license',
      'Exceptional defensive driving and punctual navigation inside urban traffic',
      'Comfort with digital cargo thermal telemetry systems',
      'Capable of carrying medical cooling packs up to 15 kg'
    ],
    status: 'Open',
    postedAt: '2026-06-11',
    companyLogoId: 'ShieldAlert',
    loadImageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80',
    loadWeight: '120 kg (Thermal/Refrigerated)',
    companyLogoUrl: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=150&q=85'
  },
  {
    id: 'job-3',
    title: 'Private Executive Chauffeur (Sedan)',
    company: 'Vanguard VIP Services',
    logoBg: 'bg-slate-800',
    logoInitials: 'VV',
    category: 'Executive Chauffeur',
    salary: '₹55,000 - ₹65,000 / Month',
    duration: 'Full-Time Contract',
    deliveryTime: 'Custom (Includes evenings/weekends)',
    location: 'Mumbai Metropolitan Area',
    description: 'Deliver secure, highly comfortable point-to-point transit services for international corporate advisory delegates, directors, and guests. Driving premium electric sedans and high-end luxury vehicles.',
    requirements: [
      'At least 5 years of commercial VIP chauffeur/premium rideshare record',
      'Excellent grooming, communication skills, and absolute discretion',
      'Impeccable familiarization with Mumbai, south areas, and BKC roads',
      'Non-smoker with a fully clean traffic track-record'
    ],
    status: 'Open',
    postedAt: '2026-06-12',
    companyLogoId: 'UserCheck',
    loadImageUrl: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=600&q=80',
    loadWeight: 'VIP Guests & Business Valuables',
    companyLogoUrl: 'https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?auto=format&fit=crop&w=150&q=85'
  },
  {
    id: 'job-4',
    title: 'Hazmat Fuel Tanker Fleet Driver',
    company: 'Titan Petro-Logistics',
    logoBg: 'bg-rose-600',
    logoInitials: 'TP',
    category: 'Specialized Transport',
    salary: '₹1,20,000 - ₹1,45,000 / Month',
    duration: 'Permanent Position',
    deliveryTime: 'Night Route (08:00 PM - 05:00 AM)',
    location: 'Kochi, KL to Chennai, TN',
    description: 'Safe highway transport of liquid petroleum products and industrial fuels from refinery yards to coastal supply depots. Adherence to strict Indian Petroleum Act safety protocols.',
    requirements: [
      'Valid Indian HGV license with endorsed Hazardous Materials (Hazmat) certificate',
      '4+ years of oil or gas terminal tanker hauling experience',
      'Absolutely zero commercial safety compliance infractions on record',
      'Trained in active emergency hazard spill control operations'
    ],
    status: 'Open',
    postedAt: '2026-06-09',
    companyLogoId: 'Flame',
    loadImageUrl: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=600&q=80',
    loadWeight: '24,000 Liters (Highly Flammable Jet Fuel)',
    companyLogoUrl: 'https://images.unsplash.com/photo-1518364538800-6bcb3f25da49?auto=format&fit=crop&w=150&q=85'
  },
  {
    id: 'job-5',
    title: 'E-Commerce Last-Mile Delivery Associate',
    company: 'SwiftParcel Co.',
    logoBg: 'bg-indigo-600',
    logoInitials: 'SP',
    category: 'Courier Delivery',
    salary: '₹220 - ₹280 / Hour',
    duration: 'Part-Time / Seasonal Options',
    deliveryTime: 'Standard Day (09:00 AM - 05:00 PM)',
    location: 'New Delhi, DL',
    description: 'Responsible for delivering customer parcels and merchant orders to retail and home destinations on a localized pin-code grid. Operates automatic mini delivery vans equipped with GPS routing guides.',
    requirements: [
      'Standard LMV driving license issued at least 1 year prior',
      'High energy, physical efficiency in sorting, and customer service attitude',
      'Good smartphone navigation literacy across city address lines',
      'Age bracket above 18 years'
    ],
    status: 'Open',
    postedAt: '2026-06-12',
    companyLogoId: 'Package',
    loadImageUrl: 'https://images.unsplash.com/photo-1566576912321-d58edd7a2908?auto=format&fit=crop&w=600&q=80',
    loadWeight: '150+ Small-to-Medium Parcels',
    companyLogoUrl: 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?auto=format&fit=crop&w=150&q=85'
  }
];

export const INITIAL_TRACKING: TrackSession[] = [
  {
    id: 'track-1',
    jobTitle: 'Interstate Long-Haul 18-Wheeler Operator',
    company: 'Apex Freightways',
    driverName: 'Robert "Marcus" Vance',
    driverPhone: '+91 98765 43210',
    vehicleNo: 'MH-12-PQ-9801',
    origin: 'Mumbai Depot Hub',
    destination: 'Delhi Inland Terminal',
    currentStopIndex: 1,
    coordinates: [
      { x: 10, y: 50 },  // Mumbai
      { x: 32, y: 44 },  // Ahmedabad
      { x: 54, y: 38 },  // Jaipur
      { x: 76, y: 25 },  // Gurugram border
      { x: 90, y: 20 }   // Delhi
    ],
    status: 'On Road',
    etaMinutes: 145,
    speedKmph: 92,
    cargo: '22 Tons (Heavy Cargo Steel)'
  },
  {
    id: 'track-2',
    jobTitle: 'Medical Supply Cargo Van Courier',
    company: 'MediSpeed Express',
    driverName: 'Elena Rostova',
    driverPhone: '+91 87654 32109',
    vehicleNo: 'KA-03-MD-4022',
    origin: 'Electronic City Lab HQ',
    destination: 'Apollo Regional Hospital',
    currentStopIndex: 3,
    coordinates: [
      { x: 15, y: 80 },  // Lab HQ
      { x: 35, y: 72 },  // Silk Board Flyover
      { x: 55, y: 68 },  // Koramangala
      { x: 75, y: 55 },  // Indiranagar Perimeter Road
      { x: 92, y: 45 }   // Hospital Emergency Bay
    ],
    status: 'Near Destination',
    etaMinutes: 8,
    speedKmph: 45,
    cargo: '120 kg (Thermal/Refrigerated vaccines)'
  },
  {
    id: 'track-3',
    jobTitle: 'Private Executive Chauffeur (Sedan)',
    company: 'Vanguard VIP Services',
    driverName: 'Harish Pathak',
    driverPhone: '+91 76543 21098',
    vehicleNo: 'MH-01-VIP-9911',
    origin: 'CSM International Airport VIP T2',
    destination: 'Bandra-Kurla Complex Corporate Tower',
    currentStopIndex: 1,
    coordinates: [
      { x: 20, y: 90 }, // Airport
      { x: 40, y: 80 }, // Western Express Highway Traffic
      { x: 60, y: 50 }, // Sea Link Detour
      { x: 80, y: 35 }, // Kalanagar junction entry
      { x: 95, y: 20 }  // Corporate Portico
    ],
    status: 'Traffic Delay',
    etaMinutes: 28,
    speedKmph: 18,
    cargo: 'VVIP Executive Delegates (Luggage & Valuables)'
  }
];

export const INITIAL_ANALYTICS: CareerAnalytics = {
  totalJobsApplied: 12,
  totalJobsDelivered: 47,
  totalEarnings: 1476000,
  activeApplications: 2,
  rating: 4.92,
  monthlyEarnings: [
    { month: 'Jan', amount: 240000 },
    { month: 'Feb', amount: 265000 },
    { month: 'Mar', amount: 310000 },
    { month: 'Apr', amount: 290000 },
    { month: 'May', amount: 345000 },
    { month: 'Jun', amount: 420000 }
  ],
  categoryDistribution: [
    { name: 'Courier Delivery', value: 25 },
    { name: 'Heavy Truck', value: 15 },
    { name: 'Executive Chauffeur', value: 5 },
    { name: 'Specialized Transport', value: 2 }
  ]
};

// Storage helper functions
export function getSavedJobs(): Job[] {
  const data = localStorage.getItem('driverassist_jobs');
  
  // Self-healing migration check: clear old dollar database and reinitialize
  if (data && (data.includes('$') || !data.includes('loadImageUrl'))) {
    localStorage.removeItem('driverassist_jobs');
    localStorage.removeItem('driverassist_applications');
    localStorage.removeItem('driverassist_tracking');
    localStorage.removeItem('driverassist_analytics');
    
    localStorage.setItem('driverassist_jobs', JSON.stringify(INITIAL_JOBS));
    return INITIAL_JOBS;
  }

  if (!data) {
    localStorage.setItem('driverassist_jobs', JSON.stringify(INITIAL_JOBS));
    return INITIAL_JOBS;
  }
  return JSON.parse(data);
}

export function saveJobs(jobs: Job[]) {
  localStorage.setItem('driverassist_jobs', JSON.stringify(jobs));
}

export function getSavedApplications(): JobApplication[] {
  const data = localStorage.getItem('driverassist_applications');
  if (!data) {
    const empty: JobApplication[] = [
      {
        id: 'app-seed-1',
        jobId: 'job-5',
        jobTitle: 'E-Commerce Last-Mile Delivery Associate',
        company: 'SwiftParcel Co.',
        applicantName: 'Driver Alex G',
        applicantEmail: 'alex.driver@example.com',
        applicantPhone: '+91 91234 56789',
        licenseType: 'Class LMV (Light Cargo Van)',
        experienceYears: 3,
        message: 'Looking forward to standard delivery routes in Delhi NCR!',
        status: 'Interviewing',
        appliedAt: '2026-06-11'
      }
    ];
    localStorage.setItem('driverassist_applications', JSON.stringify(empty));
    return empty;
  }
  return JSON.parse(data);
}

export function saveApplications(apps: JobApplication[]) {
  localStorage.setItem('driverassist_applications', JSON.stringify(apps));
}

export function getSavedTracking(): TrackSession[] {
  const data = localStorage.getItem('driverassist_tracking');
  if (!data) {
    localStorage.setItem('driverassist_tracking', JSON.stringify(INITIAL_TRACKING));
    return INITIAL_TRACKING;
  }
  return JSON.parse(data);
}

export function saveTracking(tracking: TrackSession[]) {
  localStorage.setItem('driverassist_tracking', JSON.stringify(tracking));
}

export function getSavedAnalytics(): CareerAnalytics {
  const data = localStorage.getItem('driverassist_analytics');
  if (!data) {
    localStorage.setItem('driverassist_analytics', JSON.stringify(INITIAL_ANALYTICS));
    return INITIAL_ANALYTICS;
  }
  return JSON.parse(data);
}

export function saveAnalytics(analytics: CareerAnalytics) {
  localStorage.setItem('driverassist_analytics', JSON.stringify(analytics));
}

export const DEFAULT_USER_PROFILE: UserProfile = {
  name: 'Suder Ramesh',
  phone: '+91 98765 43210',
  email: 'suderramesh541@gmail.com',
  licenseType: 'HGV Class A',
  locationName: 'Mumbai, MH',
  coordinates: { lat: 19.0760, lng: 72.8777 },
  isLoggedIn: true
};

export function getSavedUserProfile(): UserProfile {
  const data = localStorage.getItem('driverassist_userprofile');
  if (!data) {
    localStorage.setItem('driverassist_userprofile', JSON.stringify(DEFAULT_USER_PROFILE));
    return DEFAULT_USER_PROFILE;
  }
  return JSON.parse(data);
}

export function saveUserProfile(profile: UserProfile) {
  localStorage.setItem('driverassist_userprofile', JSON.stringify(profile));
}

