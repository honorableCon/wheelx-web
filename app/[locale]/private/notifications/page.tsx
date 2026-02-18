"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { sendBroadcastNotification, sendCountryBroadcastNotification } from "../lib/api";
import { countryNameToCode } from "../lib/useCountryFilter";

export default function NotificationsPage() {
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");
    const [selectedCountry, setSelectedCountry] = useState("");
    const [sending, setSending] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

    // Generate country options from the map, sorted alphabetically
    const countryOptions = Object.entries(countryNameToCode).map(([name, code]) => ({
        name: name.charAt(0).toUpperCase() + name.slice(1),
        code
    })).sort((a, b) => a.name.localeCompare(b.name));

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !message) return;

        setSending(true);
        setStatus('idle');

        let success = false;
        if (selectedCountry) {
            success = await sendCountryBroadcastNotification(selectedCountry, title, message);
        } else {
            success = await sendBroadcastNotification(title, message);
        }

        if (success) {
            setStatus('success');
            setTitle("");
            setMessage("");
            setSelectedCountry(""); // Reset country selection
            setTimeout(() => setStatus('idle'), 3000);
        } else {
            setStatus('error');
        }
        setSending(false);
    };

    return (
        <div className="p-8 max-w-4xl mx-auto space-y-8">
            <header>
                <h1 className="text-3xl font-bold text-slate-900">Notifications Center</h1>
                <p className="text-slate-500">Broadcast updates, tips, and alerts to all users.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Compose Form */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <h2 className="font-semibold text-lg mb-4">Compose Broadcast</h2>
                    <form onSubmit={handleSend} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Target Audience</label>
                            <select
                                value={selectedCountry}
                                onChange={e => setSelectedCountry(e.target.value)}
                                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400/50 bg-white"
                            >
                                <option value="">All Users (Global)</option>
                                {countryOptions.map((country) => (
                                    <option key={country.code} value={country.code}>
                                        {country.name} ({country.code})
                                    </option>
                                ))}
                            </select>
                            <p className="text-xs text-slate-500 mt-1">
                                {selectedCountry
                                    ? `Sending to users in ${countryOptions.find(c => c.code === selectedCountry)?.name}`
                                    : "Sending to everyone regardless of location"}
                            </p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
                            <input
                                type="text"
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
                                placeholder="e.g. New Update Available!"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Message</label>
                            <textarea
                                value={message}
                                onChange={e => setMessage(e.target.value)}
                                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400/50 h-32"
                                placeholder="Enter your message here..."
                                required
                            />
                        </div>

                        {status === 'success' && (
                            <div className="p-3 bg-green-50 text-green-700 rounded-lg text-sm">
                                Notification broadcast successfully!
                            </div>
                        )}

                        {status === 'error' && (
                            <div className="p-3 bg-red-50 text-red-700 rounded-lg text-sm">
                                Failed to send notification. Please try again.
                            </div>
                        )}

                        <Button type="submit" className="w-full" disabled={sending}>
                            {sending ? 'Sending...' : (selectedCountry ? 'Broadcast to Country' : 'Broadcast to All Users')}
                        </Button>
                    </form>
                </div>

                {/* Preview */}
                <div className="space-y-6">
                    <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                        <h2 className="font-semibold text-sm text-slate-500 uppercase tracking-wide mb-4">Preview</h2>
                        <div className="bg-white w-full max-w-sm mx-auto rounded-2xl shadow-lg overflow-hidden border border-slate-100">
                            <div className="bg-slate-100 p-3 flex items-center gap-2 border-b border-slate-100">
                                <div className="w-6 h-6 bg-yellow-400 rounded-md"></div>
                                <span className="text-xs font-semibold text-slate-600">GASVERSE</span>
                                <span className="text-xs text-slate-400 ml-auto">now</span>
                            </div>
                            <div className="p-4">
                                <h3 className="font-bold text-sm text-slate-900 mb-1">{title || "Notification Title"}</h3>
                                <p className="text-sm text-slate-600">{message || "Your notification message will appear here exactly as users will see it on their devices."}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 text-sm text-blue-800">
                        <p className="font-medium mb-1">💡 Pro Tip</p>
                        <p>Broadcasts take a few minutes to reach all users. Use this for important announcements, app updates, or community alerts.</p>
                        {selectedCountry && (
                            <p className="mt-2 text-blue-900 font-semibold">
                                🌍 Target: {countryOptions.find(c => c.code === selectedCountry)?.name}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
