const API_URL = process.env.API_URL || "http://localhost:3001/api/v1";

function getAuthHeaders(): Record<string, string> {
    // Helper to get the token from document.cookie
    // Note: This only works in the browser (client-side)
    if (typeof document === 'undefined') return {};

    const match = document.cookie.match(new RegExp('(^| )wheelx_token=([^;]+)'));
    const token = match ? match[2] : null;

    // Resilience: Check if token is the string "undefined"
    if (token === "undefined" || token === "null") {
        return {};
    }

    return token ? { 'Authorization': `Bearer ${token}` } : {};
}

async function handleResponse(res: Response) {
    if (res.status === 401) {
        console.error("Authentication Error: 401 Unauthorized received from:", res.url);
        // Token expired or invalid
        if (typeof window !== 'undefined') {
            // Commenting out redirect for debugging to see the error in console
            // window.location.href = '/auth/login';
        }
        throw new Error('Unauthorized');
    }
    if (!res.ok) {
        throw new Error(`API Error: ${res.statusText}`);
    }
    const json = await res.json();
    return json.data && json.data.data ? json.data : json.data ? json.data : json;
}

export async function fetchRides(page = 1, limit = 10, search = "") {
    try {
        const query = `page=${page}&limit=${limit}${search ? `&search=${encodeURIComponent(search)}` : ''}`;
        const res = await fetch(`${API_URL}/rides/all?${query}`, {
            headers: { ...getAuthHeaders() }
        });
        return await handleResponse(res);
    } catch (error) {
        console.error("Failed to fetch rides", error);
        return { data: [], meta: { total: 0 } };
    }
}

export async function fetchGarages(page = 1, limit = 10) {
    try {
        const res = await fetch(`${API_URL}/garages?page=${page}&limit=${limit}`, {
            headers: { ...getAuthHeaders() }
        });
        return await handleResponse(res);
    } catch (error) {
        // Fallback to empty if endpoint doesn't support pagination or fails
        console.error("Failed to fetch garages", error);
        return { data: [], meta: { total: 0 } };
    }
}

export async function fetchUsers(page = 1, limit = 10, search = "") {
    try {
        const query = `page=${page}&limit=${limit}${search ? `&search=${encodeURIComponent(search)}` : ''}`;
        const res = await fetch(`${API_URL}/users?${query}`, {
            headers: { ...getAuthHeaders() }
        });
        return await handleResponse(res);
    } catch (error) {
        console.error("Failed to fetch users", error);
        return { data: [], meta: { total: 0 } };
    }
}

export async function fetchGroups(page = 1, limit = 10, search = "") {
    try {
        const query = `page=${page}&limit=${limit}${search ? `&search=${encodeURIComponent(search)}` : ''}`;
        const res = await fetch(`${API_URL}/groups?${query}`, {
            headers: { ...getAuthHeaders() }
        });
        return await handleResponse(res);
    } catch (error) {
        console.error("Failed to fetch groups", error);
        return { data: [], meta: { total: 0 } };
    }
}

export async function fetchPosts(page = 1, limit = 10, search = "") {
    try {
        const query = `page=${page}&limit=${limit}${search ? `&search=${encodeURIComponent(search)}` : ''}`;
        const res = await fetch(`${API_URL}/posts?${query}`, {
            headers: { ...getAuthHeaders() }
        });
        return await handleResponse(res);
    } catch (error) {
        console.error("Failed to fetch posts", error);
        return { data: [], meta: { total: 0 } };
    }
}

export async function fetchEvents(page = 1, limit = 10, search = "") {
    try {
        const query = `page=${page}&limit=${limit}${search ? `&search=${encodeURIComponent(search)}` : ''}`;
        const res = await fetch(`${API_URL}/events?${query}`, {
            headers: { ...getAuthHeaders() }
        });
        return await handleResponse(res);
    } catch (error) {
        console.error("Failed to fetch events", error);
        return { data: [], meta: { total: 0 } };
    }
}

export async function fetchReports(page = 1, limit = 10) {
    try {
        const res = await fetch(`${API_URL}/reports?page=${page}&limit=${limit}`, {
            headers: { ...getAuthHeaders() }
        });
        return await handleResponse(res);
    } catch (error) {
        console.error("Failed to fetch reports", error);
        return { data: [], meta: { total: 0 } };
    }
}

export async function fetchDashboardStats() {
    try {
        const res = await fetch(`${API_URL}/admin/stats`, {
            headers: { ...getAuthHeaders() }
        });
        return await handleResponse(res);
    } catch (error) {
        console.error("Failed to fetch dashboard stats", error);
        return null;
    }
}

export async function fetchActiveRides() {
    try {
        const res = await fetch(`${API_URL}/active-rides/all/active`, {
            headers: { ...getAuthHeaders() }
        });
        return await handleResponse(res);
    } catch (error) {
        console.error("Failed to fetch active rides", error);
        return [];
    }
}

export async function stopActiveRide(id: string) {
    try {
        const res = await fetch(`${API_URL}/active-rides/${id}/stop`, {
            method: 'POST',
            headers: { ...getAuthHeaders() }
        });
        return res.ok;
    } catch (error) {
        console.error("Failed to stop ride", error);
        return false;
    }
}

export async function sendBroadcastNotification(title: string, message: string) {
    try {
        const res = await fetch(`${API_URL}/notifications/broadcast`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...getAuthHeaders()
            },
            body: JSON.stringify({ title, message })
        });
        return res.ok;
    } catch (error) {
        console.error("Failed to broadcast notification", error);
        return false;
    }
}

// Admin Actions
export async function banUser(id: string) {
    try {
        const res = await fetch(`${API_URL}/users/${id}/ban`, {
            method: 'PATCH',
            headers: { ...getAuthHeaders() }
        });
        return res.ok;
    } catch (e) {
        console.error("Failed to ban user", e);
        return false;
    }
}

export async function unbanUser(id: string) {
    try {
        const res = await fetch(`${API_URL}/users/${id}/unban`, {
            method: 'PATCH',
            headers: { ...getAuthHeaders() }
        });
        return res.ok;
    } catch (e) {
        console.error("Failed to unban user", e);
        return false;
    }
}

export async function deleteGarage(id: string) {
    try {
        const res = await fetch(`${API_URL}/garages/${id}/delete`, {
            method: 'POST',
            headers: { ...getAuthHeaders() }
        });
        return res.ok;
    } catch (e) {
        console.error("Failed to delete garage", e);
        return false;
    }
}

export async function updateGarage(id: string, data: any) {
    try {
        const res = await fetch(`${API_URL}/garages/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...getAuthHeaders()
            },
            body: JSON.stringify(data)
        });
        return res.ok;
    } catch (e) {
        console.error("Failed to update garage", e);
        return false;
    }
}
