"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { fetchActiveRides, stopActiveRide } from "../lib/api";
import { Badge } from "@/components/ui/badge";

export default function ActiveRidesPage() {
    const [rides, setRides] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadData();
        const interval = setInterval(loadData, 10000); // Poll every 10s
        return () => clearInterval(interval);
    }, []);

    const loadData = async () => {
        const data = await fetchActiveRides();
        setRides(Array.isArray(data) ? data : []);
        setLoading(false);
    };

    const handleStopRide = async (id: string) => {
        if (confirm("Are you sure you want to stop this ride forcefully?")) {
            await stopActiveRide(id);
            loadData();
        }
    };

    return (
        <div className="p-8 space-y-8">
            <header className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Active Rides Monitor</h1>
                    <p className="text-slate-500">Real-time view of ongoing rides.</p>
                </div>
                <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    Live Updating
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {!loading && rides.length === 0 && (
                    <div className="col-span-full text-center py-20 bg-slate-50 rounded-xl border border-dashed border-slate-300">
                        <p className="text-slate-500">No active rides at the moment.</p>
                    </div>
                )}

                {rides.map(ride => (
                    <div key={ride._id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col justify-between">
                        <div>
                            <div className="flex justify-between items-start mb-4">
                                <Badge variant="outline" className="font-mono text-xs">{ride.code}</Badge>
                                <span className="text-xs text-slate-400">Started {new Date(ride.createdAt || Date.now()).toLocaleTimeString()}</span>
                            </div>
                            <h3 className="font-bold text-lg mb-1">Ride Session</h3>
                            <div className="text-sm text-slate-600 mb-4">
                                <p>Host ID: <span className="font-mono bg-slate-100 px-1 rounded">{ride.hostId}</span></p>
                                <p>{ride.participantIds?.length || 1} Participants</p>
                            </div>
                        </div>
                        <div className="pt-4 border-t border-slate-100 mt-4">
                            <Button variant="destructive" size="sm" className="w-full" onClick={() => handleStopRide(ride._id)}>
                                Force Stop
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
