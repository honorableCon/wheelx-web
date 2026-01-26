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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchRides } from "../lib/api";
import CountrySelector from "../../components/CountrySelector";

export default function RidesPage() {
    const [rides, setRides] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [totalPages, setTotalPages] = useState(1);
    const [totalRides, setTotalRides] = useState(0);
    const [selectedCountry, setSelectedCountry] = useState("");

    useEffect(() => {
        const timer = setTimeout(() => {
            loadData();
        }, 500);
        return () => clearTimeout(timer);
    }, [page, search, selectedCountry]);

    const loadData = async () => {
        setLoading(true);
        try {
            const res = await fetchRides(page, 10, search, selectedCountry);
            const data = Array.isArray(res) ? res : (res.data || []);
            const meta = !Array.isArray(res) && res.meta ? res.meta : { totalPages: 1, total: data.length };

            setRides(data);
            setTotalPages(meta.totalPages || 1);
            setTotalRides(meta.total || data.length);
        } catch (error) {
            console.error(error);
            setRides([]);
        }
        setLoading(false);
    };

    return (
        <div className="p-8 space-y-8">
            <header className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Ride History</h1>
                    <p className="text-muted-foreground">Manage and view past ride sessions.</p>
                </div>
                <div className="flex gap-4">
                    <CountrySelector selectedCountry={selectedCountry} onChange={(c) => { setSelectedCountry(c); setPage(1); }} />
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search rides..."
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setPage(1);
                            }}
                            className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400/50 w-64"
                        />
                        <svg className="w-5 h-5 text-slate-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    </div>
                </div>
            </header>

            <Card className="border-slate-200 shadow-sm">
                <CardHeader>
                    <CardTitle>Recent Rides</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Ride Name</TableHead>
                                <TableHead>Host</TableHead>
                                <TableHead>Route</TableHead>
                                <TableHead>Stats</TableHead>
                                <TableHead>Speed (Avg)</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                Array.from({ length: 5 }).map((_, i) => (
                                    <TableRow key={i}>
                                        <TableCell><div className="h-4 w-32 bg-slate-100 rounded animate-pulse"></div></TableCell>
                                        <TableCell><div className="h-4 w-24 bg-slate-100 rounded animate-pulse"></div></TableCell>
                                        <TableCell><div className="h-4 w-16 bg-slate-100 rounded animate-pulse"></div></TableCell>
                                        <TableCell><div className="h-4 w-20 bg-slate-100 rounded animate-pulse"></div></TableCell>
                                        <TableCell className="text-right"><div className="h-8 w-16 bg-slate-100 rounded animate-pulse ml-auto"></div></TableCell>
                                    </TableRow>
                                ))
                            ) : rides.map((ride) => (
                                <TableRow key={ride._id}>
                                    <TableCell className="font-medium">{ride.name || 'Untitled Ride'}</TableCell>
                                    <TableCell>{ride.userId?.displayName || ride.userId?.email || 'Unknown'}</TableCell>
                                    <TableCell>
                                        <div className="flex flex-col text-xs text-slate-500">
                                            <span>{ride.startLocation?.split(',')[0] || 'Unknown'}</span>
                                            <span>to {ride.endLocation?.split(',')[0] || 'Unknown'}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="text-xs">
                                            <div>{(ride.distance || 0).toFixed(2)} km</div>
                                            <div className="text-slate-500">{(ride.duration || 0).toFixed(0)} min</div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-xs text-slate-600">
                                        {(ride.avgSpeed || 0).toFixed(1)} km/h
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={ride.status === 'COMPLETED' ? 'default' : 'secondary'}>
                                            {ride.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{new Date(ride.completedAt || ride.createdAt).toLocaleDateString()}</TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="sm">View</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {!loading && rides.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                                        No rides found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>

                    {/* Pagination Controls */}
                    <div className="border-t border-slate-100 pt-4 mt-4 flex justify-between items-center">
                        <span className="text-sm text-slate-500">Showing {rides.length} of {totalRides} results</span>
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                disabled={page <= 1 || loading}
                                onClick={() => setPage(page - 1)}
                            >
                                Previous
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                disabled={page >= totalPages || loading}
                                onClick={() => setPage(page + 1)}
                            >
                                Next
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
