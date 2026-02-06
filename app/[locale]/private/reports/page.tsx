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
import { fetchReports } from "../lib/api";
import CountrySelector from "../../components/CountrySelector";
import { useCountryFilter } from "../lib/useCountryFilter";

export default function ReportsPage() {
    const [reports, setReports] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const { country: selectedCountry, setCountry: setSelectedCountry } = useCountryFilter();
    const [totalPages, setTotalPages] = useState(1);
    const [totalReports, setTotalReports] = useState(0);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Only load data if country is available
        if (selectedCountry) {
            loadData();
        }
    }, [page, selectedCountry]);

    const loadData = async () => {
        if (!selectedCountry) return; // Don't fetch without country
        
        setLoading(true);
        setError(null);
        try {
            const res = await fetchReports(page, 10, selectedCountry);
            const data = Array.isArray(res) ? res : (res.data || []);
            const meta = !Array.isArray(res) && res.meta ? res.meta : { totalPages: 1, total: data.length };

            setReports(data);
            setTotalPages(meta.totalPages || 1);
            setTotalReports(meta.total || data.length);
        } catch (error) {
            console.error('Failed to load reports:', error);
            setReports([]);
            setError('Unable to load reports. Please retry.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-8 space-y-8">
            <header className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Content Reports</h1>
                    <p className="text-slate-500">Review flagged content and take action.</p>
                </div>
                <div className="flex gap-4">
                    <CountrySelector selectedCountry={selectedCountry} onChange={(c) => { setSelectedCountry(c); setPage(1); }} />
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
                            <TableHead>Type</TableHead>
                            <TableHead>Reason</TableHead>
                            <TableHead>Reported By</TableHead>
                            <TableHead>Target ID</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            Array.from({ length: 5 }).map((_, i) => (
                                <TableRow key={i}>
                                    <TableCell><div className="h-4 w-24 bg-slate-100 rounded animate-pulse"></div></TableCell>
                                    <TableCell><div className="h-4 w-32 bg-slate-100 rounded animate-pulse"></div></TableCell>
                                    <TableCell><div className="h-4 w-24 bg-slate-100 rounded animate-pulse"></div></TableCell>
                                    <TableCell><div className="h-4 w-16 bg-slate-100 rounded animate-pulse"></div></TableCell>
                                    <TableCell><div className="h-4 w-20 bg-slate-100 rounded animate-pulse"></div></TableCell>
                                    <TableCell className="text-right"><div className="h-8 w-16 bg-slate-100 rounded animate-pulse ml-auto"></div></TableCell>
                                </TableRow>
                            ))
                        ) : reports.map((report) => (
                            <TableRow key={report._id || report.id} className="hover:bg-slate-50/50 transition-colors">
                                <TableCell className="font-medium capitalize">{report.type || 'Unknown'}</TableCell>
                                <TableCell className="text-slate-600">{report.reason || 'No reason'}</TableCell>
                                <TableCell>{report.reportedBy?.username || 'Anonymous'}</TableCell>
                                <TableCell className="font-mono text-xs">{report.targetId}</TableCell>
                                <TableCell>
                                    <Badge variant={report.status === 'resolved' ? 'default' : report.status === 'dismissed' ? 'secondary' : 'destructive'}>
                                        {report.status || 'Pending'}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button variant="ghost" size="sm" className="hover:text-yellow-600">Review</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                        {!loading && reports.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-16 text-slate-400">
                                    No pending reports found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>

                {/* Pagination Controls */}
                <div className="border-t border-slate-100 p-4 flex justify-between items-center">
                    <span className="text-sm text-slate-500">Showing {reports.length} of {totalReports} results</span>
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
