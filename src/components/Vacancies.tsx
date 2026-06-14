import React, { useState } from 'react';
import { Job, JobApplication } from '../types';
import { 
  Layers, 
  Users, 
  Coins, 
  CheckCircle2, 
  Building, 
  MapPin, 
  ShieldCheck, 
  Clock, 
  UserPlus, 
  Activity, 
  FileText, 
  Star,
  Search,
  SlidersHorizontal,
  Mail,
  Phone
} from 'lucide-react';

interface VacanciesProps {
  jobs: Job[];
  applications: JobApplication[];
  onNavigateToPost: () => void;
}

interface availableDriver {
  id: string;
  name: string;
  rating: number;
  experienceYears: number;
  expectedRate: string;
  rateNum: number;
  vehicleExpertise: string;
  licenseClass: string;
  location: string;
  completedJobsCount: number;
  bio: string;
  contactEmail: string;
  contactPhone: string;
}

const AVAILABLE_DRIVERS_POOL: availableDriver[] = [
  {
    id: 'drv-1',
    name: 'Jameson "Big J" Carter',
    rating: 4.95,
    experienceYears: 8,
    expectedRate: '₹380 / Hr',
    rateNum: 380,
    vehicleExpertise: '18-Wheeler, Heavy Semi-Trucks',
    licenseClass: 'HGV Class A (National Hazmat Endorsement)',
    location: 'Mumbai, MH',
    completedJobsCount: 142,
    bio: 'Punctual long-haul veteran with accident-free transport record across the Golden Quadrilateral corridor. Available immediately for dedicated operations.',
    contactEmail: 'jameson.carter@example.com',
    contactPhone: '+91 98765 43210'
  },
  {
    id: 'drv-2',
    name: 'Miriam Al-Sudani',
    rating: 4.88,
    experienceYears: 4,
    expectedRate: '₹220 / Hr',
    rateNum: 220,
    vehicleExpertise: 'Cargo Sprinter Vans, Step Trucks',
    licenseClass: 'LMV Badge (Light Cargo Fleet)',
    location: 'Bengaluru, KA',
    completedJobsCount: 89,
    bio: 'Local routing expert specialized in medical vaccine temperature-sensitive cargo and last-mile grids. Fast, safe, and highly courteous.',
    contactEmail: 'miriam.alsudani@example.com',
    contactPhone: '+91 87654 32109'
  },
  {
    id: 'drv-3',
    name: 'Kenji Suzuki',
    rating: 5.0,
    experienceYears: 12,
    expectedRate: '₹350 / Hr',
    rateNum: 350,
    vehicleExpertise: 'Premium Electric Luxury Sedans, VIP Coaches',
    licenseClass: 'Chauffeur Badge (Luxury Sedan/VIP Coach)',
    location: 'Pune, MH',
    completedJobsCount: 215,
    bio: 'Elite transportation provider for executive circles, corporate board members, and high-profile visitors. Absolute discretion, impeccable vehicle care.',
    contactEmail: 'kenji.suzuki@example.com',
    contactPhone: '+91 76543 21098'
  },
  {
    id: 'drv-4',
    name: 'Marcus Vance',
    rating: 4.79,
    experienceYears: 5,
    expectedRate: '₹240 / Hr',
    rateNum: 240,
    vehicleExpertise: 'Boxtrucks, Refrigerated Flatbeds',
    licenseClass: 'HGV Commercial License',
    location: 'Chennai, TN',
    completedJobsCount: 64,
    bio: 'Dependable and friendly freight professional. Specialized in grocery warehouse distribution chains. Excellent backing skills.',
    contactEmail: 'marcus.vance@example.com',
    contactPhone: '+91 91234 56789'
  },
  {
    id: 'drv-5',
    name: 'Alicia "Lish" Dubois',
    rating: 4.92,
    experienceYears: 6,
    expectedRate: '₹380 / Hr',
    rateNum: 380,
    vehicleExpertise: 'Water Tankers, Specialized Hazmat Fleets',
    licenseClass: 'Hazmat-Endorsed HGV Heavy License',
    location: 'Kochi, KL',
    completedJobsCount: 112,
    bio: 'Safe tank-trailer hauling with focus on liquids or chemical compounds. Always adheres to petroleum safety checklists and strict transport guidelines.',
    contactEmail: 'alicia.dubois@example.com',
    contactPhone: '+91 82345 67890'
  }
];

