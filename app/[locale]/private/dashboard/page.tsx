"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { fetchDashboardStats } from "../lib/api";
import CountrySelector from "../../components/CountrySelector";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

export default function DashboardPage() {
    const t = useTranslations("Admin.dashboard");
    const tc = useTranslations("Admin.common");
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [selectedCountry, setSelectedCountry] = useState<string>("");

    useEffect(() => {
        loadData();
    }, [selectedCountry]);

    const loadData = async () => {
        setLoading(true);
        try {
            const res = await fetchDashboardStats(selectedCountry);
            // Backend can return nested or direct structure
            const data = res?.data || res || {};
            setStats(data);
        } catch (error) {
            console.error('Failed to load dashboard stats:', error);
            setStats({});
        } finally {
            setLoading(false);
        }
    };

    if (loading && !stats) {
        return (
            <div className="p-8 flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto mb-4"></div>
                    <p className="text-slate-500">{t("loading")}</p>
                </div>
            </div>
        );
    }

    if (!loading && !stats) {
        return (
            <div className="p-8 text-center">
                <p className="text-red-600 mb-4">Failed to load dashboard statistics</p>
                <button
                    onClick={loadData}
                    className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
                >
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className="p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                <header className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 md:mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold">{t("title")}</h2>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        <CountrySelector selectedCountry={selectedCountry} onChange={setSelectedCountry} />
                        <div className="hidden sm:block h-6 w-px bg-slate-200"></div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-slate-500">{t("welcome")}</span>
                            <div className="w-8 h-8 bg-yellow-500 rounded-full"></div>
                        </div>
                    </div>
                </header>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
                    <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-slate-200">
                        <h3 className="text-sm font-medium text-slate-500 mb-2">{t("totalUsers")}</h3>
                        <p className="text-2xl md:text-3xl font-bold">{stats?.totalUsers?.value || 0}</p>
                        <span className={`text-xs font-medium ${stats?.totalUsers?.trend === 'up' ? 'text-green-600' : 'text-slate-400'}`}>
                            {stats?.totalUsers?.change} {stats?.totalUsers?.label}
                        </span>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                        <h3 className="text-sm font-medium text-slate-500 mb-2">{t("activeRides")}</h3>
                        <p className="text-3xl font-bold">{stats?.activeRides?.value || 0}</p>
                        <span className="text-xs text-slate-400 font-medium">{stats?.activeRides?.label}</span>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                        <h3 className="text-sm font-medium text-slate-500 mb-2">{t("pendingReports")}</h3>
                        <p className="text-3xl font-bold">{stats?.pendingReports?.value || 0}</p>
                        <span className="text-xs text-yellow-600 font-medium">{stats?.pendingReports?.label}</span>
                    </div>
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                        <h3 className="font-bold text-lg mb-4">{t("userGrowth")}</h3>
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={stats?.charts?.userGrowth || []}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748B' }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748B' }} />
                                    <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                    <Line type="monotone" dataKey="users" stroke="#3b82f6" strokeWidth={3} dot={{ stroke: '#3b82f6', strokeWidth: 2, r: 4, fill: '#fff' }} activeDot={{ r: 6 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                        <h3 className="font-bold text-lg mb-4">{t("weeklyActivity")}</h3>
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={stats?.charts?.rideActivity || []}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748B' }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748B' }} />
                                    <Tooltip cursor={{ fill: '#F1F5F9' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                    <Bar dataKey="rides" fill="#F59E0B" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="p-6 border-b border-slate-100">
                        <h3 className="font-bold text-lg">{t("recentActivity")}</h3>
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
                                {stats?.recentActivity?.map((activity: any, i: number) => (
                                    <tr key={i} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4 font-medium">{activity.user}</td>
                                        <td className="px-6 py-4">{activity.action}</td>
                                        <td className="px-6 py-4 text-slate-500">{activity.time}</td>
                                        <td className="px-6 py-4 text-right">
                                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${activity.status === 'Alert' ? 'bg-red-100 text-red-700' :
                                                    activity.status === 'New' ? 'bg-green-100 text-green-700' :
                                                        'bg-blue-100 text-blue-700'
                                                }`}>
                                                {activity.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                                {(!stats?.recentActivity || stats.recentActivity.length === 0) && (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-8 text-center text-slate-400">{tc("noData")}</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
