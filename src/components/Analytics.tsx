import React, { useState } from 'react';
import { CareerAnalytics } from '../types';
import { 
  BarChart3, 
  TrendingUp, 
  Coins, 
  CheckCircle2, 
  Award, 
  Star, 
  Sparkles, 
  ShieldCheck, 
  Activity, 
  Briefcase,
  AlertCircle
} from 'lucide-react';

interface AnalyticsProps {
  analytics: CareerAnalytics;
}

export default function Analytics({ analytics }: AnalyticsProps) {
  const [hoveredMonth, setHoveredMonth] = useState<string | null>(null);

  // Derive achievements dynamically
  const totalDeliveries = analytics.totalJobsDelivered;
  const ratingValue = analytics.rating;

  const ACHIEVEMENTS = [
    {
      id: 'badge-1',
      title: 'Transcontinental Marshal',
      description: 'Awarded for over 30 successful long-haul interstate deliveries with complete schedule adherence.',
      unlocked: totalDeliveries >= 30,
      icon: Award,
      badgeColor: 'bg-blue-105 border-blue-200 text-blue-700'
    },
    {
      id: 'badge-2',
      title: 'Five-Star Fleet Pioneer',
      description: 'Maintain a customer defensive driving feedback registry rating above 4.85 stars.',
      unlocked: ratingValue >= 4.85,
      icon: Star,
      badgeColor: 'bg-amber-100 border-amber-200 text-amber-700'
    },
    {
      id: 'badge-3',
      title: 'Hazmat Safe-Keeper',
      description: 'Completed dedicated hazardous chemical or tanker routes with flawless, spill-free logs.',
      unlocked: totalDeliveries >= 10,
      icon: ShieldCheck,
      badgeColor: 'bg-emerald-100 border-emerald-200 text-emerald-700'
    }
  ];

  // SVG Chart Dimensions
  const chartHeight = 180;
  const chartWidth = 500;
  const maxAmount = Math.max(...analytics.monthlyEarnings.map(m => m.amount));

  return (
    <div id="analytics-portal" className="space-y-8 pb-16">
      
      {/* Page Header */}
      <div>
        <h1 className="font-sans text-2xl font-black text-slate-950 flex items-center gap-2">
          <BarChart3 className="h-6 w-6 text-blue-600" />
          <span>Your Professional Driver Analytics</span>
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Review career milestones, successful logistics deliverables, monthly financial records, and competency credentials.
        </p>
      </div>

      {/* Core Career Indicators (Grid) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Total Deliveries */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 md:p-5 shadow-xs text-center space-y-1">
          <div className="mx-auto h-9 w-9 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
            <CheckCircle2 className="h-5 w-5" />
          </div>
          <span className="text-[10px] text-slate-400 font-mono block">DELIVERY VOYAGES</span>
          <div className="text-2xl font-black text-slate-900 font-mono">{analytics.totalJobsDelivered}</div>
          <span className="text-[10px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full font-bold">
            100% SUCCESSFUL
          </span>
        </div>

        {/* Total Earnings */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 md:p-5 shadow-xs text-center space-y-1">
          <div className="mx-auto h-9 w-9 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Coins className="h-5 w-5" />
          </div>
          <span className="text-[10px] text-slate-400 font-mono block">CUMULATIVE EARNINGS</span>
          <div className="text-2xl font-black text-emerald-600 font-mono">₹{analytics.totalEarnings.toLocaleString('en-IN')}</div>
          <span className="text-[10px] text-slate-500 font-sans block">Net Driving Pays</span>
        </div>

        {/* Applied Count */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 md:p-5 shadow-xs text-center space-y-1">
          <div className="mx-auto h-9 w-9 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center">
            <Briefcase className="h-5 w-5" />
          </div>
          <span className="text-[10px] text-slate-400 font-mono block">LOGGED INQUIRIES</span>
          <div className="text-2xl font-black text-slate-900 font-mono">{analytics.totalJobsApplied}</div>
          <span className="text-[10px] text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full font-bold">
            {analytics.activeApplications} ACTIVE APPS
          </span>
        </div>

        {/* Customer Rating */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 md:p-5 shadow-xs text-center space-y-1">
          <div className="mx-auto h-9 w-9 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center">
            <Star className="h-5 w-5 fill-amber-500 text-amber-500" />
          </div>
          <span className="text-[10px] text-slate-400 font-mono block">MEDIAN ROAD RATING</span>
          <div className="text-2xl font-black text-slate-900 font-mono">{analytics.rating.toFixed(2)}</div>
          <span className="text-[10px] text-amber-650 bg-amber-50 px-2 py-0.5 rounded-full font-bold">
            ELITE DESCENT
          </span>
        </div>
      </div>

      {/* Analytics Charts split layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Financial Earnings: Custom Robust SVG Bar Chart */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-sans font-bold text-base text-slate-900 flex items-center gap-1.5">
                <TrendingUp className="h-5 w-5 text-emerald-500" />
                <span>Monthly Driving Earnings Record</span>
              </h3>
              <p className="text-[11px] text-slate-500">Analysis of localized expected contract payout schedules</p>
            </div>
            
            <div className="text-right">
              <span className="text-[10px] text-slate-400 block font-mono">FINANCIAL STATS</span>
              <span className="text-xs font-bold text-emerald-600 uppercase">+15.4% GROWTH</span>
            </div>
          </div>

          {/* Interactive SVG bar chart */}
          <div className="relative w-full overflow-x-auto select-none pt-4">
            <svg className="w-full min-w-[420px] h-48" viewBox={`0 0 ${chartWidth} ${chartHeight}`}>
              {/* Baseline axis */}
              <line x1="40" y1="140" x2="480" y2="140" stroke="#cbd5e1" strokeWidth="1" />
              
              {/* Y-Axis dashed gridlines */}
              <line x1="40" y1="40" x2="480" y2="40" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4,4" />
              <line x1="40" y1="90" x2="480" y2="90" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4,4" />
              
              {/* Value indicators */}
              <text x="35" y="44" fill="#94a3b8" fontSize="10" textAnchor="end" fontFamily="monospace">₹4.5L</text>
              <text x="35" y="94" fill="#94a3b8" fontSize="10" textAnchor="end" fontFamily="monospace">₹2.2L</text>
              <text x="35" y="144" fill="#94a3b8" fontSize="10" textAnchor="end" fontFamily="monospace">₹0</text>

              {/* Draw Monthly bars */}
              {analytics.monthlyEarnings.map((data, index) => {
                const barWidth = 35;
                const spacing = 70;
                const x = 70 + index * spacing;
                
                // Scale bar height to maxAmount representing chartHeight limit
                const barHeight = (data.amount / maxAmount) * 100;
                const y = 140 - barHeight;

                const isHovered = hoveredMonth === data.month;

                return (
                  <g 
                    key={data.month} 
                    onMouseEnter={() => setHoveredMonth(data.month)}
                    onMouseLeave={() => setHoveredMonth(null)}
                    className="cursor-pointer"
                  >
                    {/* Hover Glow Ambient shadow */}
                    {isHovered && (
                      <rect 
                        x={x - 4} 
                        y={y - 8} 
                        width={barWidth + 8} 
                        height={barHeight + 12} 
                        fill="rgba(59,130,246,0.05)" 
                        rx="6" 
                      />
                    )}

                    {/* Core Bar */}
                    <rect 
                      x={x} 
                      y={y} 
                      width={barWidth} 
                      height={barHeight} 
                      fill={isHovered ? '#2563eb' : '#3b82f6'} 
                      rx="4"
                      className="transition-all duration-300"
                    />

                    {/* Numeric readout overlay */}
                    <text 
                      x={x + barWidth / 2} 
                      y={y - 6} 
                      fill={isHovered ? '#2563eb' : '#64748b'} 
                      fontSize="9" 
                      fontWeight="bold"
                      fontFamily="monospace"
                      textAnchor="middle"
                    >
                      ₹{(data.amount / 1000).toFixed(0)}k
                    </text>

                    {/* Month Label */}
                    <text 
                      x={x + barWidth / 2} 
                      y="155" 
                      fill="#64748b" 
                      fontSize="10" 
                      fontWeight="bold"
                      textAnchor="middle"
                    >
                      {data.month}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Indicator helper */}
          <div className="flex justify-end p-1 text-[10px] text-slate-400 font-mono">
            <span>*HOVER OVER MONTHS FOR ACTIVE VALUE SUMS</span>
          </div>
        </div>

        {/* Competency Category Distribution */}
        <div className="lg:col-span-1 bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col justify-between space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="font-sans font-bold text-base text-slate-900">Career Competency Profile</h3>
            <p className="text-[11px] text-slate-500">Breakdown of delivered routes by classification</p>
          </div>

          <div className="space-y-4">
            {analytics.categoryDistribution.map((item) => {
              // Convert value representation to standard percentage rating
              const totalSum = analytics.categoryDistribution.reduce((acc, c) => acc + c.value, 0);
              const percentage = Math.round((item.value / totalSum) * 100);

              let themeBg = 'bg-blue-550';
              if (item.name === 'Courier Delivery') themeBg = 'bg-amber-500';
              if (item.name === 'Executive Chauffeur') themeBg = 'bg-purple-500';
              if (item.name === 'Specialized Transport') themeBg = 'bg-rose-500';

              return (
                <div key={item.name} className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-slate-800">{item.name}</span>
                    <span className="font-semibold text-slate-500">{item.value} Trips ({percentage}%)</span>
                  </div>
                  
                  {/* Outer Bar */}
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${themeBg} transition-all duration-500`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/50 flex items-start gap-2 text-xs text-slate-650">
            <Sparkles className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              Your courier delivery domain remains highly saturated! Posting specialized tankers driver services next can lock-in <strong>3x greater premium margins</strong>.
            </p>
          </div>
        </div>

      </div>

      {/* Achievements / Credentials (Makes you more advantageous!) */}
      <section id="achievements-section" className="space-y-4">
        <div>
          <h2 className="font-sans text-lg font-bold text-slate-900">Dispatcher Credentials & Achievements</h2>
          <p className="text-xs text-slate-500">Unlock compliance milestones to make you more advantageous during bidding</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ACHIEVEMENTS.map((ach) => {
            const Icon = ach.icon;
            return (
              <div 
                key={ach.id}
                id={`achievement-${ach.id}`}
                className={`border rounded-2xl p-5 flex flex-col justify-between space-y-4 transition-all duration-300 ${
                  ach.unlocked 
                    ? 'bg-slate-50 border-slate-250 hover:shadow-md' 
                    : 'bg-slate-100/50 border-slate-200 opacity-60'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className={`h-11 w-11 rounded-xl flex items-center justify-center border ${
                      ach.unlocked 
                        ? ach.badgeColor 
                        : 'bg-slate-200 border-slate-300 text-slate-400'
                    }`}>
                      <Icon className="h-5.5 w-5.5" />
                    </div>
                    <div>
                      {ach.unlocked ? (
                        <span className="px-2 py-0.5 text-[9px] font-bold rounded-full bg-emerald-100 text-emerald-800">
                          UNLOCKED
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 text-[9px] font-medium rounded-full bg-slate-200 text-slate-500">
                          LOCKED
                        </span>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className={`font-sans font-black text-sm ${ach.unlocked ? 'text-slate-900' : 'text-slate-400'}`}>
                      {ach.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      {ach.description}
                    </p>
                  </div>
                </div>

                <div className="text-[10px] font-mono text-slate-400">
                  {ach.unlocked ? (
                    <span className="text-blue-600 font-bold flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3 text-emerald-500 inline" /> Status: Active Dispatch Badge
                    </span>
                  ) : (
                    <span>Progress: 3/30 deliverables completed</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}
