import React from 'react';
import { Job } from '../types';
import { 
  ArrowRight, 
  Clock, 
  MapPin, 
  Coins, 
  Sparkles, 
  Truck, 
  PlusCircle, 
  Search, 
  Briefcase, 
  TrendingUp, 
  Compass,
  FileText,
  ShieldCheck,
  ChevronRight,
  Locate
} from 'lucide-react';
import { motion } from 'motion/react';
import { UserProfile } from '../types';
import { getCityCoordinates, calculateDistance } from '../utils/geo';
import UserProfileModal from './UserProfileModal';

interface HomeProps {
  jobs: Job[];
  onNavigate: (tab: string) => void;
  onSelectJob: (job: Job) => void;
  userProfile: UserProfile;
  onUpdateProfile: (profile: UserProfile) => void;
}

export default function Home({ jobs, onNavigate, onSelectJob, userProfile, onUpdateProfile }: HomeProps) {
  // Local profile modal trigger state
  const [isProfileModalOpenLocal, setIsProfileModalOpenLocal] = React.useState(false);

  // Get latest 3 jobs for featured display
  const featuredJobs = jobs.slice(0, 3);

  // Filter and sort jobs based on user location coordinates matching
  const nearestJobs = React.useMemo(() => {
    if (!userProfile.isLoggedIn || !userProfile.coordinates) {
      return [];
    }
    return jobs
      .map((job) => {
        const jobCoords = getCityCoordinates(job.location);
        const distance = jobCoords
          ? calculateDistance(userProfile.coordinates!, jobCoords)
          : null;
        return { ...job, distance };
      })
      .filter((job) => job.distance !== null)
      .sort((a, b) => (a.distance || 0) - (b.distance || 0))
      .slice(0, 3);
  }, [jobs, userProfile]);



  // Category Icon helper
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Heavy Truck': return Truck;
      case 'Courier Delivery': return Compass;
      case 'Executive Chauffeur': return ShieldCheck;
      case 'Specialized Transport': return Sparkles;
      default: return Briefcase;
    }
  };

  return (
    <div id="home-view" className="space-y-12 pb-16">
      
      {/* Hero Banner Section */}
      <section id="hero-banner" className="relative rounded-3xl overflow-hidden bg-slate-950 text-white py-14 px-6 md:px-12 shadow-xl border border-slate-800">
        <div className="absolute inset-0 bg-radial-gradient from-blue-500/10 via-transparent to-transparent pointer-events-none" />
        
        <div className="relative max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 text-blue-400 text-xs font-semibold border border-blue-500/20 uppercase tracking-widest">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Connecting Drivers & Great Companies</span>
          </div>
          
          <h1 className="font-sans text-4xl md:text-5.5xl font-black tracking-tight leading-tight">
            The Smart Junction for <span className="text-blue-500 underline decoration-blue-500/30">Professional Drivers</span> & Hiring Budgets
          </h1>
          
          <p className="text-slate-300 md:text-lg max-w-2xl mx-auto font-sans font-normal leading-relaxed">
            Whether you are an operator seeking premium expected salaries or a logistic shipper posting individual job vacancies—DriverAssist-it solves your logistics matching, live tracking, and career growth in one smart dashboard.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              id="cta-browse"
              onClick={() => onNavigate('jobs')}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm transition-all shadow-md shadow-blue-500/20 hover:shadow-blue-500/30 flex items-center justify-center space-x-2"
            >
              <Search className="h-4.5 w-4.5" />
              <span>Browse Driving Jobs</span>
            </button>
            <button
              id="cta-post"
              onClick={() => onNavigate('apply-post')}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium text-sm border border-slate-700 transition-all flex items-center justify-center space-x-2"
            >
              <PlusCircle className="h-4.5 w-4.5" />
              <span>Post a Vacancy / Apply</span>
            </button>
          </div>
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto pt-12 border-t border-slate-800/80 mt-12 grid-flow-row">
          <div className="text-center p-2">
            <div className="text-2xl md:text-3xl font-black text-blue-400 font-mono">4.9/5</div>
            <div className="text-xs text-slate-400 font-sans mt-1">Excellent Driver Rating</div>
          </div>
          <div className="text-center p-2">
            <div className="text-2xl md:text-3xl font-black text-emerald-400 font-mono">₹95k+</div>
            <div className="text-xs text-slate-400 font-sans mt-1">Avg Heavy Truck Salary</div>
          </div>
          <div className="text-center p-2">
            <div className="text-2xl md:text-3xl font-black text-amber-400 font-mono">100%</div>
            <div className="text-xs text-slate-400 font-sans mt-1">Live Tracked Trips</div>
          </div>
          <div className="text-center p-2">
            <div className="text-2xl md:text-3xl font-black text-purple-400 font-mono">24 Hrs</div>
            <div className="text-xs text-slate-400 font-sans mt-1">Avg Vacancy Fill Time</div>
          </div>
        </div>
      </section>

      {/* Quick Setup Guide Section */}
      <section id="guide-section" className="space-y-6">
        <div className="text-center md:text-left">
          <h2 className="font-sans text-2xl font-bold tracking-tight text-slate-950">
            How It Works — Quick Setup Guide
          </h2>
          <p className="text-sm text-slate-500 mt-1">Get on the road or hire elite drivers in less than 5 minutes</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Guide for Drivers */}
          <div className="bg-gradient-to-br from-blue-50/50 to-blue-100/30 border border-blue-100 p-6 rounded-2xl flex flex-col justify-between">
            <div className="space-y-4">
              <div className="h-10 w-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center font-bold font-mono">
                1
              </div>
              <div>
                <h3 className="font-sans font-bold text-lg text-blue-900">For Drivers</h3>
                <p className="text-sm text-blue-700/80 mt-1">
                  Find the highest-paying routes with flexible timetables matching your exact driving classification.
                </p>
              </div>
              <ul className="text-xs text-blue-800 space-y-2 list-disc list-inside">
                <li>Search jobs by expected salary or location</li>
                <li>Simulate mock delivery to boost your credentials</li>
                <li>Apply instantly without endless forms</li>
              </ul>
            </div>
            <button 
              onClick={() => onNavigate('jobs')} 
              className="mt-6 flex items-center space-x-2 text-sm font-semibold text-blue-600 hover:text-blue-700"
            >
              <span>Explore Driver Openings</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {/* Guide for Companies/Individuals */}
          <div className="bg-gradient-to-br from-emerald-50/50 to-emerald-100/30 border border-emerald-100 p-6 rounded-2xl flex flex-col justify-between">
            <div className="space-y-4">
              <div className="h-10 w-10 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold font-mono">
                2
              </div>
              <div>
                <h3 className="font-sans font-bold text-lg text-emerald-950">For Shippers & Businesses</h3>
                <p className="text-sm text-emerald-800/80 mt-1">
                  Post your logistics requirements and specify target hourly rates or overall shipment budgets.
                </p>
              </div>
              <ul className="text-xs text-emerald-800 space-y-2 list-disc list-inside">
                <li>Create detail-rich job vacancies on the spot</li>
                <li>Reach highly rated, certified logistics drivers near you</li>
                <li>Track live dispatcher deliveries instantly via simulation</li>
              </ul>
            </div>
            <button 
              onClick={() => onNavigate('apply-post')} 
              className="mt-6 flex items-center space-x-2 text-sm font-semibold text-emerald-600 hover:text-emerald-700"
            >
              <span>Post Your First Vacancy</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Nearest Vacancies Section based on Login & Location info */}
      <section id="nearest-vacancies" className="space-y-6">
        {userProfile.isLoggedIn && userProfile.coordinates ? (
          <>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
              <div>
                <h2 className="font-sans text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
                  <Locate className="h-6 w-6 text-emerald-600 animate-pulse" />
                  <span>Vacancies Near Your Position</span>
                </h2>
                <p className="text-sm text-slate-500">
                  Cargo terminals sorted dynamically by driving proximity from <strong className="text-blue-600 font-mono">{userProfile.locationName.split(' (')[0]}</strong>
                </p>
              </div>
              <button 
                onClick={() => setIsProfileModalOpenLocal(true)}
                className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center space-x-1 border border-blue-200/60 rounded-lg px-3 py-1.5 bg-blue-50/20 hover:bg-blue-50 focus:outline-none cursor-pointer"
              >
                <span>Re-detect / Change Location</span>
              </button>
            </div>

            {nearestJobs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {nearestJobs.map((job) => {
                  const Icon = getCategoryIcon(job.category);
                  const isVeryClose = job.distance !== null && job.distance <= 120;
                  return (
                    <div 
                      key={`near-${job.id}`} 
                      className="group relative bg-white border-2 border-emerald-500/10 hover:border-emerald-500/35 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col h-full animate-in fade-in slide-in-from-bottom-3 duration-300"
                    >
                      {/* Premium Geolocation Distance strip */}
                      <div className="bg-emerald-50 border-b border-emerald-100/50 px-4 py-2.5 flex items-center justify-between text-xs text-emerald-800 font-bold">
                        <span className="flex items-center gap-1 flex-shrink-0">
                          <MapPin className="h-3.5 w-3.5 text-emerald-600" />
                          <span>{job.distance !== null ? `${job.distance.toFixed(0)} km away` : 'Calculating...'}</span>
                        </span>
                        {isVeryClose ? (
                          <span className="text-[9px] font-mono uppercase bg-emerald-600 text-white px-2 py-0.5 rounded font-black tracking-wider flex-shrink-0">
                            Urgent Local
                          </span>
                        ) : (
                          <span className="text-[9px] font-mono uppercase bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-bold flex-shrink-0">
                            Regional Corridor
                          </span>
                        )}
                      </div>

                      {/* Header block with payload and metadata */}
                      <div className="bg-slate-900 h-28 relative flex flex-col justify-end p-3 text-white leading-none">
                        <img 
                          src={job.loadImageUrl} 
                          alt="Payload preview"
                          className="absolute inset-0 w-full h-full object-cover opacity-40"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent pointer-events-none" />
                        <div className="relative z-10 space-y-1">
                          <div className="flex justify-between items-center text-[9px] font-mono font-bold tracking-wider uppercase mb-1">
                            <span className="px-2 py-0.5 bg-blue-600 text-white rounded">
                              {job.category}
                            </span>
                            <span className="text-emerald-400">
                              Load: {job.loadWeight}
                            </span>
                          </div>
                          <h4 className="font-sans font-extrabold text-sm leading-tight text-white line-clamp-1">{job.title}</h4>
                          <p className="text-[10px] text-slate-305 line-clamp-1 opacity-90">{job.company} • {job.location}</p>
                        </div>
                      </div>

                      {/* Content block */}
                      <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
                        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                          {job.description}
                        </p>

                        <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs font-sans">
                          <span className="font-mono text-emerald-600 font-extrabold">{job.salary}</span>
                          <span className="text-slate-400 font-semibold">{job.duration}</span>
                        </div>

                        <button
                          onClick={() => {
                            onSelectJob(job);
                            onNavigate('jobs');
                          }}
                          className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-xs hover:shadow-md transition-all flex items-center justify-center space-x-1 cursor-pointer focus:outline-none"
                        >
                          <span>Apply Now ({job.distance !== null ? `${job.distance.toFixed(0)}km away` : ''})</span>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8 bg-slate-50 rounded-2xl border border-slate-200">
                <p className="text-sm text-slate-500 font-sans">No vacancies pre-mapped closer than 1000 km. Displaying general vacancies below.</p>
              </div>
            )}
          </>
        ) : (
          <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 p-6 md:p-8 rounded-3xl text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl leading-none">
            <div className="absolute inset-0 bg-radial-gradient from-blue-500/5 via-transparent to-transparent pointer-events-none" />
            <div className="space-y-2 relative z-10 md:max-w-xl">
              <span className="inline-block rounded-md bg-emerald-600 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider font-mono">
                Location-Based Vacancies
              </span>
              <h3 className="font-sans font-bold text-xl leading-tight">Identify Your Base Terminal to Detect Nearest Driving Vacancies</h3>
              <p className="text-xs text-slate-405 leading-relaxed mt-1">
                Allow site Geolocation or select your primary Indian regional hub, and DriverAssist-it will automatically restructure and calculate accurate highway route distances from you to all available job openings.
              </p>
            </div>
            <button
              onClick={() => setIsProfileModalOpenLocal(true)}
              className="w-full md:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-500/25 transition-all flex items-center justify-center gap-1.5 focus:outline-none flex-shrink-0 cursor-pointer"
            >
              <Locate className="h-4 w-4 animate-bounce" />
              <span>Sign In & Detect Proximity</span>
            </button>
          </div>
        )}
      </section>

      {/* Featured Jobs Showcase */}
      <section id="featured-showcase" className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <h2 className="font-sans text-2xl font-bold tracking-tight text-slate-900">
              Featured Driver Listings
            </h2>
            <p className="text-sm text-slate-500">Latest driver vacancies with guaranteed expected pay</p>
          </div>
          <button 
            onClick={() => onNavigate('jobs')}
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center space-x-1"
          >
            <span>See more listings ({jobs.length})</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* Job Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredJobs.map((job) => {
            const Icon = getCategoryIcon(job.category);
            return (
              <div 
                key={job.id} 
                id={`featured-card-${job.id}`}
                className="group relative bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col h-full"
              >
                {/* Simulated Job Visual Overlay using cargo load image */}
                <div className="h-36 w-full relative overflow-hidden flex flex-col justify-between p-4 bg-slate-900">
                  {/* Real Cargo / Load Image background */}
                  <img 
                    src={job.loadImageUrl || "https://picsum.photos/seed/cargo/400/200"} 
                    alt={`${job.category} Cargo`}
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent pointer-events-none" />
                  
                  {/* Decorative stylized vector road line */}
                  <svg className="absolute bottom-0 left-0 w-full h-8 text-white/5" viewBox="0 0 100 20" preserveAspectRatio="none">
                    <path d="M0 15 Q25 5, 50 15 T100 15 L100 20 L0 20 Z" fill="currentColor"/>
                    <line x1="0" y1="10" x2="100" y2="10" stroke="white" strokeDasharray="3,3" strokeOpacity="0.2" />
                  </svg>

                  <div className="relative z-10 flex justify-between items-center w-full">
                    <span className="rounded-full bg-blue-600/95 backdrop-blur-md px-2.5 py-1 text-[9px] font-bold text-white uppercase tracking-wider">
                      {job.category}
                    </span>
                    <span className="rounded-full bg-slate-950/80 backdrop-blur-md px-2 py-0.5 text-[9px] font-mono font-bold text-emerald-400">
                      Load: {job.loadWeight}
                    </span>
                  </div>
                  
                  <div className="relative z-10 flex items-center space-x-2.5 text-white">
                    {/* Company Logo Image or Fallback initials */}
                    {job.companyLogoUrl ? (
                      <div className="h-10 w-10 rounded-full overflow-hidden border border-white/30 bg-white/90 p-0.5 flex-shrink-0 flex items-center justify-center">
                        <img 
                          src={job.companyLogoUrl} 
                          alt={`${job.company} Logo`}
                          referrerPolicy="no-referrer"
                          className="h-full w-full object-cover rounded-full"
                        />
                      </div>
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white font-bold font-mono text-sm flex-shrink-0">
                        {job.logoInitials}
                      </div>
                    )}
                    <div>
                      <h4 className="font-sans font-bold text-sm leading-tight text-white line-clamp-1">{job.company}</h4>
                      <p className="text-[10px] text-slate-200 opacity-90 flex items-center mt-0.5">
                        <MapPin className="h-3 w-3 mr-0.5 inline text-blue-450" /> {job.location}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-sans font-bold text-base text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                      {job.title}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {job.description}
                    </p>
                  </div>

                  {/* Indicators / Specs */}
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-[11px] text-slate-500 font-sans">
                    <div className="flex items-center space-x-1.5 p-1 rounded bg-slate-50">
                      <Coins className="h-3.5 w-3.5 text-emerald-500 flex-shrink-0" />
                      <span className="font-bold text-emerald-700 line-clamp-1">{job.salary}</span>
                    </div>
                    <div className="flex items-center space-x-1.5 p-1 rounded bg-slate-50">
                      <Clock className="h-3.5 w-3.5 text-blue-500 flex-shrink-0" />
                      <span className="font-medium text-slate-705 line-clamp-1">{job.duration}</span>
                    </div>
                    <div className="col-span-2 flex items-center space-x-1.5 p-1 rounded bg-slate-50">
                      <TrendingUp className="h-3.5 w-3.5 text-amber-500 flex-shrink-0" />
                      <span className="text-slate-600 line-clamp-1">{job.deliveryTime}</span>
                    </div>
                  </div>

                  <button
                    id={`featured-action-${job.id}`}
                    onClick={() => {
                      onSelectJob(job);
                      onNavigate('jobs');
                    }}
                    className="w-full py-2.5 rounded-xl border border-blue-100 hover:border-blue-200 bg-blue-50/50 hover:bg-blue-50 text-blue-700 font-semibold text-xs transition-all flex items-center justify-center space-x-2"
                  >
                    <span>Inspect Details & Apply</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Safety & Premium Guarantee Footer Strip */}
      <section id="safety-strip" className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="h-12 w-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div>
            <h4 className="font-sans font-bold text-sm text-slate-900">DriverAssist-it Secure Dispatch Guarantee</h4>
            <p className="text-xs text-slate-500 max-w-xl mt-0.5">
              All registered cargo operations are backed by active route monitoring, verified commercial CDL certifications, and automatic background checks.
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-[10px] font-mono text-slate-400">CDL VERIFICATION ENGINE</span>
          <span className="px-2 py-0.5 text-[9px] font-bold rounded bg-emerald-100 text-emerald-800">ONLINE</span>
        </div>
      </section>

      {/* Registry / Login Location Dialog */}
      <UserProfileModal 
        isOpen={isProfileModalOpenLocal} 
        onClose={() => setIsProfileModalOpenLocal(false)} 
        userProfile={userProfile} 
        onUpdateProfile={onUpdateProfile} 
      />

    </div>
  );
}
