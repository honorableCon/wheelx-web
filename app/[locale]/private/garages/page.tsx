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
import { fetchGarages, deleteGarage, updateGarage, createGarage } from "../lib/api";
import CountrySelector from "../../components/CountrySelector";
import { useCountryFilter } from "../lib/useCountryFilter";
import { useToast } from "../providers";

export default function GaragesPage() {
    const [garages, setGarages] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalGarages, setTotalGarages] = useState(0);

    // Edit State
    const [editingGarage, setEditingGarage] = useState<any>(null);
    const [isCreating, setIsCreating] = useState(false);
    const [editForm, setEditForm] = useState({
        name: "",
        address: "",
        city: "",
        country: "",
        description: "",
        phone: "",
        email: "",
        website: "",
        image: "",
        services: "",
        brands: "",
        openingHours: "",
        latitude: "",
        longitude: "",
        isPartner: false,
        verified: false,
    });
    const { country: selectedCountry, setCountry: setSelectedCountry } = useCountryFilter("");
    const [search, setSearch] = useState("");
    const [error, setError] = useState<string | null>(null);
    const { showToast } = useToast();
    const [actionLoading, setActionLoading] = useState(false);

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
            const res = await fetchGarages(page, 10, search, selectedCountry);
            const data = Array.isArray(res) ? res : (res.data || []);
            const meta = !Array.isArray(res) && res.meta ? res.meta : { totalPages: 1, total: data.length };

            setGarages(data);
            setTotalPages(meta.totalPages || 1);
            setTotalGarages(meta.total || data.length);
        } catch (error) {
            console.error("Failed to load garages:", error);
            setGarages([]);
            setError("Unable to load garages. Please retry.");
        }
        setLoading(false);
    };

    const handleDelete = async (id: string, name: string) => {
        if (!confirm(`Are you sure you want to delete ${name}? This action cannot be undone.`)) return;
        setActionLoading(true);
        const success = await deleteGarage(id);
        if (success) {
            showToast({ title: "Garage deleted", variant: 'success' });
            loadData();
        } else {
            showToast({ title: "Failed to delete garage", variant: 'error' });
        }
        setActionLoading(false);
    };

    const startEdit = (garage: any) => {
        setEditingGarage(garage);
        setIsCreating(false);
        setEditForm({
            name: garage.name || "",
            address: garage.address || "",
            city: garage.city || "",
            country: garage.country || "",
            description: garage.description || "",
            phone: garage.phone || "",
            email: garage.email || "",
            website: garage.website || "",
            image: garage.image || "",
            services: garage.services?.join(", ") || "",
            brands: garage.brands?.join(", ") || "",
            openingHours: garage.openingHours || "",
            latitude: garage.coordinates?.latitude || "",
            longitude: garage.coordinates?.longitude || "",
            isPartner: garage.isPartner || false,
            verified: garage.verified || false,
        });
    };

    const startCreate = () => {
        setEditingGarage({});
        setIsCreating(true);
        setEditForm({
            name: "", address: "", city: "", country: "", description: "",
            phone: "", email: "", website: "", image: "",
            services: "", brands: "", openingHours: "",
            latitude: "", longitude: "",
            isPartner: false, verified: false
        });
    };

    const saveEdit = async () => {
        const servicesArray = editForm.services.split(",").map(s => s.trim()).filter(Boolean);
        const brandsArray = editForm.brands.split(",").map(s => s.trim()).filter(Boolean);

        const data: any = {
            ...editForm,
            services: servicesArray,
            brands: brandsArray,
            coordinates: {
                latitude: parseFloat(editForm.latitude) || 0,
                longitude: parseFloat(editForm.longitude) || 0
            }
        };

        // Remove flat lat/lon to match schema structure
        delete data.latitude;
        delete data.longitude;

        setActionLoading(true);
        if (isCreating) {
            const success = await createGarage(data);
            if (success) {
                showToast({ title: "Garage created", variant: 'success' });
                setEditingGarage(null);
                setIsCreating(false);
                loadData();
            } else {
                showToast({ title: "Failed to create garage", variant: 'error' });
            }
        } else {
            if (!editingGarage) return;
            const success = await updateGarage(editingGarage._id || editingGarage.id, data);
            if (success) {
                showToast({ title: "Garage updated", variant: 'success' });
                setEditingGarage(null);
                loadData();
            } else {
                showToast({ title: "Failed to update garage", variant: 'error' });
            }
        }
        setActionLoading(false);
    };

    return (
        <div className="p-8 space-y-8 relative">
            <header className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Garages</h1>
                    <p className="text-slate-500">Manage partner garages and service centers.</p>
                </div>
                <div className="flex gap-4">
                    <CountrySelector selectedCountry={selectedCountry} onChange={(c) => { setSelectedCountry(c); setPage(1); }} />
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search garages..."
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setPage(1);
                            }}
                            className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400/50 w-64"
                        />
                        <svg className="w-5 h-5 text-slate-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    </div>
                    <Button onClick={startCreate}>Add New Garage</Button>
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
                                    <div className="flex justify-end gap-3">
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
                                            disabled={actionLoading}
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

            {/* Simple Edit/Create Modal Overlay */}
            {(editingGarage || isCreating) && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl p-6 space-y-4">
                        <h2 className="text-xl font-bold">{isCreating ? "Add New Garage" : "Edit Garage"}</h2>
                        <div className="grid grid-cols-2 gap-4 max-h-[70vh] overflow-y-auto">
                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-slate-700 mb-1">Garage Name *</label>
                                <input
                                    value={editForm.name}
                                    onChange={e => setEditForm({ ...editForm, name: e.target.value })}
                                    className="w-full px-3 py-2 border rounded-lg"
                                    placeholder="e.g. Auto Fix Dakar"
                                />
                            </div>

                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                                <textarea
                                    value={editForm.description}
                                    onChange={e => setEditForm({ ...editForm, description: e.target.value })}
                                    className="w-full px-3 py-2 border rounded-lg h-20"
                                    placeholder="Brief description of the garage..."
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Address *</label>
                                <input
                                    value={editForm.address}
                                    onChange={e => setEditForm({ ...editForm, address: e.target.value })}
                                    className="w-full px-3 py-2 border rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">City</label>
                                <input
                                    value={editForm.city}
                                    onChange={e => setEditForm({ ...editForm, city: e.target.value })}
                                    className="w-full px-3 py-2 border rounded-lg"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Country Code (e.g. SN) *</label>
                                <input
                                    value={editForm.country}
                                    onChange={e => setEditForm({ ...editForm, country: e.target.value.toUpperCase() })}
                                    maxLength={2}
                                    className="w-full px-3 py-2 border rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
                                <input
                                    value={editForm.phone}
                                    onChange={e => setEditForm({ ...editForm, phone: e.target.value })}
                                    className="w-full px-3 py-2 border rounded-lg"
                                />
                            </div>

                            <div className="col-span-2 grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Latitude *</label>
                                    <input
                                        type="number"
                                        step="any"
                                        value={editForm.latitude}
                                        onChange={e => setEditForm({ ...editForm, latitude: e.target.value })}
                                        className="w-full px-3 py-2 border rounded-lg"
                                        placeholder="14.7167"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Longitude *</label>
                                    <input
                                        type="number"
                                        step="any"
                                        value={editForm.longitude}
                                        onChange={e => setEditForm({ ...editForm, longitude: e.target.value })}
                                        className="w-full px-3 py-2 border rounded-lg"
                                        placeholder="-17.4677"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                                <input
                                    value={editForm.email}
                                    onChange={e => setEditForm({ ...editForm, email: e.target.value })}
                                    className="w-full px-3 py-2 border rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Website</label>
                                <input
                                    value={editForm.website}
                                    onChange={e => setEditForm({ ...editForm, website: e.target.value })}
                                    className="w-full px-3 py-2 border rounded-lg"
                                    placeholder="https://..."
                                />
                            </div>

                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-slate-700 mb-1">Image URL</label>
                                <input
                                    value={editForm.image}
                                    onChange={e => setEditForm({ ...editForm, image: e.target.value })}
                                    className="w-full px-3 py-2 border rounded-lg"
                                    placeholder="https://..."
                                />
                            </div>

                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-slate-700 mb-1">Services (comma separated)</label>
                                <input
                                    value={editForm.services}
                                    onChange={e => setEditForm({ ...editForm, services: e.target.value })}
                                    className="w-full px-3 py-2 border rounded-lg"
                                    placeholder="Repairs, Tires, Oil Change"
                                />
                            </div>

                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-slate-700 mb-1">Brands (comma separated)</label>
                                <input
                                    value={editForm.brands}
                                    onChange={e => setEditForm({ ...editForm, brands: e.target.value })}
                                    className="w-full px-3 py-2 border rounded-lg"
                                    placeholder="Yamaha, Honda, BMW"
                                />
                            </div>

                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-slate-700 mb-1">Opening Hours</label>
                                <input
                                    value={editForm.openingHours}
                                    onChange={e => setEditForm({ ...editForm, openingHours: e.target.value })}
                                    className="w-full px-3 py-2 border rounded-lg"
                                    placeholder="Mon-Fri: 9am - 6pm"
                                />
                            </div>

                            <div className="col-span-2 flex gap-6 pt-2">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={editForm.isPartner}
                                        onChange={e => setEditForm({ ...editForm, isPartner: e.target.checked })}
                                        className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    />
                                    <span className="text-sm font-medium text-slate-700">Is Partner</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={editForm.verified}
                                        onChange={e => setEditForm({ ...editForm, verified: e.target.checked })}
                                        className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    />
                                    <span className="text-sm font-medium text-slate-700">Verified</span>
                                </label>
                            </div>
                        </div>
                        <div className="flex justify-end gap-3 pt-4">
                            <Button variant="outline" onClick={() => { setEditingGarage(null); setIsCreating(false); }}>Cancel</Button>
                            <Button onClick={saveEdit}>{isCreating ? "Create Garage" : "Save Changes"}</Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
