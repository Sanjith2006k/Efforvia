import React from "react";
import { Loader2, ServerCog } from "lucide-react";
import FlowFieldBackground from "./FlowFieldBackground";
import GlassCard from "./GlassCard";
import PageTransition from "./PageTransition";

export default function ServerWakeup() {
  return (
    <PageTransition>
      <div className="relative min-h-screen flex items-center justify-center px-6 bg-slate-950 overflow-hidden">
        <FlowFieldBackground />

        <GlassCard className="relative z-10 w-full max-w-md p-10 flex flex-col items-center justify-center gap-6 text-center border-indigo-500/20 shadow-2xl shadow-indigo-500/10">
          <div className="relative flex items-center justify-center w-24 h-24 mb-2">
            <div className="absolute inset-0 rounded-full bg-indigo-500/20 animate-pulse blur-xl"></div>
            <div className="absolute inset-0 rounded-full border border-indigo-400/30 border-t-indigo-400 animate-spin"></div>
            <ServerCog className="w-10 h-10 text-indigo-400 relative z-10" />
          </div>
          
          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-white tracking-tight">Waking up server</h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Our backend has been sleeping due to inactivity. Please wait a moment while we spin things back up. 
              This may take up to a minute.
            </p>
          </div>
          
          <div className="w-full bg-slate-800/60 rounded-full h-1.5 mt-4 overflow-hidden relative">
            <div className="absolute top-0 bottom-0 left-0 bg-indigo-500 h-1.5 rounded-full w-1/3 animate-[pulse_2s_ease-in-out_infinite] shadow-[0_0_10px_rgba(99,102,241,0.8)]"></div>
          </div>
        </GlassCard>
      </div>
    </PageTransition>
  );
}
