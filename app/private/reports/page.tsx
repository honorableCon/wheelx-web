"use client";

import { useEffect, useState } from "react";
import { fetchReports } from "../lib/api";

export default function ReportsPage() {
    const [reports, setReports] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setLoading(true);
        const res = await fetchReports();
        const data = Array.isArray(res) ? res : (res.data || []);
        setReports(data);
        setLoading(false);
    };

    return (
        <div className="p-8">
            <div className="max-w-6xl mx-auto">
                <header className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">Reports</h1>
                        <p className="text-slate-500">Handle user reports and system issues.</p>
                    </div>
                </header>

                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-4 font-semibold text-slate-700">Type</th>
                                <th className="px-6 py-4 font-semibold text-slate-700">Subject</th>
                                <th className="px-6 py-4 font-semibold text-slate-700">Reporter</th>
                                <th className="px-6 py-4 font-semibold text-slate-700">Status</th>
                                <th className="px-6 py-4 font-semibold text-slate-700">Date</th>
                                <th className="px-6 py-4 font-semibold text-slate-700">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {reports.map((report) => (
                                <tr key={report.id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-semibold ${report.type === 'User Report' ? 'bg-red-50 text-red-700' :
                                            report.type === 'Bug Report' ? 'bg-orange-50 text-orange-700' :
                                                'bg-slate-100 text-slate-700'
                                            }`}>
                                            {report.type}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="font-medium text-slate-900">{report.subject}</div>
                                        <div className="text-xs text-slate-500">Target: {report.target}</div>
                                    </td>
                                    <td className="px-6 py-4 text-slate-600">{report.reporter}</td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${report.status === 'Resolved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                            }`}>
                                            <span className={`w-1.5 h-1.5 rounded-full ${report.status === 'Resolved' ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
                                            {report.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-slate-500 text-sm">{report.date}</td>
                                    <td className="px-6 py-4">
                                        <button className="text-slate-900 font-medium text-sm border border-slate-200 rounded px-3 py-1 hover:bg-slate-50">Review</button>
                                    </td>
                                </tr>
                            ))}
                            {!loading && reports.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="text-center py-10 text-muted-foreground">
                                        No reports found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
