import React, { useState, useEffect } from 'react';
import { Job, JobApplication, UserProfile } from '../types';
import { 
  PlusCircle, 
  FileText, 
  CheckCircle2, 
  Coins, 
  MapPin, 
  Clock, 
  Briefcase, 
  Truck, 
  Building,
  User,
  Mail,
  Phone,
  ShieldCheck,
  Award,
  ChevronDown,
  Sparkles,
  ListPlus
} from 'lucide-react';

interface ApplyPostProps {
  jobs: Job[];
  preSelectedJob: Job | null;
  onClearPreSelectedJob: () => void;
  onAddJob: (job: Job) => void;
  onAddApplication: (app: JobApplication) => void;
  userProfile: UserProfile;
  onUpdateProfile: (profile: UserProfile) => void;
}

export default function ApplyPost({ 
  jobs, 
  preSelectedJob, 
  onClearPreSelectedJob, 
  onAddJob, 
  onAddApplication,
  userProfile,
  onUpdateProfile
}: ApplyPostProps) {
  const [activeSubTab, setActiveSubTab] = useState<'apply' | 'post'>('apply');


  // Application Form State
  const [applicantJobId, setApplicantJobId] = useState('');
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [applicantPhone, setApplicantPhone] = useState('');
  const [licenseType, setLicenseType] = useState('CDL Class A');
  const [experienceYears, setExperienceYears] = useState(2);
  const [message, setMessage] = useState('');
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);

  // Job Posting Form State
  const [postTitle, setPostTitle] = useState('');
  const [postCompany, setPostCompany] = useState('');
  const [postCategory, setPostCategory] = useState<'Heavy Truck' | 'Courier Delivery' | 'Executive Chauffeur' | 'Specialized Transport'>('Heavy Truck');
  const [postSalary, setPostSalary] = useState('');
  const [postDuration, setPostDuration] = useState('Permanent Position');
  const [postLocation, setPostLocation] = useState('');
  const [postDeliveryTime, setPostDeliveryTime] = useState('Standard Day Shift');
  const [postDescription, setPostDescription] = useState('');
  const [postReq1, setPostReq1] = useState('');
  const [postReq2, setPostReq2] = useState('');
  const [postReq3, setPostReq3] = useState('');
  const [jobPosted, setJobPosted] = useState(false);

  // Synchronize preSelectedJob if passed from search details
  useEffect(() => {
    if (preSelectedJob) {
      setApplicantJobId(preSelectedJob.id);
      setActiveSubTab('apply');
    } else if (jobs.length > 0 && !applicantJobId) {
      setApplicantJobId(jobs[0].id);
    }
  }, [preSelectedJob, jobs]);

  // Synchronize form values with logged-in user profile
  useEffect(() => {
    if (userProfile.isLoggedIn) {
      setApplicantName(userProfile.name || '');
      setApplicantEmail(userProfile.email || '');
      setApplicantPhone(userProfile.phone || '');
    }
  }, [userProfile]);

  // Handle Application Submit
  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicantJobId || !applicantName || !applicantEmail) {
      alert('Please fill out all mandatory fields.');
      return;
    }

    const selectedJobObj = jobs.find(j => j.id === applicantJobId);
    if (!selectedJobObj) return;

    const newApplication: JobApplication = {
      id: `app-${Date.now()}`,
      jobId: applicantJobId,
      jobTitle: selectedJobObj.title,
      company: selectedJobObj.company,
      applicantName,
      applicantEmail,
      applicantPhone,
      licenseType,
      experienceYears,
      message,
      status: 'Pending',
      appliedAt: new Date().toISOString().split('T')[0]
    };

    onAddApplication(newApplication);
    setApplicationSubmitted(true);

    // Reset fields
    setApplicantName('');
    setApplicantEmail('');
    setApplicantPhone('');
    setExperienceYears(2);
    setMessage('');
    onClearPreSelectedJob();
  };

  // Handle Vacancy Posting Submit
  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postTitle || !postCompany || !postSalary || !postLocation || !postDescription) {
      alert('Please fill out all mandatory parameters.');
      return;
    }

    // Dynamic coloring arrays for logoBg
    const poolBgs = ['bg-blue-600', 'bg-indigo-600', 'bg-emerald-600', 'bg-rose-600', 'bg-purple-600', 'bg-amber-600', 'bg-teal-600'];
    const randomBg = poolBgs[Math.floor(Math.random() * poolBgs.length)];

    // Initials from company name
    const initials = postCompany.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();

    // Group design requirements
    const finalRequirements = [
      postReq1 || 'Valid regional driving compliance credentials',
      postReq2 || 'Clean motor vehicle record with safety focus',
      postReq3 || 'Capable of fulfilling scheduled route hours timely'
    ];

    const categoryImages: Record<string, string> = {
      'Heavy Truck': 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80',
      'Courier Delivery': 'https://images.unsplash.com/photo-1566576912321-d58edd7a2908?auto=format&fit=crop&w=600&q=80',
      'Executive Chauffeur': 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=600&q=80',
      'Specialized Transport': 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=600&q=80'
    };

    const categoryWeights: Record<string, string> = {
      'Heavy Truck': '20 Metric Tons Heavy Cargo',
      'Courier Delivery': '75-150 Assorted Parcels',
      'Executive Chauffeur': 'Private Delegates & Valuables',
      'Specialized Transport': '24,000 Liters Fluid Payload'
    };

    const newJob: Job = {
      id: `job-${Date.now()}`,
      title: postTitle,
      company: postCompany,
      logoBg: randomBg,
      logoInitials: initials || 'CO',
      category: postCategory,
      salary: postSalary.includes('/') ? postSalary : `₹${postSalary} / Month`,
      duration: postDuration,
      deliveryTime: postDeliveryTime,
      location: postLocation,
      description: postDescription,
      requirements: finalRequirements,
      status: 'Open',
      postedAt: new Date().toISOString().split('T')[0],
      companyLogoId: 'Truck',
      loadImageUrl: categoryImages[postCategory] || categoryImages['Heavy Truck'],
      loadWeight: categoryWeights[postCategory] || categoryWeights['Heavy Truck']
    };

    onAddJob(newJob);
    setJobPosted(true);

    // Reset fields
    setPostTitle('');
    setPostCompany('');
    setPostSalary('');
    setPostLocation('');
    setPostDeliveryTime('Standard Day Shift');
    setPostDescription('');
    setPostReq1('');
    setPostReq2('');
    setPostReq3('');
  };

  return (
    <div id="apply-post-portal" className="max-w-4xl mx-auto pb-16 space-y-8">
      
      {/* Tab Header Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between border-b border-slate-200 pb-4 gap-4">
        <div>
          <h1 className="font-sans text-2xl font-black text-slate-900 flex items-center gap-2">
            <PlusCircle className="h-6 w-6 text-blue-600" />
            <span>Apply or Post Openings</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Submit credentials for a listing or file active driver requirements directly to our network index.
          </p>
        </div>

        <div className="inline-flex rounded-xl bg-slate-100 p-1 border border-slate-200 w-full sm:w-auto">
          <button
            onClick={() => { setActiveSubTab('apply'); setApplicationSubmitted(false); }}
            className={`flex-1 sm:flex-none flex items-center justify-center space-x-1.5 px-5 py-2.5 text-xs font-semibold rounded-lg transition-all ${
              activeSubTab === 'apply'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <FileText className="h-4 w-4" />
            <span>Driver Application Form</span>
          </button>
          <button
            onClick={() => { setActiveSubTab('post'); setJobPosted(false); }}
            className={`flex-1 sm:flex-none flex items-center justify-center space-x-1.5 px-5 py-2.5 text-xs font-semibold rounded-lg transition-all ${
              activeSubTab === 'post'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <PlusCircle className="h-4 w-4" />
            <span>Post a Driver Vacancy</span>
          </button>
        </div>
      </div>

      {activeSubTab === 'apply' ? (
        /* DRIVER APPLICATION FORM */
        <div id="application-form-panel">
          {applicationSubmitted ? (
            <div className="text-center bg-white border border-slate-200 rounded-3xl p-12 shadow-md max-w-xl mx-auto space-y-6">
              <div className="mx-auto h-16 w-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <CheckCircle2 className="h-10 w-10" />
              </div>
              <div className="space-y-2">
                <h2 className="font-sans text-xl font-bold text-slate-900">Application Lodged Successfully!</h2>
                <p className="text-sm text-slate-500 max-w-sm mx-auto leading-relaxed">
                  Your certified CDL driver passport and message have been locked into the company dispatcher console. Under real operations, expect contact within 2 hours.
                </p>
              </div>
              
              <div className="bg-slate-50 p-4 rounded-xl text-left text-xs text-slate-600 space-y-1 inline-block w-full">
                <div className="font-semibold text-slate-800">Review status:</div>
                <div>Status: <span className="text-blue-600 font-bold">Awaiting Dispatch Review</span></div>
                <div>Queue position: <span className="font-mono text-slate-950 font-semibold">#2 in Queue</span></div>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => setApplicationSubmitted(false)}
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-all"
                >
                  Apply for Another Position
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleApplySubmit} className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-xs space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <h3 className="font-sans font-bold text-base text-slate-900 flex items-center gap-1.5">
                  <Award className="h-5 w-5 text-blue-500" />
                  <span>Logistics Application Contract</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">Submit your formal credentials directly to logistics dispatch coordinators</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Select Job Position */}
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                    <span>Target Driver Opening</span>
                    <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Briefcase className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                    <select
                      id="job-select"
                      value={applicantJobId}
                      onChange={(e) => setApplicantJobId(e.target.value)}
                      className="w-full pl-10 pr-10 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 bg-white cursor-pointer appearance-none"
                    >
                      {jobs.map((job) => (
                        <option key={job.id} value={job.id}>
                          {job.title} — ({job.company}, {job.location}) — {job.salary}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3.5 top-3.5 h-4 w-4 text-slate-400 pointer-events-none" />
                  </div>
                </div>

                {/* Full name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                    <User className="h-3.5 w-3.5" />
                    <span>Full Legal Name</span>
                    <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="applicant-name"
                    type="text"
                    required
                    placeholder="Enter full name"
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                {/* Email address */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                    <Mail className="h-3.5 w-3.5" />
                    <span>Email Address</span>
                    <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="applicant-email"
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={applicantEmail}
                    onChange={(e) => setApplicantEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                {/* Telephone */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                    <Phone className="h-3.5 w-3.5" />
                    <span>Telephone / Cell Contact</span>
                  </label>
                  <input
                    id="applicant-phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={applicantPhone}
                    onChange={(e) => setApplicantPhone(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                {/* License class selection */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    <span>Active License Classification</span>
                  </label>
                  <select
                    id="license-select"
                    value={licenseType}
                    onChange={(e) => setLicenseType(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 bg-white"
                  >
                    <option value="HGV Class A">HGV Class A (Multi-Axle Semi-Trucks)</option>
                    <option value="HGV Class B">HGV Class B (Medium Rigid Trucks / Buses)</option>
                    <option value="LMV Badge">LMV Badge (Light Transport Vans / Courier)</option>
                    <option value="Specialized Endorsed">Specialized Hazmat/Tanker License</option>
                  </select>
                </div>

                {/* Years Experience counter */}
                <div className="space-y-1.5 md:col-span-2">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-slate-700">Commercial Driving Experience</label>
                    <span className="font-mono text-xs font-bold rounded bg-blue-50 text-blue-700 px-2.5 py-0.5 border border-blue-100">
                      {experienceYears} Years
                    </span>
                  </div>
                  <input
                    id="experience-range"
                    type="range"
                    min="0"
                    max="20"
                    value={experienceYears}
                    onChange={(e) => setExperienceYears(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                </div>

                {/* Motivation message pitch */}
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-xs font-bold text-slate-700 block">Personal driving qualifications / pitches (Optional)</label>
                  <textarea
                    id="applicant-msg"
                    rows={4}
                    placeholder="Detail any endorsements (TANKER, passenger), safe mileage accolades, refrigerated cargo expertise, or specialized highway records..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 font-sans"
                  />
                </div>

              </div>

              {/* Action buttons */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setApplicantName('');
                    setApplicantEmail('');
                    setApplicantPhone('');
                    setMessage('');
                  }}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-bold transition-all"
                >
                  Clear Fields
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-blue-500/10"
                >
                  Submit Dispatch Application
                </button>
              </div>
            </form>
          )}
        </div>
      ) : (
        /* EMPLOYER POST A VACANCY FORM */
        <div id="vacancy-post-form">
          {jobPosted ? (
            <div className="text-center bg-white border border-slate-200 rounded-3xl p-12 shadow-md max-w-xl mx-auto space-y-6">
              <div className="mx-auto h-16 w-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <CheckCircle2 className="h-10 w-10" />
              </div>
              <div className="space-y-2">
                <h2 className="font-sans text-xl font-bold text-slate-900">Job Vacancy Advertised!</h2>
                <p className="text-sm text-slate-500 max-w-sm mx-auto leading-relaxed">
                  Your driver requirements and maximum budget allocation have been integrated into the central job directory. Driver networks are querying matching lists right now.
                </p>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl text-left text-xs text-slate-600 space-y-1 inline-block w-full">
                <div className="font-semibold text-slate-800">Live Status:</div>
                <div>Visibility: <span className="text-emerald-600 font-bold">Public & Discoverable</span></div>
                <div>Algorithmic Rank: <span className="font-semibold text-blue-600">High match priorities</span></div>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => setJobPosted(false)}
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-all"
                >
                  Create Another Vacancy
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handlePostSubmit} className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-xs space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <h3 className="font-sans font-bold text-base text-slate-900 flex items-center gap-1.5">
                  <ListPlus className="h-5 w-5 text-blue-500" />
                  <span>Configure Driver Vacancy Parameters</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">Define your parameters to attract fast, cost-friendly premium drivers</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Job Title */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                    <span>Job Title / Vacancy Target</span>
                    <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="post-title"
                    type="text"
                    required
                    placeholder="e.g. Local Heavy Cargo Hauler"
                    value={postTitle}
                    onChange={(e) => setPostTitle(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                {/* Company Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                    <Building className="h-3.5 w-3.5" />
                    <span>Company or Shipper Name</span>
                    <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="post-company"
                    type="text"
                    required
                    placeholder="e.g. SwiftTrans Solutions"
                    value={postCompany}
                    onChange={(e) => setPostCompany(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                {/* Category Type */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                    <Truck className="h-3.5 w-3.5" />
                    <span>Driver Classification</span>
                  </label>
                  <select
                    id="post-category"
                    value={postCategory}
                    onChange={(e) => setPostCategory(e.target.value as any)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 bg-white"
                  >
                    <option value="Heavy Truck">Heavy Truck (Long haul, CDL-A)</option>
                    <option value="Courier Delivery">Courier Delivery (Van, Box trucks)</option>
                    <option value="Executive Chauffeur">Executive Chauffeur (Sedan, Luxury VIP)</option>
                    <option value="Specialized Transport">Specialized Transport (Hazmat, Heavy Equipment)</option>
                  </select>
                </div>

                {/* Expected Salary / Budget */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                    <Coins className="h-3.5 w-3.5 animate-pulse text-emerald-500" />
                    <span>Proposed Salary / Budget</span>
                    <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="post-salary"
                    type="text"
                    required
                    placeholder="e.g. ₹65,000 / Month or ₹350 / Hour"
                    value={postSalary}
                    onChange={(e) => setPostSalary(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                {/* Duration */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    <span>Contract Style / Duration</span>
                  </label>
                  <input
                    id="post-duration"
                    type="text"
                    placeholder="e.g. Permanent Contract, 6-Month Project"
                    value={postDuration}
                    onChange={(e) => setPostDuration(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                {/* Location */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" />
                    <span>Target Route / Operating City</span>
                    <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="post-location"
                    type="text"
                    required
                    placeholder="e.g. Mumbai, MH to Bengaluru, KA"
                    value={postLocation}
                    onChange={(e) => setPostLocation(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                {/* Shift hours details */}
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-xs font-bold text-slate-700 block">Timetable Shift / Cycle Hours</label>
                  <input
                    id="post-delivery-time"
                    type="text"
                    placeholder="e.g. Flexible Day (08:00 AM - 05:00 PM)"
                    value={postDeliveryTime}
                    onChange={(e) => setPostDeliveryTime(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                {/* Description */}
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-xs font-bold text-slate-700 block font-sans">Full Job & Cargo Scope description</label>
                  <textarea
                    id="post-desc"
                    rows={4}
                    required
                    placeholder="Describe cargo properties, truck specs (automatic/manual transmission), routes, overnight layover structures, fuel support, etc..."
                    value={postDescription}
                    onChange={(e) => setPostDescription(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 font-sans"
                  />
                </div>

                {/* Driver Requirement items */}
                <div className="space-y-3 md:col-span-2 pt-2">
                  <label className="text-xs font-bold text-slate-700 block uppercase tracking-wider text-slate-400">Driver Compliance Requirements List</label>
                  <div className="space-y-2">
                    <input
                      id="post-req-1"
                      type="text"
                      placeholder="e.g. Driver requirement 1 (e.g. Valid CDL Class A license)"
                      value={postReq1}
                      onChange={(e) => setPostReq1(e.target.value)}
                      className="w-full px-4 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    <input
                      id="post-req-2"
                      type="text"
                      placeholder="e.g. Driver requirement 2 (e.g. At least 2 years commercial logging)"
                      value={postReq2}
                      onChange={(e) => setPostReq2(e.target.value)}
                      className="w-full px-4 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    <input
                      id="post-req-3"
                      type="text"
                      placeholder="e.g. Driver requirement 3 (e.g. Zero DUI alerts on MVR file)"
                      value={postReq3}
                      onChange={(e) => setPostReq3(e.target.value)}
                      className="w-full px-4 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>

              </div>

              {/* Submit panel */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setPostTitle('');
                    setPostCompany('');
                    setPostSalary('');
                    setPostLocation('');
                    setPostDescription('');
                  }}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-bold transition-all"
                >
                  Reset Form
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-blue-500/10 flex items-center space-x-1"
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Lock In Vacancy Ad</span>
                </button>
              </div>
            </form>
          )}
        </div>
      )}

    </div>
  );
}
