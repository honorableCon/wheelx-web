"use client";

import { useEffect, useState } from "react";
import { fetchDashboardStats } from "../lib/api";

export default function DashboardPage() {
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setLoading(true);
        const res = await fetchDashboardStats();
        // Backend returns stats object directly
        setStats(res?.data || res || {});
        setLoading(false);
    };

    if (loading) {
        return <div className="p-8">Loading dashboard...</div>;
    }

    return (
        <div className="p-8">
            <div className="max-w-6xl mx-auto">
                <header className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold">Dashboard Overview</h2>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-slate-500">Welcome, Admin</span>
                        <div className="w-8 h-8 bg-yellow-500 rounded-full"></div>
                    </div>
                </header>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                        <h3 className="text-sm font-medium text-slate-500 mb-2">Total Users</h3>
                        <p className="text-3xl font-bold">{stats?.totalUsers?.value || 0}</p>
                        <span className={`text-xs font-medium ${stats?.totalUsers?.trend === 'up' ? 'text-green-600' : 'text-slate-400'}`}>
                            {stats?.totalUsers?.change} {stats?.totalUsers?.label}
                        </span>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                        <h3 className="text-sm font-medium text-slate-500 mb-2">Active Rides</h3>
                        <p className="text-3xl font-bold">{stats?.activeRides?.value || 0}</p>
                        <span className="text-xs text-slate-400 font-medium">{stats?.activeRides?.label}</span>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                        <h3 className="text-sm font-medium text-slate-500 mb-2">Pending Reports</h3>
                        <p className="text-3xl font-bold">{stats?.pendingReports?.value || 0}</p>
                        <span className="text-xs text-yellow-600 font-medium">{stats?.pendingReports?.label}</span>
                    </div>
                </div>

                {/* Placeholder Content */}
                {/* Recent Activity */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="p-6 border-b border-slate-100">
                        <h3 className="font-bold text-lg">Recent Community Activity</h3>
                    </div>
                    <div className="p-0">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-slate-50 text-slate-500">
                                <tr>
                                    <th className="px-6 py-3 font-medium">User</th>
                                    <th className="px-6 py-3 font-medium">Action</th>
                                    <th className="px-6 py-3 font-medium">Time</th>
                                    <th className="px-6 py-3 font-medium text-right">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                <tr className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4 font-medium">Baye Dame</td>
                                    <td className="px-6 py-4">Created a new ride "Corniche Run"</td>
                                    <td className="px-6 py-4 text-slate-500">2 mins ago</td>
                                    <td className="px-6 py-4 text-right"><span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">New</span></td>
                                </tr>
                                <tr className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4 font-medium">Fatou Ndiaye</td>
                                    <td className="px-6 py-4">Joined group "Dakar Riders"</td>
                                    <td className="px-6 py-4 text-slate-500">15 mins ago</td>
                                    <td className="px-6 py-4 text-right"><span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">Member</span></td>
                                </tr>
                                <tr className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4 font-medium">System</td>
                                    <td className="px-6 py-4 text-red-500">Flagged post for inappropriate content</td>
                                    <td className="px-6 py-4 text-slate-500">1 hour ago</td>
                                    <td className="px-6 py-4 text-right"><span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">Alert</span></td>
                                </tr>
                                <tr className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4 font-medium">Amadou Fall</td>
                                    <td className="px-6 py-4">Registered as a new user</td>
                                    <td className="px-6 py-4 text-slate-500">2 hours ago</td>
                                    <td className="px-6 py-4 text-right"><span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">Verified</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
