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
import { fetchGarages, deleteGarage, updateGarage } from "../lib/api";

export default function GaragesPage() {
    const [garages, setGarages] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalGarages, setTotalGarages] = useState(0);

    // Edit State
    const [editingGarage, setEditingGarage] = useState<any>(null);
    const [editForm, setEditForm] = useState({ name: "", address: "", services: "" });

    useEffect(() => {
        loadData();
    }, [page]);

    const loadData = async () => {
        setLoading(true);
        try {
            const res = await fetchGarages(page, 10);
            const data = Array.isArray(res) ? res : (res.data || []);
            const meta = !Array.isArray(res) && res.meta ? res.meta : { totalPages: 1, total: data.length };

            setGarages(data);
            setTotalPages(meta.totalPages || 1);
            setTotalGarages(meta.total || data.length);
        } catch (error) {
            console.error("Failed to load garages:", error);
            setGarages([]);
        }
        setLoading(false);
    };

    const handleDelete = async (id: string, name: string) => {
        if (confirm(`Are you sure you want to delete ${name}? This action cannot be undone.`)) {
            const success = await deleteGarage(id);
            if (success) {
                loadData();
            } else {
                alert("Failed to delete garage.");
            }
        }
    };

    const startEdit = (garage: any) => {
        setEditingGarage(garage);
        setEditForm({
            name: garage.name,
            address: garage.address,
            services: garage.services?.join(", ") || ""
        });
    };

    const saveEdit = async () => {
        if (!editingGarage) return;

        const servicesArray = editForm.services.split(",").map(s => s.trim()).filter(Boolean);
        const data = {
            ...editForm,
            services: servicesArray
        };

        const success = await updateGarage(editingGarage._id || editingGarage.id, data);
        if (success) {
            setEditingGarage(null);
            loadData();
        } else {
            alert("Failed to update garage.");
        }
    };

    return (
        <div className="p-8 space-y-8 relative">
            <header className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Garages</h1>
                    <p className="text-slate-500">Manage partner garages and service centers.</p>
                </div>
                <div className="flex gap-4">
                    <Button>Add New Garage</Button>
                </div>
            </header>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-slate-50 hover:bg-slate-50">
                            <TableHead className="w-[80px]">Image</TableHead>
                            <TableHead>Garage Name</TableHead>
                            <TableHead>Services</TableHead>
                            <TableHead>Brands</TableHead>
                            <TableHead>Verified</TableHead>
                            <TableHead>Rating</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            Array.from({ length: 5 }).map((_, i) => (
                                <TableRow key={i}>
                                    <TableCell><div className="h-10 w-10 bg-slate-100 rounded-lg animate-pulse"></div></TableCell>
                                    <TableCell><div className="h-4 w-32 bg-slate-100 rounded animate-pulse"></div></TableCell>
                                    <TableCell><div className="h-4 w-24 bg-slate-100 rounded animate-pulse"></div></TableCell>
                                    <TableCell><div className="h-4 w-20 bg-slate-100 rounded animate-pulse"></div></TableCell>
                                    <TableCell><div className="h-4 w-16 bg-slate-100 rounded animate-pulse"></div></TableCell>
                                    <TableCell><div className="h-4 w-12 bg-slate-100 rounded animate-pulse"></div></TableCell>
                                    <TableCell className="text-right"><div className="h-8 w-16 bg-slate-100 rounded animate-pulse ml-auto"></div></TableCell>
                                </TableRow>
                            ))
                        ) : garages.map((garage) => (
                            <TableRow key={garage._id || garage.id} className="hover:bg-slate-50/50 transition-colors">
                                <TableCell>
                                    <div className="w-10 h-10 rounded-lg bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600 overflow-hidden">
                                        {garage.image || (garage.images && garage.images[0]) ? (
                                            <img src={garage.image || garage.images[0]} alt={garage.name} className="w-full h-full object-cover" />
                                        ) : (
                                            garage.name?.charAt(0) || 'G'
                                        )}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex flex-col">
                                        <span className="font-bold text-slate-900">{garage.name}</span>
                                        <span className="text-xs text-slate-500">{garage.address}</span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex flex-wrap gap-1">
                                        {garage.services?.slice(0, 2).map((s: string, idx: number) => (
                                            <Badge key={idx} variant="outline" className="text-xs font-normal text-slate-600 border-slate-200">{s}</Badge>
                                        ))}
                                        {garage.services?.length > 2 && <span className="text-xs text-slate-400">+{garage.services.length - 2}</span>}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="text-xs text-slate-600">{garage.brands?.join(', ')}</div>
                                </TableCell>
                                <TableCell>
                                    {garage.verified ? (
                                        <span className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">Verified</span>
                                    ) : (
                                        <span className="inline-flex items-center px-2 py-1 bg-slate-100 text-slate-600 rounded text-xs font-medium">Pending</span>
                                    )}
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-1 text-slate-700 font-medium">
                                        <span className="text-yellow-400">★</span>
                                        {garage.rating}
                                    </div>
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-2">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="hover:text-yellow-600"
                                            onClick={() => startEdit(garage)}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                            onClick={() => handleDelete(garage._id || garage.id, garage.name)}
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                {/* Pagination Controls */}
                <div className="border-t border-slate-100 p-4 flex justify-between items-center">
                    <span className="text-sm text-slate-500">Showing {garages.length} of {totalGarages} results</span>
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

            {/* Simple Edit Modal Overlay */}
            {editingGarage && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 space-y-4">
                        <h2 className="text-xl font-bold">Edit Garage</h2>
                        <div className="space-y-3">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
                                <input
                                    value={editForm.name}
                                    onChange={e => setEditForm({ ...editForm, name: e.target.value })}
                                    className="w-full px-3 py-2 border rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Address</label>
                                <input
                                    value={editForm.address}
                                    onChange={e => setEditForm({ ...editForm, address: e.target.value })}
                                    className="w-full px-3 py-2 border rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Services (comma separated)</label>
                                <textarea
                                    value={editForm.services}
                                    onChange={e => setEditForm({ ...editForm, services: e.target.value })}
                                    className="w-full px-3 py-2 border rounded-lg h-24"
                                />
                            </div>
                        </div>
                        <div className="flex justify-end gap-3 pt-4">
                            <Button variant="outline" onClick={() => setEditingGarage(null)}>Cancel</Button>
                            <Button onClick={saveEdit}>Save Changes</Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
