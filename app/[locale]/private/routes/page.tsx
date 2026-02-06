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
import { fetchRoutes, deleteRoute } from "../lib/api";
import CountrySelector from "../../components/CountrySelector";
import { useToast } from "../providers";
import { useCountryFilter } from "../lib/useCountryFilter";

export default function RoutesPage() {
    const [routes, setRoutes] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [totalPages, setTotalPages] = useState(1);
    const [totalRoutes, setTotalRoutes] = useState(0);
    const { country: selectedCountry, setCountry: setSelectedCountry } = useCountryFilter();
    const [error, setError] = useState<string | null>(null);
    const { showToast } = useToast();

    useEffect(() => {
        // Only load data if country is available
        if (selectedCountry) {
            const timer = setTimeout(() => {
                loadData();
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [page, search, selectedCountry]);

    const loadData = async () => {
        if (!selectedCountry) return; // Don't fetch without country
        
        setLoading(true);
        setError(null);
        try {
            const res = await fetchRoutes(page, 10, search, selectedCountry);
            const data = Array.isArray(res) ? res : (res.data || []);
            const meta = !Array.isArray(res) && res.meta ? res.meta : { totalPages: 1, total: data.length };

            setRoutes(data);
            setTotalPages(meta.totalPages || 1);
            setTotalRoutes(meta.total || data.length);
        } catch (e) {
            console.error("Failed to load routes", e);
            setRoutes([]);
            setError("Unable to load routes. Please retry.");
        }
        setLoading(false);
    };

    const handleDelete = async (routeId: string, routeName: string) => {
        if (!confirm(`Are you sure you want to delete "${routeName}"?`)) return;

        const success = await deleteRoute(routeId);
        if (success) {
            showToast({ title: "Route deleted", variant: 'success' });
            loadData();
        } else {
            showToast({ title: "Failed to delete route", variant: 'error' });
        }
    };

    return (
        <div className="p-8 space-y-8">
            <header className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Routes</h1>
                    <p className="text-slate-500">Manage saved routes and GPX imports.</p>
                </div>
                <div className="flex gap-4">
                    <CountrySelector selectedCountry={selectedCountry} onChange={(c) => { setSelectedCountry(c); setPage(1); }} />
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search routes..."
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

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                {error && (
                    <div className="bg-red-50 text-red-700 px-4 py-3 border-b border-red-100 text-sm">
                        {error}
                    </div>
                )}
                <Table>
                    <TableHeader>
                        <TableRow className="bg-slate-50 hover:bg-slate-50">
                            <TableHead>Name</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Distance</TableHead>
                            <TableHead>Difficulty</TableHead>
                            <TableHead>Rating</TableHead>
                            <TableHead>Views</TableHead>
                            <TableHead>Favorites</TableHead>
                            <TableHead>Created By</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            Array.from({ length: 5 }).map((_, i) => (
                                <TableRow key={i}>
                                    <TableCell><div className="h-4 w-32 bg-slate-100 rounded animate-pulse"></div></TableCell>
                                    <TableCell><div className="h-4 w-20 bg-slate-100 rounded animate-pulse"></div></TableCell>
                                    <TableCell><div className="h-4 w-16 bg-slate-100 rounded animate-pulse"></div></TableCell>
                                    <TableCell><div className="h-4 w-20 bg-slate-100 rounded animate-pulse"></div></TableCell>
                                    <TableCell><div className="h-4 w-12 bg-slate-100 rounded animate-pulse"></div></TableCell>
                                    <TableCell><div className="h-4 w-12 bg-slate-100 rounded animate-pulse"></div></TableCell>
                                    <TableCell><div className="h-4 w-12 bg-slate-100 rounded animate-pulse"></div></TableCell>
                                    <TableCell><div className="h-4 w-24 bg-slate-100 rounded animate-pulse"></div></TableCell>
                                    <TableCell className="text-right"><div className="h-8 w-16 bg-slate-100 rounded animate-pulse ml-auto"></div></TableCell>
                                </TableRow>
                            ))
                        ) : routes.map((route) => (
                            <TableRow key={route.id || route._id} className="hover:bg-slate-50/50 transition-colors">
                                <TableCell className="font-bold text-slate-900">{route.name}</TableCell>
                                <TableCell>
                                    <Badge variant="secondary" className="capitalize">
                                        {route.type}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-slate-600">{route.distance.toFixed(1)} km</TableCell>
                                <TableCell>
                                    <Badge 
                                        variant={
                                            route.difficulty === 'easy' ? 'default' : 
                                            route.difficulty === 'moderate' ? 'secondary' : 
                                            'destructive'
                                        }
                                        className="capitalize"
                                    >
                                        {route.difficulty}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-1">
                                        <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                                        </svg>
                                        <span className="text-sm font-medium">{route.rating.toFixed(1)}</span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <span className="text-sm text-slate-600">{route.viewCount || 0}</span>
                                </TableCell>
                                <TableCell>
                                    <span className="text-sm text-slate-600">{route.favoritedBy?.length || 0}</span>
                                </TableCell>
                                <TableCell className="text-slate-600">
                                    {route.createdBy?.displayName || route.createdBy?.username || 'Unknown'}
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-red-500 hover:text-red-600 hover:bg-red-50"
                                        onClick={() => handleDelete(route.id || route._id, route.name)}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                        {!loading && routes.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={9} className="text-center py-16 text-slate-400">
                                    No routes found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>

                {/* Pagination Controls */}
                <div className="border-t border-slate-100 p-4 flex justify-between items-center">
                    <span className="text-sm text-slate-500">Showing {routes.length} of {totalRoutes} results</span>
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
            </div>
        </div>
    );
}
