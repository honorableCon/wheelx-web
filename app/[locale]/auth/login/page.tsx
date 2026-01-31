"use client";

import { useState } from "react";
import { useRouter } from "@/navigation";
import { useSearchParams } from "next/navigation";
import { Lock } from "lucide-react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirectTo = searchParams.get("redirect") || "/private/dashboard";

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            console.log("Attempting login to:", process.env.NEXT_PUBLIC_API_URL || "fallback");
            const res = await fetch((process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api/v1") + "/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            if (!res.ok) {
                const errorData = await res.json().catch(() => ({}));
                console.error("Login failed response:", errorData);
                throw new Error("Invalid credentials");
            }

            const json = await res.json();
            console.log("Login success response structure:", Object.keys(json));

            // Backend wraps response in { data: { accessToken: ... }, status: ... }
            const data = json.data || json;
            const token = data.accessToken || data.access_token || data.token;

            document.cookie = `wheelx_admin_token=active; path=/; max-age=86400`; // For middleware
            if (token) {
                console.log("Token found, setting cookie.");
                document.cookie = `wheelx_token=${token}; path=/; max-age=86400`; // For API calls
            } else {
                console.error("No token found in login response! Data keys:", Object.keys(data));
            }

            console.log("Redirecting to:", redirectTo);
            router.push(redirectTo);
        } catch (err) {
            console.error("Login catch block error:", err);
            alert("Login failed. Check your credentials.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-yellow-400 rounded-2xl mx-auto flex items-center justify-center mb-4 shadow-lg shadow-yellow-400/30">
                        <Lock className="text-slate-900 w-8 h-8" />
                    </div>
                    <h1 className="text-2xl font-bold text-slate-900">Admin Access</h1>
                    <p className="text-slate-500 mt-2">Please login to continue to the dashboard.</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 outline-none transition-all"
                            placeholder="admin@wheelx.app"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 outline-none transition-all"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-slate-900 text-white font-bold py-3 rounded-lg hover:bg-slate-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                    >
                        {loading ? "Authenticating..." : "Login to Dashboard"}
                    </button>
                </form>

                <div className="mt-8 text-center text-sm text-slate-400">
                    <p>Protected Area. Authorized Access Only.</p>
                </div>
            </div>
        </div>
    );
}
