"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { fetchActiveRides, stopActiveRide } from "../lib/api";
import CountrySelector from "../../components/CountrySelector";
import { useToast } from "../providers";
import { useCountryFilter } from "../lib/useCountryFilter";

export default function ActiveRidesPage() {
    const [rides, setRides] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const { country: selectedCountry, setCountry: setSelectedCountry } = useCountryFilter("");
    const [error, setError] = useState<string | null>(null);
    const { showToast } = useToast();

    useEffect(() => {
        loadData();
        const interval = setInterval(loadData, 15000); // Polling every 15s
        return () => clearInterval(interval);
    }, [selectedCountry]);

    const loadData = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchActiveRides(selectedCountry);
            setRides(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error(error);
            setRides([]);
            setError("Unable to load active rides. Please retry.");
        }
        setLoading(false);
    };

    const handleStopRide = async (rideId: string) => {
        if (!confirm("Are you sure you want to emergency stop this ride?")) return;
        const success = await stopActiveRide(rideId);
        if (success) {
            showToast({ title: "Ride stopped", variant: 'success' });
            loadData();
        } else {
            showToast({ title: "Failed to stop ride", variant: 'error' });
        }
    };

    return (
        <div className="p-8 space-y-8">
            <header className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Active Rides</h1>
                    <p className="text-slate-500">Monitor rides currently in progress.</p>
                </div>
                <div className="flex gap-4">
                    <CountrySelector selectedCountry={selectedCountry} onChange={setSelectedCountry} />
                </div>
            </header>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                {error && (
                    <div className="bg-red-50 text-red-700 px-4 py-3 border-b border-red-100 text-sm">
                        {error}
                    </div>
                )}
                <Table>
                    <TableHeader>
                        <TableRow className="bg-slate-50 hover:bg-slate-50">
                            <TableHead>Host</TableHead>
                            <TableHead>Started At</TableHead>
                            <TableHead>Participants</TableHead>
                            <TableHead>Current Location</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading && rides.length === 0 ? (
                            Array.from({ length: 3 }).map((_, i) => (
                                <TableRow key={i}>
                                    <TableCell><div className="h-4 w-32 bg-slate-100 rounded animate-pulse"></div></TableCell>
                                    <TableCell><div className="h-4 w-24 bg-slate-100 rounded animate-pulse"></div></TableCell>
                                    <TableCell><div className="h-4 w-16 bg-slate-100 rounded animate-pulse"></div></TableCell>
                                    <TableCell><div className="h-4 w-40 bg-slate-100 rounded animate-pulse"></div></TableCell>
                                    <TableCell><div className="h-4 w-20 bg-slate-100 rounded animate-pulse"></div></TableCell>
                                    <TableCell className="text-right"><div className="h-8 w-16 bg-slate-100 rounded animate-pulse ml-auto"></div></TableCell>
                                </TableRow>
                            ))
                        ) : rides.map((ride) => (
                            <TableRow key={ride._id || ride.id} className="hover:bg-slate-50/50 transition-colors">
                                <TableCell className="font-bold text-slate-900">
                                    {/* hostId is populated with User object now */}
                                    {ride.hostId?.displayName || 'Unknown'}
                                </TableCell>
                                <TableCell className="text-slate-600">
                                    {new Date(ride.createdAt).toLocaleTimeString()}
                                </TableCell>
                                <TableCell>
                                    <span className="inline-flex items-center px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-medium">
                                        {ride.participantIds?.length || 1} Riders
                                    </span>
                                </TableCell>
                                <TableCell className="font-mono text-xs text-slate-500">
                                    {ride.locations?.[0] ? `${ride.locations[0].latitude.toFixed(4)}, ${ride.locations[0].longitude.toFixed(4)}` : 'Waiting for signal...'}
                                </TableCell>
                                <TableCell>
                                    <Badge className="bg-green-500 hover:bg-green-600 animate-pulse">LIVE</Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        onClick={() => handleStopRide(ride._id || ride.id)}
                                    >
                                        Emergency Stop
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                        {!loading && rides.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-16 text-slate-400">
                                    No active rides at the moment.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
