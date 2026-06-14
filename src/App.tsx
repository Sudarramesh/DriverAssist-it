import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import BrowseJobs from './components/BrowseJobs';
import Vacancies from './components/Vacancies';
import ApplyPost from './components/ApplyPost';
import Tracking from './components/Tracking';
import Analytics from './components/Analytics';

import { Job, JobApplication, TrackSession, CareerAnalytics, UserProfile } from './types';
import { 
  getSavedJobs, 
  saveJobs, 
  getSavedApplications, 
  saveApplications, 
  getSavedTracking, 
  saveTracking, 
  getSavedAnalytics, 
  saveAnalytics,
  getSavedUserProfile,
  saveUserProfile
} from './dbStore';

import { AlertCircle, HelpCircle, Mail, Phone, ExternalLink } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');

  // Load state from local persistent dbStore safely
  const [userProfile, setUserProfile] = useState<UserProfile>(() => getSavedUserProfile());
  const [jobs, setJobs] = useState<Job[]>(() => getSavedJobs());
  const [applications, setApplications] = useState<JobApplication[]>(() => getSavedApplications());
  const [trackingSessions, setTrackingSessions] = useState<TrackSession[]>(() => getSavedTracking());
  const [analytics, setAnalytics] = useState<CareerAnalytics>(() => getSavedAnalytics());

  const handleUpdateProfile = (newProfile: UserProfile) => {
    setUserProfile(newProfile);
    saveUserProfile(newProfile);
  };


  // Helper State to store job selected from Home/Browse page
  const [preSelectedJob, setPreSelectedJob] = useState<Job | null>(null);

  // Add a newly posted Job vacancy
  const handleAddJob = (newJob: Job) => {
    const updatedJobs = [newJob, ...jobs];
    setJobs(updatedJobs);
    saveJobs(updatedJobs);
  };

  // Add a newly submitted Job Driver Application
  const handleAddApplication = (newApp: JobApplication) => {
    const updatedApps = [newApp, ...applications];
    setApplications(updatedApps);
    saveApplications(updatedApps);

    // Update Career Analytics indicators dynamically
    const updatedAnalytics: CareerAnalytics = {
      ...analytics,
      totalJobsApplied: analytics.totalJobsApplied + 1,
      activeApplications: analytics.activeApplications + 1
    };
    setAnalytics(updatedAnalytics);
    saveAnalytics(updatedAnalytics);
  };

  // Update mock active tracking telemetry updates
  const handleUpdateSession = (updatedSession: TrackSession) => {
    const updatedSessions = trackingSessions.map((session) => 
      session.id === updatedSession.id ? updatedSession : session
    );
    setTrackingSessions(updatedSessions);
    saveTracking(updatedSessions);

    // If session finished / arrived, complement analytics delivered count & earnings!
    if (updatedSession.status === 'Arrived') {
      const parentRouteJob = jobs.find(j => j.title === updatedSession.jobTitle);
      
      // Extract numeric value from salary or apply premium reward
      let earnedRef = 450;
      if (parentRouteJob) {
        const matchNum = parentRouteJob.salary.match(/\d+[\d,.]*/);
        if (matchNum) {
          const parsed = parseInt(matchNum[0].replace(/,/g, ''), 10);
          if (parsed > 0) {
            earnedRef = parsed > 1000 ? Math.round(parsed / 20) : parsed; // fractional payout for voyage step
          }
        }
      }

      const updatedAnalytics: CareerAnalytics = {
        ...analytics,
        totalJobsDelivered: analytics.totalJobsDelivered + 1,
        totalEarnings: analytics.totalEarnings + earnedRef,
        activeApplications: Math.max(0, analytics.activeApplications - 1)
      };
      setAnalytics(updatedAnalytics);
      saveAnalytics(updatedAnalytics);
    }
  };

  // Redirect from home job inspection directly to Apply tab
  const handleSelectJobFromExternal = (job: Job) => {
    setPreSelectedJob(job);
    setActiveTab('apply-post');
  };

  return (
    <div id="main-app" className="min-h-screen bg-slate-50 flex flex-col justify-between text-slate-800">
      
      {/* Prime Header Navigation Component */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        userProfile={userProfile}
        onUpdateProfile={handleUpdateProfile}
      />

      {/* Primary Main Content */}
      <main id="main-content" className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12">
        {activeTab === 'home' && (
          <Home 
            jobs={jobs} 
            onNavigate={setActiveTab} 
            onSelectJob={handleSelectJobFromExternal} 
            userProfile={userProfile}
            onUpdateProfile={handleUpdateProfile}
          />
        )}
        {activeTab === 'jobs' && (
          <BrowseJobs 
            jobs={jobs} 
            selectedJob={preSelectedJob}
            onClearSelectedJob={() => setPreSelectedJob(null)}
            onNavigateToApply={handleSelectJobFromExternal}
            userProfile={userProfile}
            onUpdateProfile={handleUpdateProfile}
          />
        )}
        {activeTab === 'vacancies' && (
          <Vacancies 
            jobs={jobs} 
            applications={applications}
            onNavigateToPost={() => {
              setActiveTab('apply-post');
            }}
          />
        )}
        {activeTab === 'apply-post' && (
          <ApplyPost 
            jobs={jobs}
            preSelectedJob={preSelectedJob}
            onClearPreSelectedJob={() => setPreSelectedJob(null)}
            onAddJob={handleAddJob}
            onAddApplication={handleAddApplication}
            userProfile={userProfile}
            onUpdateProfile={handleUpdateProfile}
          />
        )}
        {activeTab === 'track' && (
          <Tracking 
            sessions={trackingSessions}
            onUpdateSession={handleUpdateSession}
          />
        )}
        {activeTab === 'analytics' && (
          <Analytics 
            analytics={analytics} 
          />
        )}
      </main>

      {/* Styled Footer Block */}
      <footer id="app-footer" className="bg-slate-900 text-white border-t border-slate-800 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="space-y-3">
            <span className="font-sans text-base font-bold text-white">
              DriverAssist<span className="text-blue-500">-it</span>
            </span>
            <p className="text-xs text-slate-400 leading-relaxed">
              Precision driver vacancies, expected salary mapping, and live active cargo route tracking systems. Helping businesses deliver budgets successfully while building optimal operator careers.
            </p>
            <div className="text-[10px] text-slate-500 font-mono">
              VER: 1.4.2-STABLE • CLOUD INGRESS ROUTED
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-slate-300">Support Terminal</h4>
            <ul className="text-xs text-slate-400 space-y-2">
              <li className="flex items-center gap-1.5">
                <Mail className="h-3.5 w-3.5 text-blue-500" />
                <span>dispatch@driverassist-it.example.com</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Phone className="h-3.5 w-3.5 text-blue-500" />
                <span>+1 (800) 555-ROAD (7623)</span>
              </li>
              <li className="flex items-center gap-1.5">
                <HelpCircle className="h-3.5 w-3.5 text-blue-500" />
                <span>Active Driver Code of Conduct Manual</span>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-slate-300">Compliance & Regulatory</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              DriverAssist-it acts in full compliance with the Federal Highway Safety Administration (FMCSA) hours-of-service guidelines. Simulation metrics are calculated mathematically for localized dispatch optimization models.
            </p>
            <div className="flex gap-2">
              <span className="px-2.5 py-0.5 bg-slate-800 text-[9px] font-bold rounded text-slate-300 border border-slate-700 font-mono uppercase">
                FMCSA APPROVED
              </span>
              <span className="px-2.5 py-0.5 bg-slate-800 text-[9px] font-bold rounded text-slate-300 border border-slate-700 font-mono uppercase">
                CDL CLASS-A ALIGNED
              </span>
            </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500">
          <div>
            © 2026 DriverAssist-it Pro Driver Network. All rights registered globally.
          </div>
          <div className="flex space-x-4 mt-4 sm:mt-0">
            <span className="hover:text-slate-350 cursor-pointer">Licensing Agreements</span>
            <span>•</span>
            <span className="hover:text-slate-350 cursor-pointer">Dispatcher Privacy Regulations</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
