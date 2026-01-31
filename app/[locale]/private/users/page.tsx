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
import { Badge } from "@/components/ui/badge"
import { fetchUsers, banUser, unbanUser } from "../lib/api";
import CountrySelector from "../../components/CountrySelector";
import { useToast } from "../providers";
import { useCountryFilter } from "../lib/useCountryFilter";

export default function UsersPage() {
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [totalPages, setTotalPages] = useState(1);
    const [totalUsers, setTotalUsers] = useState(0);
    const { country: selectedCountry, setCountry: setSelectedCountry } = useCountryFilter("");
    const [error, setError] = useState<string | null>(null);
    const { showToast } = useToast();

    useEffect(() => {
        const timer = setTimeout(() => {
            loadData();
        }, 500);
        return () => clearTimeout(timer);
    }, [page, search, selectedCountry]);

    const loadData = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetchUsers(page, 10, search, selectedCountry);
            const data = Array.isArray(res) ? res : (res.data || []);
            const meta = !Array.isArray(res) && res.meta ? res.meta : { totalPages: 1, total: data.length };

            setUsers(data);
            setTotalPages(meta.totalPages || 1);
            setTotalUsers(meta.total || data.length);
        } catch (e) {
            console.error("Failed to load users", e);
            setUsers([]);
            setError("Unable to load users. Please retry.");
        }
        setLoading(false);
    };

    const handleBanToggle = async (user: any) => {
        const action = user.isBanned ? 'unban' : 'ban';
        if (!confirm(`Are you sure you want to ${action} ${user.displayName}?`)) return;

        const success = user.isBanned
            ? await unbanUser(user.id || user._id)
            : await banUser(user.id || user._id);

        if (success) {
            showToast({ title: `User ${action}ned`, variant: 'success' });
            loadData();
        } else {
            showToast({ title: `Failed to ${action} user`, variant: 'error' });
        }
    };

    return (
        <div className="p-8 space-y-8">
            <header className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Users</h1>
                    <p className="text-slate-500">Manage all registered users and their roles.</p>
                </div>
                <div className="flex gap-4">
                    <CountrySelector selectedCountry={selectedCountry} onChange={(c) => { setSelectedCountry(c); setPage(1); }} />
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search users..."
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
                            <TableHead className="w-[80px]">Avatar</TableHead>
                            <TableHead>User</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            Array.from({ length: 5 }).map((_, i) => (
                                <TableRow key={i}>
                                    <TableCell><div className="h-8 w-8 bg-slate-100 rounded-full animate-pulse"></div></TableCell>
                                    <TableCell>
                                        <div className="space-y-1">
                                            <div className="h-4 w-32 bg-slate-100 rounded animate-pulse"></div>
                                            <div className="h-3 w-20 bg-slate-100 rounded animate-pulse"></div>
                                        </div>
                                    </TableCell>
                                    <TableCell><div className="h-4 w-48 bg-slate-100 rounded animate-pulse"></div></TableCell>
                                    <TableCell><div className="h-6 w-16 bg-slate-100 rounded animate-pulse"></div></TableCell>
                                    <TableCell><div className="h-4 w-20 bg-slate-100 rounded animate-pulse"></div></TableCell>
                                    <TableCell className="text-right"><div className="h-8 w-16 bg-slate-100 rounded animate-pulse ml-auto"></div></TableCell>
                                </TableRow>
                            ))
                        ) : users.map((user) => (
                            <TableRow key={user.id || user._id} className="hover:bg-slate-50/50 transition-colors">
                                <TableCell>
                                    <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-sm font-bold text-slate-600 overflow-hidden">
                                        {user.avatar ? (
                                            <img src={user.avatar} alt={user.displayName} className="w-full h-full object-cover" />
                                        ) : (
                                            (user.displayName || user.username)?.charAt(0).toUpperCase() || 'U'
                                        )}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex flex-col">
                                        <span className="font-bold text-slate-900">{user.displayName || 'No Name'}</span>
                                        <span className="text-xs text-slate-500">@{user.username || 'unknown'}</span>
                                    </div>
                                </TableCell>
                                <TableCell className="text-slate-500">{user.email}</TableCell>
                                <TableCell>
                                    <Badge variant="secondary" className="bg-slate-100 text-slate-700 hover:bg-slate-200">{user.role || 'User'}</Badge>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <span className={`w-2 h-2 rounded-full ${user.isBanned ? 'bg-red-600' :
                                            user.isDeleted ? 'bg-slate-400' : 'bg-green-500'
                                            }`} />
                                        <span className={`text-sm font-medium ${user.isBanned ? 'text-red-600' :
                                            user.isDeleted ? 'text-slate-500' : 'text-slate-700'
                                            }`}>
                                            {user.isBanned ? 'Banned' : user.isDeleted ? 'Deleted' : 'Active'}
                                        </span>
                                    </div>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button
                                        variant={user.isBanned ? "outline" : "ghost"}
                                        size="sm"
                                        className={user.isBanned ? "text-green-600 border-green-200 bg-green-50" : "text-red-500 hover:text-red-600 hover:bg-red-50"}
                                        onClick={() => handleBanToggle(user)}
                                    >
                                        {user.isBanned ? 'Unban' : 'Ban'}
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                        {!loading && users.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-16 text-slate-400">
                                    No users found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>

                {/* Pagination Controls */}
                <div className="border-t border-slate-100 p-4 flex justify-between items-center">
                    <span className="text-sm text-slate-500">Showing {users.length} of {totalUsers} results</span>
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
