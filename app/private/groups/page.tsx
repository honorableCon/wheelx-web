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
import { fetchGroups } from "../lib/api";
import CountrySelector from "../../components/CountrySelector";

export default function GroupsPage() {
    const [groups, setGroups] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [totalPages, setTotalPages] = useState(1);
    const [totalGroups, setTotalGroups] = useState(0);
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
            const res = await fetchGroups(page, 10, search, selectedCountry);
            const data = Array.isArray(res) ? res : (res.data || []);
            const meta = !Array.isArray(res) && res.meta ? res.meta : { totalPages: 1, total: data.length };

            setGroups(data);
            setTotalPages(meta.totalPages || 1);
            setTotalGroups(meta.total || data.length);
        } catch (e) {
            console.error("Failed to load groups", e);
            setGroups([]);
        }
        setLoading(false);
    };

    return (
        <div className="p-8 space-y-8">
            <header className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Groups</h1>
                    <p className="text-slate-500">Manage community groups and memberships.</p>
                </div>
                <div className="flex gap-4">
                    <CountrySelector selectedCountry={selectedCountry} onChange={(c) => { setSelectedCountry(c); setPage(1); }} />
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search groups..."
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
                            <TableHead className="w-[80px]">Image</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Members</TableHead>
                            <TableHead>Privacy</TableHead>
                            <TableHead>Created By</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            Array.from({ length: 5 }).map((_, i) => (
                                <TableRow key={i}>
                                    <TableCell><div className="h-10 w-10 bg-slate-100 rounded-lg animate-pulse"></div></TableCell>
                                    <TableCell><div className="h-4 w-32 bg-slate-100 rounded animate-pulse"></div></TableCell>
                                    <TableCell><div className="h-4 w-16 bg-slate-100 rounded animate-pulse"></div></TableCell>
                                    <TableCell><div className="h-4 w-20 bg-slate-100 rounded animate-pulse"></div></TableCell>
                                    <TableCell><div className="h-4 w-24 bg-slate-100 rounded animate-pulse"></div></TableCell>
                                    <TableCell className="text-right"><div className="h-8 w-16 bg-slate-100 rounded animate-pulse ml-auto"></div></TableCell>
                                </TableRow>
                            ))
                        ) : groups.map((group) => (
                            <TableRow key={group._id || group.id} className="hover:bg-slate-50/50 transition-colors">
                                <TableCell>
                                    <div className="w-10 h-10 rounded-lg bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600 overflow-hidden">
                                        {group.image ? (
                                            <img src={group.image} alt={group.name} className="w-full h-full object-cover" />
                                        ) : (
                                            group.name?.charAt(0) || 'G'
                                        )}
                                    </div>
                                </TableCell>
                                <TableCell className="font-bold text-slate-900">{group.name}</TableCell>
                                <TableCell>
                                    <Badge variant="outline" className="font-normal text-slate-600">{group.members?.length || 0} Members</Badge>
                                </TableCell>
                                <TableCell>
                                    <Badge variant={group.privacy === 'private' ? 'secondary' : 'default'} className={group.privacy === 'private' ? "bg-slate-100 text-slate-600" : "bg-blue-100 text-blue-700 hover:bg-blue-200"}>
                                        {group.privacy === 'private' ? 'Private' : 'Public'}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-slate-600 text-sm">{group.createdBy?.name || 'Unknown'}</TableCell>
                                <TableCell className="text-right">
                                    <Button variant="ghost" size="sm" className="hover:text-yellow-600">Manage</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                        {!loading && groups.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-16 text-slate-400">
                                    No groups found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>

                {/* Pagination Controls */}
                <div className="border-t border-slate-100 p-4 flex justify-between items-center">
                    <span className="text-sm text-slate-500">Showing {groups.length} of {totalGroups} results</span>
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
