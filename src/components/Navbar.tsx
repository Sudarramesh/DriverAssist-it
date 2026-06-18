import React, { useState } from 'react';
import { Truck, Briefcase, PlusCircle, Compass, BarChart3, Layers, User, MapPin } from 'lucide-react';
import { useAuth } from "../context/AuthContext";
import type { User as FirebaseUser } from 'firebase/auth';
import { UserProfile } from '../types';
import UserProfileModal from './UserProfileModal';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  userProfile: UserProfile;
  onUpdateProfile: (profile: UserProfile) => void;
}

export default function Navbar({ activeTab, setActiveTab, userProfile, onUpdateProfile }: NavbarProps) {
  const { user, login, logout } = useAuth() as {
    user: FirebaseUser | null;
    login: () => Promise<void>;
    logout: () => Promise<void>;
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Truck },
    { id: 'jobs', label: 'Browse Jobs', icon: Briefcase },
    { id: 'vacancies', label: 'Vacancies', icon: Layers },
    { id: 'apply-post', label: 'Apply / Post', icon: PlusCircle },
    { id: 'track', label: 'Live Tracking', icon: Compass },
    { id: 'analytics', label: 'Analytics Portal', icon: BarChart3 },
  ];

  return (
    <header id="main-header" className="sticky top-0 z-50 w-full border-b border-slate-200 bg-slate-900 text-white shadow-md">
      <div className="mx-auto flex max-w-7xl h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo and Brand */}
        <div id="brand-logo" className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('home')}>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-500/20">
            <Truck className="h-5.5 w-5.5" />
          </div>
          <div>
            <span className="font-sans text-lg font-bold tracking-tight text-white block">
              DriverAssist<span className="text-blue-500">-it</span>
            </span>
            <span className="text-[10px] font-mono tracking-wider text-slate-400 block -mt-1 uppercase">
              Pro Driver Network
            </span>
          </div>
        </div>

        {/* Navigation Links - Desktop */}
        <nav id="desktop-nav" className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-tab-${item.id}`}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center space-x-2 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all duration-250 ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/10'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon className="h-4.5 w-4.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* User login / location state indicator */}
        <div id="status-pill-container" className="flex items-center space-x-2">
          {userProfile.isLoggedIn ? (
            <button
              id="header-profile-btn"
              onClick={() => setIsModalOpen(true)}
              className="flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-slate-600 rounded-xl px-3 py-1.5 transition-all text-left focus:outline-none cursor-pointer"
            >
              <div className="h-7 w-7 rounded-lg bg-blue-600 flex items-center justify-center text-white text-xs font-bold font-mono flex-shrink-0">
                {userProfile.name.slice(0, 2).toUpperCase() || 'DR'}
              </div>
              <div className="hidden sm:block leading-none">
                <span className="text-xs font-bold text-white block truncate max-w-[120px]">{userProfile.name}</span>
                <span className="text-[10px] text-blue-400 font-mono flex items-center gap-0.5 mt-0.5">
                  <MapPin className="h-2.5 w-2.5 inline flex-shrink-0" />
                  <span className="max-w-[85px] truncate">{userProfile.locationName.split(' (')[0]}</span>
                </span>
              </div>
            </button>
          ) : (
            <button
              id="header-login-btn"
              onClick={() => setIsModalOpen(true)}
              className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1 cursor-pointer focus:outline-none"
            >
              <User className="h-3.5 w-3.5" />
              <span>Sign In / GPS</span>
            </button>
          )}

           {/* Google Authentication Button */}
           {user ? (
             <button 
               onClick={async () => {
                 try {
                   await logout();
                 } catch (e) {
                   console.error('Logout failed', e);
                 }
                 onUpdateProfile({
                   name: '',
                   email: '',
                   phone: '',
                   licenseType: 'LMV Badge',
                   locationName: 'Not Logged In',
                   coordinates: null,
                   isLoggedIn: false,
                 });
                 setIsModalOpen(false);
               }}
               className="px-3.5 py-1.5 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1 cursor-pointer focus:outline-none"
             >
               <span>Logout</span>
             </button>
           ) : (
             <button 
               onClick={async () => {
                 try {
                   await login();
                 } catch (e) {
                   console.error('Login failed', e);
                 }
                onUpdateProfile({
                  ...userProfile,
                  isLoggedIn: true,
                });
                 setIsModalOpen(true);
               }}
               className="px-3.5 py-1.5 bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1 cursor-pointer focus:outline-none"
             >
               <span>Sign in with Google</span>
             </button>
           )}
          <div className="hidden lg:flex items-center space-x-1.5 border-l border-slate-800 pl-3">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-mono text-[10px] text-slate-400">RADAR ACTIVE</span>
          </div>
        </div>

      </div>

      {/* Navigation Links - Mobile (Horizontal Scrollable Bar) */}
      <div id="mobile-nav" className="md:hidden flex items-center overflow-x-auto border-t border-slate-800 bg-slate-950 px-2 py-1.5 scrollbar-none space-x-1 justify-start">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              id={`nav-tab-mobile-${item.id}`}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-colors flex-shrink-0 ${
                isActive
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Registry / Login Location Dialog */}
      <UserProfileModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        userProfile={userProfile} 
        onUpdateProfile={onUpdateProfile} 
      />
    </header>
  );
}
