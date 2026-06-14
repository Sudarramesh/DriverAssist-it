export interface Job {
  id: string;
  title: string;
  company: string;
  logoBg: string; // Tailwind background color for dynamic logo
  logoInitials: string;
  category: 'Heavy Truck' | 'Courier Delivery' | 'Executive Chauffeur' | 'Specialized Transport';
  salary: string; // Expected salary / budget in INR
  duration: string; // e.g. "6 Months", "Permanent", "Direct Hire"
  deliveryTime: string; // e.g. "Overnight (10 PM - 6 AM)", "Flexible", "Standard Day"
  location: string;
  description: string;
  requirements: string[];
  status: 'Open' | 'Applied' | 'Delivered' | 'Active Transit';
  postedAt: string;
  companyLogoId: string; // Lucide icon name index or custom identifier
  loadImageUrl: string;  // Image illustrating the type of cargo payload
  loadWeight: string;    // Weight/Quantity payload spec (e.g. "22 Tons", "120 kg")
  companyLogoUrl?: string; // Optional external company logo asset URL
}

export interface JobApplication {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  applicantName: string;
  applicantEmail: string;
  applicantPhone: string;
  licenseType: string;
  experienceYears: number;
  message: string;
  status: 'Pending' | 'Interviewing' | 'Accepted' | 'Completed';
  appliedAt: string;
}

export interface TrackSession {
  id: string;
  jobTitle: string;
  company: string;
  driverName: string;
  driverPhone: string;
  vehicleNo: string;
  origin: string;
  destination: string;
  currentStopIndex: number;
  coordinates: { x: number; y: number }[]; // coordinates on simulated route 0-100 scale
  status: 'Departing' | 'On Road' | 'Traffic Delay' | 'Near Destination' | 'Arrived';
  etaMinutes: number;
  speedKmph: number;
  cargo: string;
}

export interface CareerAnalytics {
  totalJobsApplied: number;
  totalJobsDelivered: number;
  totalEarnings: number;
  activeApplications: number;
  rating: number;
  monthlyEarnings: { month: string; amount: number }[];
  categoryDistribution: { name: string; value: number }[];
}

export interface UserProfile {
  name: string;
  phone: string;
  email: string;
  licenseType: string;
  locationName: string;
  coordinates: { lat: number; lng: number } | null;
  isLoggedIn: boolean;
}

