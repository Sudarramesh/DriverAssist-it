import React, { useState, useEffect, useMemo } from 'react';
import { Job, UserProfile } from '../types';
import { getCityCoordinates, calculateDistance } from '../utils/geo';
import { 
  Search, 
  MapPin, 
  Clock, 
  Coins, 
  Truck, 
  ShieldCheck, 
  Sparkles, 
  Compass, 
  Briefcase, 
  ChevronRight, 
  X, 
  Check, 
  ArrowLeftRight,
  TrendingUp,
  SlidersHorizontal,
  Building,
  AlertCircle,
  Locate
} from 'lucide-react';

interface BrowseJobsProps {
  jobs: Job[];
  selectedJob: Job | null;
  onClearSelectedJob: () => void;
  onNavigateToApply: (job: Job) => void;
  userProfile: UserProfile;
  onUpdateProfile: (profile: UserProfile) => void;
}

export default function BrowseJobs({ 
  jobs, 
  selectedJob, 
  onClearSelectedJob, 
  onNavigateToApply,
  userProfile,
  onUpdateProfile
}: BrowseJobsProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [drawerJob, setDrawerJob] = useState<Job | null>(null);
  const [sortByDistance, setSortByDistance] = useState(false);


  // Synchronize initial selectedJob from home page
  useEffect(() => {
    if (selectedJob) {
      setDrawerJob(selectedJob);
    }
  }, [selectedJob]);

  // Clean category options
  const categories = ['All', 'Heavy Truck', 'Courier Delivery', 'Executive Chauffeur', 'Specialized Transport'];

  // Filter jobs based on search term & category selection
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesCategory = selectedCategory === 'All' || job.category === selectedCategory;
      const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            job.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [jobs, selectedCategory, searchTerm]);

  // Optionally sort jobs based on proximity distance (if user is logged in and coordinates are resolved)
  const sortedFilteredJobs = useMemo(() => {
    let result = [...filteredJobs];
    if (sortByDistance && userProfile.isLoggedIn && userProfile.coordinates) {
      result = result
        .map((job) => {
          const jobCoords = getCityCoordinates(job.location);
          const distance = jobCoords
            ? calculateDistance(userProfile.coordinates!, jobCoords)
            : null;
          return { ...job, distance };
        })
        .sort((a, b) => {
          if (a.distance === null) return 1;
          if (b.distance === null) return -1;
          return a.distance - b.distance;
        });
    }
    return result;
  }, [filteredJobs, sortByDistance, userProfile]);


  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Heavy Truck': return Truck;
      case 'Courier Delivery': return Compass;
      case 'Executive Chauffeur': return ShieldCheck;
      case 'Specialized Transport': return Sparkles;
      default: return Briefcase;
    }
  };

  const handleCardClick = (job: Job) => {
    setDrawerJob(job);
  };

  const closeDrawer = () => {
    setDrawerJob(null);
    onClearSelectedJob();
  };

  return (
    <div id="browse-jobs-view" className="relative flex flex-col lg:flex-row gap-8 pb-16">
      
      {/* Search & Left Side Filters */}
      <div id="filter-panel" className="w-full lg:w-1/4 space-y-6">
        <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4 shadow-xs">
          <div className="flex items-center justify-between">
            <h3 className="font-sans font-bold text-sm text-slate-800 flex items-center gap-1.5">
              <SlidersHorizontal className="h-4 w-4 text-blue-500" />
              <span>Job Filter Panel</span>
            </h3>
            { (searchTerm !== '' || selectedCategory !== 'All') && (
              <button 
                onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }}
                className="text-[11px] text-blue-600 hover:underline"
              >
                Clear all
              </button>
            )}
          </div>

          {/* Keyword Search */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Search keywords</label>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <input
                id="search-input"
                type="text"
                placeholder="Title, city, or company..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Location proximity sorting control */}
          <div className="space-y-1.5 pt-1 border-t border-slate-100/80">
            <label className="text-xs font-semibold text-slate-700 block">Location Sorting</label>
            {userProfile.isLoggedIn && userProfile.coordinates ? (
              <label className="flex items-center space-x-2.5 p-2 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-100 transition-all">
                <input
                  type="checkbox"
                  checked={sortByDistance}
                  onChange={(e) => setSortByDistance(e.target.checked)}
                  className="rounded text-blue-600 focus:ring-blue-500/10 h-4 w-4"
                />
                <span className="text-xs font-medium text-slate-700 flex items-center gap-1">
                  <Locate className="h-3.5 w-3.5 text-blue-600 animate-pulse" />
                  <span>Sort Nearest First</span>
                </span>
              </label>
            ) : (
              <div className="p-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-[11px] text-slate-500 space-y-1">
                <div className="font-semibold text-slate-600 flex items-center gap-1">
                  <span>🔒 Sort Nearest First</span>
                </div>
                <p className="leading-normal text-slate-400">
                  Please sign in or detect your GPS location in the top right to enable route proximity sorting.
                </p>
              </div>
            )}
          </div>


          {/* Category List */}
          <div className="space-y-2 pt-2">
            <label className="text-xs font-semibold text-slate-700 block">Driver categories</label>
            <div className="flex flex-wrap lg:flex-col gap-1.5">
              {categories.map((cat) => {
                const Icon = cat === 'All' ? Briefcase : getCategoryIcon(cat);
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-xl text-xs font-medium w-full text-left transition-all ${
                      isSelected 
                        ? 'bg-blue-600 text-white shadow-xs' 
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{cat}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Informative Hint */}
        <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-4 text-xs text-blue-800 space-y-2">
          <div className="flex items-center space-x-1.5 font-bold">
            <AlertCircle className="h-4 w-4 text-blue-500" />
            <span>Expected Salaries</span>
          </div>
          <p className="leading-relaxed text-blue-900/80">
            Driving rates represent true localized baseline expectations configured by employers. Highlight certifications in your application to increase bargaining room.
          </p>
        </div>
      </div>

      {/* Center Job Listings Grid */}
      <div id="job-list-container" className="flex-1 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-sans text-xl font-bold text-slate-900">
              {selectedCategory === 'All' ? 'All Live Positions' : `${selectedCategory} Postings`}
            </h2>
            <p className="text-xs text-slate-500 mt-1">Found {filteredJobs.length} driving listings</p>
          </div>
        </div>

        {filteredJobs.length === 0 ? (
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-12 text-center text-slate-500 space-y-3">
            <Briefcase className="h-10 w-10 mx-auto text-slate-400" />
            <p className="font-sans font-medium text-sm">No driver opportunities match your parameters.</p>
            <button 
              onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }}
              className="text-xs font-semibold text-blue-600 hover:underline"
            >
              Reset filters and search again
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sortedFilteredJobs.map((job) => {
              const Icon = getCategoryIcon(job.category);
              
              // Calculate driving distance if user location is available
              const cardJobCoords = getCityCoordinates(job.location);
              const distanceKm = userProfile.coordinates && cardJobCoords 
                ? calculateDistance(userProfile.coordinates, cardJobCoords) 
                : null;

              return (
                <div 
                  key={job.id}
                  id={`job-card-${job.id}`}
                  onClick={() => handleCardClick(job)}
                  className={`bg-white border rounded-2xl overflow-hidden hover:shadow-md transition-all duration-350 cursor-pointer flex flex-col justify-between relative group ${
                    drawerJob?.id === job.id ? 'border-blue-500 ring-2 ring-blue-500/10' : 'border-slate-200'
                  }`}
                >
                  {/* Cargo Load Thumbnail Banner */}
                  <div className="h-28 w-full relative bg-slate-900 overflow-hidden">
                    <img 
                      src={job.loadImageUrl || "https://picsum.photos/seed/cargo/400/200"} 
                      alt={`${job.category} Cargo`}
                      referrerPolicy="no-referrer"
                      className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent pointer-events-none" />
                    
                    <div className="absolute top-3 left-3 right-3 flex justify-between items-center z-10">
                      <span className="rounded-full bg-blue-600 hover:bg-blue-500 px-2.5 py-1 text-[9px] font-bold text-white uppercase tracking-wider">
                        {job.category}
                      </span>
                      <span className="rounded-full bg-slate-950/80 backdrop-blur-md px-2 py-0.5 text-[9px] font-mono font-bold text-emerald-400">
                        {job.loadWeight}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    {/* Title & Core Details */}
                    <div className="space-y-2">
                      <h3 className="font-sans font-bold text-base text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                        {job.title}
                      </h3>
                      <div className="flex items-center space-x-2 text-xs font-semibold text-slate-700">
                        {job.companyLogoUrl ? (
                          <div className="h-6 w-6 rounded-full overflow-hidden border border-slate-200 bg-white p-0.5 flex-shrink-0 flex items-center justify-center">
                            <img 
                              src={job.companyLogoUrl} 
                              alt={`${job.company} Logo`}
                              referrerPolicy="no-referrer"
                              className="h-full w-full object-cover rounded-full"
                            />
                          </div>
                        ) : (
                          <div className={`h-6 w-6 rounded flex items-center justify-center text-[9px] font-bold text-white ${job.logoBg}`}>
                            {job.logoInitials}
                          </div>
                        )}
                        <span>{job.company}</span>
                        <span className="text-slate-300">•</span>
                        <div className="font-normal text-slate-500 flex items-center flex-wrap gap-1">
                          <MapPin className="h-3 w-3 text-blue-500" />
                          <span>{job.location}</span>
                          {distanceKm !== null && (
                            <span className="text-[9px] font-mono font-bold bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded border border-emerald-100 flex items-center gap-0.5 ml-1">
                              <Locate className="h-2 text-emerald-600" />
                              <span>{distanceKm.toFixed(0)} km</span>
                            </span>
                          )}
                        </div>
                      </div>
                    </div>


                    {/* Pricing and duration layout */}
                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100/80 text-[11px] text-slate-500">
                      <div className="flex items-center space-x-1.5 p-1 rounded bg-slate-50">
                        <Coins className="h-3.5 w-3.5 text-emerald-500 flex-shrink-0" />
                        <span className="font-bold text-emerald-700 line-clamp-1">{job.salary}</span>
                      </div>
                      <div className="flex items-center space-x-1.5 p-1 rounded bg-slate-50">
                        <Clock className="h-3.5 w-3.5 text-blue-500 flex-shrink-0" />
                        <span className="font-medium text-slate-800 line-clamp-1">{job.duration}</span>
                      </div>
                      <div className="col-span-2 flex items-center space-x-1.5 p-1 rounded bg-slate-50">
                        <TrendingUp className="h-3.5 w-3.5 text-amber-500 flex-shrink-0" />
                        <span className="text-slate-600 line-clamp-1">{job.deliveryTime}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[10px] font-mono text-blue-600 font-bold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                        <span>View Specifications</span>
                        <ChevronRight className="h-3.5 w-3.5" />
                      </span>
                      <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-100 font-mono text-[9px] font-bold">
                        ACTIVE APPS
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Drawer Panel on Right Side (Displays Job Specifications) */}
      {drawerJob && (
        <div id="job-drawer" className="w-full lg:w-1/3 bg-white border border-blue-100 rounded-2xl shadow-xl p-6 lg:sticky lg:top-24 h-fit space-y-6">
          <div className="flex items-start justify-between pb-2">
            <div className="space-y-1">
              <span className="rounded bg-blue-50 border border-blue-100 text-blue-700 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider font-mono">
                Active Specification details
              </span>
            </div>
            <button 
              onClick={closeDrawer}
              className="p-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Cargo Load Premium Photo Header inside Drawer */}
          <div className="h-40 w-full relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-100 shadow-sm leading-none flex flex-col justify-end p-4">
            <img 
              src={drawerJob.loadImageUrl || "https://picsum.photos/seed/cargo/400/200"} 
              alt={drawerJob.title}
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent pointer-events-none" />
            
            <div className="relative z-10 space-y-1">
              <span className="inline-block rounded-md bg-blue-600 px-2.5 py-0.5 text-[9px] font-bold uppercase text-white font-mono tracking-wider mb-2">
                Cargo Payload Profile
              </span>
              <p className="text-xs font-mono font-bold text-emerald-400">
                Payload Specs: {drawerJob.loadWeight}
              </p>
            </div>
          </div>

          {/* Job details heading */}
          <div className="pb-4 border-b border-slate-150">
            <h3 className="font-sans font-bold text-lg text-slate-900 mt-1">{drawerJob.title}</h3>
            <p className="text-xs font-semibold text-slate-600 flex items-center mt-1">
              {drawerJob.companyLogoUrl ? (
                <img 
                  src={drawerJob.companyLogoUrl} 
                  alt="Company Logo"
                  className="h-4 w-4 rounded-full object-cover mr-1 border border-slate-200"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <Building className="h-3.5 w-3.5 mr-1 text-slate-400" />
              )}
              {drawerJob.company} • {drawerJob.location}
            </p>
          </div>

          <div className="space-y-4 text-sm text-slate-600 leading-relaxed font-sans">
            <div className="space-y-1">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wide">Expected Driver Package</h4>
              <div className="bg-slate-50 p-3 rounded-xl grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-slate-400 block">Contract Type</span>
                  <span className="font-semibold text-slate-800">{drawerJob.duration}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Proposed Salary</span>
                  <span className="font-bold text-emerald-600">{drawerJob.salary}</span>
                </div>
                <div className="col-span-2 pt-2 border-t border-slate-200/50">
                  <span className="text-slate-400 block">Cycle / Delivery hours</span>
                  <span className="font-semibold text-slate-800">{drawerJob.deliveryTime}</span>
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wide">Shift / Cargo Description</h4>
              <p className="text-xs text-slate-600 bg-slate-50/50 p-3 rounded-xl border border-slate-100">
                {drawerJob.description}
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wide">Mandatory driver criteria</h4>
              <ul className="space-y-2">
                {drawerJob.requirements.map((req, idx) => (
                  <li key={idx} className="flex items-start text-xs text-slate-700">
                    <Check className="h-3.5 w-3.5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <button
            id="apply-job-action"
            onClick={() => onNavigateToApply(drawerJob)}
            className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-all shadow-md shadow-blue-500/10 uppercase tracking-widest flex items-center justify-center space-x-2"
          >
            <span>Initiate Application Contract</span>
            <ArrowLeftRight className="h-4 w-4" />
          </button>
        </div>
      )}

    </div>
  );
}
