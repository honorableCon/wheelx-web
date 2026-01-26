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
import { fetchEvents } from "../lib/api";
import CountrySelector from "../../components/CountrySelector";

export default function EventsPage() {
    const [events, setEvents] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [totalPages, setTotalPages] = useState(1);
    const [totalEvents, setTotalEvents] = useState(0);
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
            const res = await fetchEvents(page, 10, search, selectedCountry);
            const data = Array.isArray(res) ? res : (res.data || []);
            const meta = !Array.isArray(res) && res.meta ? res.meta : { totalPages: 1, total: data.length };

            setEvents(data);
            setTotalPages(meta.totalPages || 1);
            setTotalEvents(meta.total || data.length);
        } catch (error) {
            console.error(error);
            setEvents([]);
        }
        setLoading(false);
    };

    return (
        <div className="p-8 space-y-8">
            <header className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Events</h1>
                    <p className="text-slate-500">Manage upcoming community events.</p>
                </div>
                <div className="flex gap-4">
                    <CountrySelector selectedCountry={selectedCountry} onChange={(c) => { setSelectedCountry(c); setPage(1); }} />
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search events..."
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
                <Table>
                    <TableHeader>
                        <TableRow className="bg-slate-50 hover:bg-slate-50">
                            <TableHead>Title</TableHead>
                            <TableHead>Date & Time</TableHead>
                            <TableHead>Organizer</TableHead>
                            <TableHead>Attendees</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            Array.from({ length: 5 }).map((_, i) => (
                                <TableRow key={i}>
                                    <TableCell><div className="h-4 w-48 bg-slate-100 rounded animate-pulse"></div></TableCell>
                                    <TableCell><div className="h-4 w-32 bg-slate-100 rounded animate-pulse"></div></TableCell>
                                    <TableCell><div className="h-4 w-24 bg-slate-100 rounded animate-pulse"></div></TableCell>
                                    <TableCell><div className="h-4 w-12 bg-slate-100 rounded animate-pulse"></div></TableCell>
                                    <TableCell className="text-right"><div className="h-8 w-16 bg-slate-100 rounded animate-pulse ml-auto"></div></TableCell>
                                </TableRow>
                            ))
                        ) : events.map((event) => (
                            <TableRow key={event._id || event.id} className="hover:bg-slate-50/50 transition-colors">
                                <TableCell className="font-bold text-slate-900">{event.title || 'Untitled Event'}</TableCell>
                                <TableCell className="text-slate-600">{new Date(event.date || event.dateTime).toLocaleString()}</TableCell>
                                <TableCell className="text-slate-600">{event.organizer?.name || 'Unknown'}</TableCell>
                                <TableCell>
                                    <span className="inline-flex items-center px-2 py-1 bg-slate-100 rounded text-xs font-medium text-slate-600">
                                        {event.attendees?.length || 0} Attending
                                    </span>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button variant="ghost" size="sm" className="hover:text-yellow-600">Details</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                        {!loading && events.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-16 text-slate-400">
                                    No events found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>

                {/* Pagination Controls */}
                <div className="border-t border-slate-100 p-4 flex justify-between items-center">
                    <span className="text-sm text-slate-500">Showing {events.length} of {totalEvents} results</span>
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
