import React, { useState, useEffect, useRef } from 'react';
import { TrackSession } from '../types';
import { 
  Compass, 
  MapPin, 
  User, 
  Phone, 
  Truck, 
  Clock, 
  Navigation, 
  Play, 
  Pause, 
  RotateCcw, 
  ShieldCheck, 
  Package, 
  Activity, 
  AlertCircle,
  TrendingDown
} from 'lucide-react';

interface TrackingProps {
  sessions: TrackSession[];
  onUpdateSession: (updated: TrackSession) => void;
}

export default function Tracking({ sessions, onUpdateSession }: TrackingProps) {
  const [selectedSessionId, setSelectedSessionId] = useState(sessions[0]?.id || '');
  const [isSimulating, setIsSimulating] = useState(false);
  const simulationTimerRef = useRef<NodeJS.Timeout | null>(null);

  const activeSession = sessions.find(s => s.id === selectedSessionId) || sessions[0];

  // Stop simulation on unmount
  useEffect(() => {
    return () => {
      if (simulationTimerRef.current) clearInterval(simulationTimerRef.current);
    };
  }, []);

  // Handle active simulation interval tick
  useEffect(() => {
    if (isSimulating) {
      simulationTimerRef.current = setInterval(() => {
        if (!activeSession) return;

        const maxIndex = activeSession.coordinates.length - 1;
        let nextIndex = activeSession.currentStopIndex + 1;
        let nextStatus: TrackSession['status'] = 'On Road';
        let nextEta = Math.max(0, activeSession.etaMinutes - Math.floor(Math.random() * 8 + 4));
        let nextSpeed = activeSession.speedKmph;

        // Loop back if arrived, or change statuses
        if (activeSession.currentStopIndex >= maxIndex) {
          nextIndex = 0;
          nextStatus = 'Departing';
          nextEta = 120;
          nextSpeed = 0;
        } else if (nextIndex === maxIndex) {
          nextStatus = 'Arrived';
          nextEta = 0;
          nextSpeed = 0;
          setIsSimulating(false); // Stop simulation once arrived
        } else if (nextIndex === maxIndex - 1) {
          nextStatus = 'Near Destination';
          nextSpeed = Math.max(30, activeSession.speedKmph - 20); // decelerating
        } else {
          nextStatus = 'On Road';
          nextSpeed = Math.floor(Math.random() * 15 + 80); // cruising speed
        }

        const updatedSession: TrackSession = {
          ...activeSession,
          currentStopIndex: nextIndex,
          status: nextStatus,
          etaMinutes: nextEta,
          speedKmph: nextSpeed,
        };

        onUpdateSession(updatedSession);
      }, 4000); // Step along every 4s for high-fidelity response
    } else {
      if (simulationTimerRef.current) {
        clearInterval(simulationTimerRef.current);
        simulationTimerRef.current = null;
      }
    }

    return () => {
      if (simulationTimerRef.current) clearInterval(simulationTimerRef.current);
    };
  }, [isSimulating, selectedSessionId, activeSession]);

  const toggleSimulation = () => {
    setIsSimulating(!isSimulating);
  };

  const resetSimulation = () => {
    if (!activeSession) return;
    setIsSimulating(false);
    
    // Reset back to departure step
    const updatedSession: TrackSession = {
      ...activeSession,
      currentStopIndex: 0,
      status: 'Departing',
      etaMinutes: 90,
      speedKmph: 0
    };
    onUpdateSession(updatedSession);
  };

  if (!activeSession) {
    return (
      <div className="p-8 text-center bg-white rounded-2xl border border-slate-200">
        <Compass className="h-10 w-10 text-slate-400 mx-auto" />
        <p className="mt-2 text-slate-600 font-bold">No trackable journeys logged yet.</p>
      </div>
    );
  }

  // Get coordinates for active drawing position
  const currentCoord = activeSession.coordinates[activeSession.currentStopIndex] || { x: 10, y: 50 };

  // Generate simple localized progress descriptions
  const getSubtextStatus = (status: string) => {
    switch (status) {
      case 'Departing': return 'Pre-departure cargo inspections and vehicle logistics checks complete.';
      case 'On Road': return 'Cruising smoothly on major highway corridor with real-time HUD monitoring.';
      case 'Traffic Delay': return 'Temporary slow-down due to municipal construction grids.';
      case 'Near Destination': return 'Entering terminal outer gates. Driver initiating deceleration guidelines.';
      case 'Arrived': return 'Successfully moored at terminal unloading deck. Ready for cargo verification.';
      default: return 'Active transit logistics.';
    }
  };

  return (
    <div id="tracking-portal" className="space-y-8 pb-16">
      
      {/* Top Controls Bar */}
      <div className="bg-slate-900 text-white rounded-2xl p-5 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="text-[10px] bg-blue-600 font-bold px-2 py-0.5 rounded uppercase font-mono tracking-widest text-blue-100">
            RADAR ACTIVE CONTROL
          </span>
          <h2 className="font-sans text-lg font-bold text-white flex items-center gap-2">
            <Compass className="h-5 w-5 text-blue-500 animate-spin" style={{ animationDuration: '6s' }} />
            <span>Select Active Consignment to Track</span>
          </h2>
        </div>

        <div className="flex items-center space-x-3">
          <select
            id="tracking-session-select"
            value={selectedSessionId}
            onChange={(e) => {
              setSelectedSessionId(e.target.value);
              setIsSimulating(false);
            }}
            className="bg-slate-800 border border-slate-700 text-sm font-semibold rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-white cursor-pointer"
          >
            {sessions.map((s) => (
              <option key={s.id} value={s.id}>
                {s.driverName} — {s.company}
              </option>
            ))}
          </select>

          <div className="flex items-center gap-1.5 bg-slate-850 px-3 py-2 rounded-xl border border-slate-700/50">
            <span className="relative flex h-2.5 w-2.5">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isSimulating ? 'bg-emerald-400' : 'bg-amber-400'}`}></span>
              <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${isSimulating ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
            </span>
            <span className="text-[10px] font-mono text-slate-300 uppercase">
              {isSimulating ? 'Live Stepping' : 'Telemetry Paused'}
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid: Info card on Left, Large Interactive Map on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Telemetry and Driver profile */}
        <div id="telemetry-panel" className="lg:col-span-1 space-y-6">
          
          {/* Driver Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
            <div className="flex items-center space-x-4">
              <div className="h-14 w-14 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200 text-slate-500 overflow-hidden relative">
                <User className="h-7 w-7 text-slate-400" />
                <div className="absolute inset-0 bg-blue-500/10 pointer-events-none" />
              </div>
              <div className="space-y-0.5">
                <span className="text-[9px] font-bold text-blue-600 tracking-wider font-mono">ASSIGNED DISPATCHER</span>
                <h3 className="font-sans font-bold text-base text-slate-900">{activeSession.driverName}</h3>
                <p className="text-xs text-slate-500">{activeSession.vehicleNo}</p>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-3 grid grid-cols-2 gap-3 text-xs">
              <div className="space-y-0.5">
                <span className="text-[10px] text-slate-400 font-mono block">CARGO SPEC</span>
                <span className="font-semibold text-slate-800 flex items-center gap-1">
                  <Package className="h-3.5 w-3.5 text-blue-500 flex-shrink-0" />
                  <span className="line-clamp-1">{activeSession.cargo}</span>
                </span>
              </div>
              <div className="space-y-0.5">
                <span className="text-[10px] text-slate-400 font-mono block">CARRIER PHONE</span>
                <span className="font-semibold text-blue-600 flex items-center gap-1 cursor-pointer hover:underline">
                  <Phone className="h-3.5 w-3.5 flex-shrink-0" />
                  <span>{activeSession.driverPhone}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Core Telemetry Readouts */}
          <div className="bg-slate-900 text-white rounded-2xl p-5 border border-slate-800 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-bold text-slate-400 font-sans uppercase">HUD Telemetry Readout</span>
              <span className="px-2 py-0.5 rounded bg-blue-900/50 text-blue-400 text-[9px] font-mono font-bold">
                METER CALIBRATED
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-850 p-4 rounded-xl border border-slate-800/80 text-center">
                <span className="text-[10px] text-slate-400 block font-mono">SPEED GAUGE</span>
                <div className="text-2xl font-black font-mono mt-1 text-blue-400">
                  {activeSession.speedKmph} <span className="text-xs font-normal">KMPH</span>
                </div>
              </div>
              <div className="bg-slate-850 p-4 rounded-xl border border-slate-800/80 text-center">
                <span className="text-[10px] text-slate-400 block font-mono">EXPECTED ETA</span>
                <div className="text-2xl font-black font-mono mt-1 text-emerald-400">
                  {activeSession.etaMinutes} <span className="text-xs font-normal">MINS</span>
                </div>
              </div>
            </div>

            <div className="space-y-1 bg-slate-850/60 p-3 rounded-xl border border-slate-800">
              <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono">
                <span>CONSIGNMENT STATUS</span>
                <span className="font-bold text-amber-500 uppercase">{activeSession.status}</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-sans pt-1">
                {getSubtextStatus(activeSession.status)}
              </p>
            </div>

            {/* Simulation controls */}
            <div className="pt-2 flex flex-col gap-2">
              <button
                id="toggle-sim-btn"
                onClick={toggleSimulation}
                className={`w-full py-2.5 rounded-xl text-xs font-bold font-sans transition-all flex items-center justify-center space-x-2 ${
                  isSimulating 
                    ? 'bg-amber-600 hover:bg-amber-500 text-white' 
                    : 'bg-blue-600 hover:bg-blue-500 text-white'
                }`}
              >
                {isSimulating ? (
                  <>
                    <Pause className="h-4 w-4" />
                    <span>Pause Stepping Tracker</span>
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 fill-white" />
                    <span>Engage Tracker Simulation</span>
                  </>
                )}
              </button>

              <button
                id="reset-sim-btn"
                onClick={resetSimulation}
                className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-all flex items-center justify-center space-x-1.5"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Reset Route to Origin</span>
              </button>
            </div>
          </div>

        </div>

        {/* Dynamic Vector Map Stage */}
        <div id="vector-map-panel" className="lg:col-span-2 space-y-4">
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-5 shadow-xs flex flex-col justify-between h-full min-h-[450px]">
            
            {/* Map Header */}
            <div className="flex items-center justify-between border-b border-slate-205 pb-3">
              <div className="flex items-center space-x-2">
                <Navigation className="h-4 w-4 text-blue-600 animate-pulse" />
                <div>
                  <span className="text-[10px] text-slate-400 block font-mono">ACTIVE SECTOR ROAD GRID MAP</span>
                  <span className="font-bold text-xs text-slate-800 font-sans">
                    Route: {activeSession.origin} <span className="text-blue-500 font-black">→</span> {activeSession.destination}
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-slate-400 block font-mono">MAP CALIBRATION</span>
                <span className="text-[10px] font-bold text-emerald-600">ONLINE • AUTOSCALING</span>
              </div>
            </div>

            {/* Simulated Vector SVG Road Grid */}
            <div className="relative bg-slate-900 border border-slate-800 rounded-2xl w-full h-[320px] overflow-hidden my-4">
              
              {/* Back ambient grids */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:24px_24px] opacity-25" />
              
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                
                {/* Simulated topographical landscape paths (curves representing valleys/rivers) */}
                <path d="M-10 80 Q30 50, 70 85 T110 30" fill="none" stroke="#0f172a" strokeWidth="4" />
                <path d="M0 25 Q50 45, 100 15" fill="none" stroke="#0f172a" strokeWidth="2" strokeDasharray="2,4" />

                {/* Draw Route Line */}
                <path 
                  d={`M ${activeSession.coordinates.map(pt => `${pt.x} ${pt.y}`).join(' L ')}`}
                  fill="none" 
                  stroke="#334155" 
                  strokeWidth="3.5" 
                  strokeLinecap="round"
                />
                
                {/* Active Highlighted Traveled Path Line */}
                <path 
                  d={`M ${activeSession.coordinates.slice(0, activeSession.currentStopIndex + 1).map(pt => `${pt.x} ${pt.y}`).join(' L ')}`}
                  fill="none" 
                  stroke="#3b82f6" 
                  strokeWidth="3.5" 
                  strokeLinecap="round"
                  className="transition-all duration-500"
                />

                {/* Route stop markers */}
                {activeSession.coordinates.map((pt, idx) => {
                  const isDestination = idx === activeSession.coordinates.length - 1;
                  const isOrigin = idx === 0;
                  const isCurrent = idx === activeSession.currentStopIndex;
                  return (
                    <g key={idx}>
                      <circle 
                        cx={pt.x} 
                        cy={pt.y} 
                        r={isOrigin || isDestination ? 3.5 : 2.5} 
                        fill={isDestination ? '#10b981' : isOrigin ? '#3b82f6' : '#475569'}
                      />
                      {/* Interactive glowing outer ring for stops */}
                      {isCurrent && (
                        <circle 
                          cx={pt.x} 
                          cy={pt.y} 
                          r="6" 
                          fill="none" 
                          stroke="#3b82f6" 
                          strokeWidth="1"
                          className="animate-pulse"
                          style={{ transformOrigin: `${pt.x}px ${pt.y}px` }}
                        />
                      )}
                    </g>
                  );
                })}

                {/* Driver Active Position Marker (Car/Truck SVG pin) */}
                <g className="transition-all duration-700" style={{ transform: `translate(${currentCoord.x}px, ${currentCoord.y}px)` }}>
                  {/* Glowing Pulse */}
                  <circle cx="0" cy="0" r="8" fill="rgba(59, 130, 246, 0.3)" className="animate-ping" />
                  
                  {/* Pin Circle */}
                  <circle cx="0" cy="0" r="5" fill="#3b82f6" stroke="#ffffff" strokeWidth="1.5" />
                  
                  {/* Dynamic orientation flag pointer */}
                  <polygon points="-3,-9 3,-9 0,-5" fill="#ef4444" />
                </g>
              </svg>

              {/* HUD Coordinates overlays */}
              <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-xs border border-slate-800 p-2 rounded text-[10px] text-slate-300 font-mono space-y-0.5">
                <div>NODE ADDR: 0x{activeSession.id.toUpperCase()}</div>
                <div>POS_X: {currentCoord.x.toFixed(1)}m, POS_Y: {currentCoord.y.toFixed(1)}m</div>
                <div>EST_LATENCY: 14ms</div>
              </div>

              {/* Stop index overlay display */}
              <div className="absolute bottom-3 right-3 bg-slate-950/80 backdrop-blur-xs border border-slate-800 px-3 py-1.5 rounded-lg text-xs font-mono text-emerald-400">
                {activeSession.currentStopIndex === activeSession.coordinates.length - 1 ? (
                  <span>★ Destination Arrived</span>
                ) : (
                  <span>✍ Sector stop {activeSession.currentStopIndex + 1} of {activeSession.coordinates.length}</span>
                )}
              </div>
            </div>

            {/* Navigation timeline list */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-2 border-t border-slate-200">
              {activeSession.coordinates.map((pt, idx) => {
                const isPassed = idx <= activeSession.currentStopIndex;
                const isCurrent = idx === activeSession.currentStopIndex;
                
                let stepLabel = `Sector ${idx + 1}`;
                if (idx === 0) stepLabel = 'Origin Depot';
                if (idx === activeSession.coordinates.length - 1) stepLabel = 'Final Unloading';

                return (
                  <div 
                    key={idx} 
                    className={`p-2 rounded-lg text-center transition-all ${
                      isCurrent 
                        ? 'bg-blue-100 border border-blue-200 text-blue-800' 
                        : isPassed 
                        ? 'bg-emerald-50 text-emerald-700' 
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    <div className="font-mono text-[9px] font-bold block">STEP_0{idx + 1}</div>
                    <div className="text-[10px] font-bold mt-0.5 font-sans truncate">{stepLabel}</div>
                    <div className="text-[9px] font-medium block">
                      {isCurrent ? '● Active' : isPassed ? '✔ Done' : '◌ Pending'}
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