export default function Vacancies({ jobs, applications, onNavigateToPost }: VacanciesProps) {
  const [activeSubTab, setActiveSubTab] = useState<'drivers' | 'posted-vacancies'>('drivers');
  const [budgetFilter, setBudgetFilter] = useState<number>(400);
  const [driverSearch, setDriverSearch] = useState<string>('');
  const [hiredDriver, setHiredDriver] = useState<string | null>(null);

  // Filter drivers based on maximum budget filter and search term
  const filteredDrivers = AVAILABLE_DRIVERS_POOL.filter((driver) => {
    const matchesBudget = driver.rateNum <= budgetFilter;
    const matchesSearch = driver.name.toLowerCase().includes(driverSearch.toLowerCase()) ||
                          driver.vehicleExpertise.toLowerCase().includes(driverSearch.toLowerCase()) ||
                          driver.location.toLowerCase().includes(driverSearch.toLowerCase()) ||
                          driver.licenseClass.toLowerCase().includes(driverSearch.toLowerCase());
    return matchesBudget && matchesSearch;
  });

  // Calculate stats for posted vacancies
  const vacancyJobs = jobs; // All active listings represented as vacancy postings

  return (
    <div id="vacancies-hub" className="space-y-8 pb-16">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="font-sans text-2xl font-black text-slate-950 flex items-center gap-2">
            <Layers className="h-6 w-6 text-blue-600" />
            <span>Driver Vacancy & Budget Hub</span>
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Browse ready-for-hire driver profiles with custom budget caps, or check active vacancy details.
          </p>
        </div>

        {/* Tab switchers */}
        <div className="inline-flex rounded-xl bg-slate-100 p-1 border border-slate-200">
          <button
            onClick={() => setActiveSubTab('drivers')}
            className={`flex items-center space-x-1.5 px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
              activeSubTab === 'drivers'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Users className="h-4 w-4" />
            <span>Budget-Friendly Drivers ({filteredDrivers.length})</span>
          </button>
          <button
            onClick={() => setActiveSubTab('posted-vacancies')}
            className={`flex items-center space-x-1.5 px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
              activeSubTab === 'posted-vacancies'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Building className="h-4 w-4" />
            <span>Company Vacancies ({vacancyJobs.length})</span>
          </button>
        </div>
      </div>

      {activeSubTab === 'drivers' ? (
        /* DRIVERS REGISTRY LAYOUT */
        <div id="driver-registry" className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Budget Filter Sidebar */}
          <div id="budget-side" className="lg:col-span-1 space-y-6 bg-white border border-slate-200 p-5 rounded-2xl h-fit shadow-xs">
            <div className="space-y-4">
              <div className="flex items-center space-x-2 font-bold text-slate-800 text-sm">
                <SlidersHorizontal className="h-4 w-4 text-emerald-500" />
                <span>Budget Configuration</span>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold text-slate-700">
                  <span>Max Budget / Hr</span>
                  <span className="font-mono text-emerald-600 font-bold">₹{budgetFilter}/Hr</span>
                </div>
                <input
                  id="budget-range"
                  type="range"
                  min="150"
                  max="500"
                  step="10"
                  value={budgetFilter}
                  onChange={(e) => setBudgetFilter(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>₹150/Hr</span>
                  <span>₹320/Hr</span>
                  <span>₹500/Hr</span>
                </div>
              </div>

              {/* Driver search input */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Driver skills or license</label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-3.5 w-3.5 text-slate-400" />
                  <input
                    id="driver-search-input"
                    type="text"
                    placeholder="Search heavy, HAZMAT..."
                    value={driverSearch}
                    onChange={(e) => setDriverSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
              </div>
            </div>

            <div className="bg-emerald-50/50 border border-emerald-100 rounded-xl p-4 text-xs space-y-2 text-emerald-800">
              <div className="flex items-center space-x-1 font-bold">
                <Coins className="h-3.5 w-3.5 text-emerald-600" />
                <span>Cost Saving tip</span>
              </div>
              <p className="leading-relaxed">
                Check drivers with light LMV Badge certification or local van delivery preferences. They often present high reliability for city courier needs at mid-to-lower budget ranks (₹200-₹300/hr).
              </p>
            </div>
          </div>

          {/* Core Drivers Grid */}
          <div id="driver-grid" className="lg:col-span-3 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredDrivers.map((driver) => (
                <div 
                  key={driver.id}
                  id={`driver-card-${driver.id}`}
                  className="bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    {/* Header: Name, Rating, Budget */}
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-sans font-bold text-base text-slate-900">{driver.name}</h3>
                        <p className="text-[11px] text-slate-500 flex items-center mt-1 font-sans">
                          <MapPin className="h-3.5 w-3.5 mr-1 text-slate-400" />
                          {driver.location} • {driver.experienceYears} Years Exp
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="inline-block rounded-xl bg-emerald-50 text-emerald-700 px-3 py-1 text-xs font-black font-sans border border-emerald-100">
                          {driver.expectedRate}
                        </span>
                        <div className="flex items-center justify-end text-xs text-amber-500 font-bold mt-1.5 space-x-0.5">
                          <Star className="h-3.5 w-3.5 fill-amber-500" />
                          <span className="font-mono text-slate-800">{driver.rating.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Tag highlights */}
                    <div className="flex flex-wrap gap-1.5">
                      <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-100 text-[10px] font-medium uppercase font-sans">
                        {driver.licenseClass}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200 text-[10px] font-medium font-sans">
                        {driver.vehicleExpertise}
                      </span>
                    </div>

                    {/* Bio text */}
                    <p className="text-xs text-slate-600 leading-relaxed font-sans mt-2 italic bg-slate-50 p-3 rounded-xl border border-slate-100">
                      "{driver.bio}"
                    </p>
                  </div>

                  {/* Hire Actions & Contacts */}
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 block font-mono">DELIVERED TOURS</span>
                      <span className="text-xs font-bold text-slate-800 font-mono">{driver.completedJobsCount} Journeys</span>
                    </div>

                    {hiredDriver === driver.id ? (
                      <div className="text-right space-y-1">
                        <span className="inline-flex items-center space-x-1 text-xs text-emerald-600 font-bold">
                          <CheckCircle2 className="h-4 w-4" />
                          <span>Hired Successfully!</span>
                        </span>
                        <div className="text-[10px] text-slate-500 font-mono">
                          <div>{driver.contactEmail}</div>
                          <div>{driver.contactPhone}</div>
                        </div>
                      </div>
                    ) : (
                      <button
                        id={`hire-btn-${driver.id}`}
                        onClick={() => {
                          setHiredDriver(driver.id);
                          // increment total jobs delivered in general config for visual consistency
                          setTimeout(() => {setHiredDriver(null)}, 8000);
                        }}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-all shadow-sm hover:shadow flex items-center space-x-1"
                      >
                        <UserPlus className="h-3.5 w-3.5" />
                        <span>Hire Driver</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      ) : (
        /* POSTED COMPANY VACANCIES LAYOUT */
        <div id="company-vacancies" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-sans font-bold text-base text-slate-900">Your Active Job Vacancies</h3>
            <button
              onClick={onNavigateToPost}
              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold transition-all flex items-center space-x-1"
            >
              <UserPlus className="h-3.5 w-3.5" />
              <span>Post New Vacancy</span>
            </button>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm text-slate-600">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold text-xs uppercase tracking-wider font-sans">
                    <th className="p-4">Vacancy Details</th>
                    <th className="p-4">Cargo / Route Category</th>
                    <th className="p-4">Expected Salary Rate</th>
                    <th className="p-4">Timetable / Shift</th>
                    <th className="p-4">Staffing status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-sans">
                  {vacancyJobs.map((job) => {
                    const applicantsCount = applications.filter(a => a.jobId === job.id).length;
                    return (
                      <tr key={job.id} id={`row-${job.id}`} className="hover:bg-slate-50/50 transition-colors">
                        <td className="p-4 space-y-1">
                          <div className="font-bold text-slate-950">{job.title}</div>
                          <div className="text-xs text-slate-500 flex items-center">
                            <Building className="h-3.5 w-3.5 mr-1 text-slate-300" />
                            {job.company} • <MapPin className="h-3.5 w-3.5 mx-0.5 text-slate-300" /> {job.location}
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="inline-block px-2.5 py-1 text-[10px] font-bold rounded-full bg-slate-100 border border-slate-200 text-slate-700 uppercase">
                            {job.category}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="font-black text-emerald-600">{job.salary}</div>
                          <div className="text-[10px] text-slate-400 font-mono">{job.duration}</div>
                        </td>
                        <td className="p-4">
                          <div className="text-xs font-semibold text-slate-800 flex items-center">
                            <Clock className="h-3.5 w-3.5 mr-1 text-slate-400" />
                            {job.deliveryTime}
                          </div>
                        </td>
                        <td className="p-4 space-y-1">
                          <span className="inline-flex items-center space-x-1.5 px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-100">
                            <Activity className="h-3 w-3" />
                            <span>Staffing Active ({applicantsCount + 2} applied)</span>
                          </span>
                          <div className="text-[10px] text-slate-400 block font-mono">ID: {job.id.toUpperCase()}</div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
