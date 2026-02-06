const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api/v1";

function getAuthHeaders(): Record<string, string> {
    // Client-only: read admin token first, then user token
    if (typeof document === 'undefined') return {};

    const cookieValue = (name: string) => {
        const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
        return match ? match[2] : null;
    };

    const adminToken = cookieValue('wheelx_admin_token');
    const userToken = cookieValue('wheelx_token');

    // Priority: userToken (actual JWT) > adminToken (if it's not the string 'active')
    const token = userToken || (adminToken !== 'active' ? adminToken : null);

    if (!token || token === 'undefined' || token === 'null') {
        return {};
    }

    return { Authorization: `Bearer ${token}` };
}

function buildHeaders(country?: string): Record<string, string> {
    const headers: Record<string, string> = {
        ...getAuthHeaders(),
    };

    if (country) headers['x-country'] = country.toUpperCase();
    // Lightweight request id for correlation; falls back if crypto not available
    if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
        headers['x-request-id'] = (crypto as any).randomUUID();
    } else {
        headers['x-request-id'] = `req_${Date.now()}_${Math.random().toString(16).slice(2)}`;
    }

    return headers;
}

function handleUnauthorized() {
    if (typeof document !== 'undefined') {
        document.cookie = 'wheelx_admin_token=; path=/; max-age=0';
        document.cookie = 'wheelx_token=; path=/; max-age=0';
    }
    if (typeof window !== 'undefined') {
        // Get locale from pathname if present
        const segments = window.location.pathname.split('/');
        // Assuming locales are like /en/, /fr/, etc.
        const possibleLocale = segments[1];
        const isLocale = ['en', 'fr', 'es', 'it'].includes(possibleLocale);
        const localePrefix = isLocale ? `/${possibleLocale}` : '';

        // Strip locale prefix from redirect path for compatibility with the localized router
        const redirectPath = isLocale
            ? '/' + segments.slice(2).join('/')
            : window.location.pathname;
        const fullRedirect = (redirectPath === '' ? '/' : (redirectPath.startsWith('/') ? redirectPath : '/' + redirectPath)) + window.location.search;

        window.location.href = `${localePrefix}/auth/login?redirect=${encodeURIComponent(fullRedirect)}`;
    }
}

async function handleResponse(res: Response) {
    if (res.status === 401) {
        console.error("Authentication Error: 401 Unauthorized received from:", res.url);
        handleUnauthorized();
        throw new Error('Unauthorized');
    }
    if (!res.ok) {
        const errorText = await res.text().catch(() => res.statusText);
        console.error(`API Error [${res.status}]:`, errorText);
        throw new Error(`API Error: ${res.statusText}`);
    }
    
    const contentType = res.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Invalid response type');
    }
    
    const json = await res.json();
    // Handle nested data structures: { data: { data: [...] } } or { data: [...] } or direct array
    if (json.data !== undefined) {
        return json.data.data !== undefined ? json.data : json.data;
    }
    return json;
}

export async function fetchRides(page = 1, limit = 10, search = "", country = "") {
    try {
        const query = `page=${page}&limit=${limit}${search ? `&search=${encodeURIComponent(search)}` : ''}${country ? `&country=${country}` : ''}`;
        const res = await fetch(`${API_URL}/rides/all?${query}`, {
            headers: buildHeaders(country),
        });
        return await handleResponse(res);
    } catch (error) {
        console.error("Failed to fetch rides", error);
        return { data: [], meta: { total: 0 } };
    }
}

export async function fetchGarages(page = 1, limit = 10, search = "", country = "") {
    try {
        const query = `page=${page}&limit=${limit}${search ? `&search=${encodeURIComponent(search)}` : ''}${country ? `&country=${country}` : ''}`;
        const res = await fetch(`${API_URL}/garages?${query}`, {
            headers: buildHeaders(country),
        });
        return await handleResponse(res);
    } catch (error) {
        // Fallback to empty if endpoint doesn't support pagination or fails
        console.error("Failed to fetch garages", error);
        return { data: [], meta: { total: 0 } };
    }
}

export async function fetchUsers(page = 1, limit = 10, search = "", country = "") {
    try {
        const query = `page=${page}&limit=${limit}${search ? `&search=${encodeURIComponent(search)}` : ''}${country ? `&country=${country}` : ''}`;
        const res = await fetch(`${API_URL}/users?${query}`, {
            headers: buildHeaders(country),
        });
        return await handleResponse(res);
    } catch (error) {
        console.error("Failed to fetch users", error);
        return { data: [], meta: { total: 0 } };
    }
}

export async function fetchGroups(page = 1, limit = 10, search = "", country = "") {
    try {
        const query = `page=${page}&limit=${limit}${search ? `&search=${encodeURIComponent(search)}` : ''}${country ? `&country=${country}` : ''}`;
        const res = await fetch(`${API_URL}/groups?${query}`, {
            headers: buildHeaders(country),
        });
        return await handleResponse(res);
    } catch (error) {
        console.error("Failed to fetch groups", error);
        return { data: [], meta: { total: 0 } };
    }
}

export async function fetchPosts(page = 1, limit = 10, search = "", country = "") {
    try {
        const query = `page=${page}&limit=${limit}${search ? `&search=${encodeURIComponent(search)}` : ''}${country ? `&country=${country}` : ''}`;
        const res = await fetch(`${API_URL}/posts?${query}`, {
            headers: buildHeaders(country),
        });
        return await handleResponse(res);
    } catch (error) {
        console.error("Failed to fetch posts", error);
        return { data: [], meta: { total: 0 } };
    }
}

export async function deletePost(id: string) {
    try {
        const res = await fetch(`${API_URL}/posts/${id}`, {
            method: 'DELETE',
            headers: buildHeaders(),
        });
        return res.ok;
    } catch (error) {
        console.error("Failed to delete post", error);
        return false;
    }
}

export async function fetchEvents(page = 1, limit = 10, search = "", country = "") {
    try {
        const query = `page=${page}&limit=${limit}${search ? `&search=${encodeURIComponent(search)}` : ''}${country ? `&country=${country}` : ''}`;
        const res = await fetch(`${API_URL}/events?${query}`, {
            headers: buildHeaders(country),
        });
        return await handleResponse(res);
    } catch (error) {
        console.error("Failed to fetch events", error);
        return { data: [], meta: { total: 0 } };
    }
}

export async function deleteEvent(id: string) {
    try {
        const res = await fetch(`${API_URL}/events/${id}`, {
            method: 'DELETE',
            headers: buildHeaders(),
        });
        return res.ok;
    } catch (error) {
        console.error("Failed to delete event", error);
        return false;
    }
}

export async function fetchReports(page = 1, limit = 10, country = "") {
    try {
        const query = `page=${page}&limit=${limit}${country ? `&country=${country}` : ''}`;
        const res = await fetch(`${API_URL}/reports?${query}`, {
            headers: buildHeaders(country),
        });
        return await handleResponse(res);
    } catch (error) {
        console.error("Failed to fetch reports", error);
        return { data: [], meta: { total: 0 } };
    }
}

export async function fetchDashboardStats(country = "") {
    try {
        const query = country ? `?country=${country}` : '';
        const res = await fetch(`${API_URL}/admin/stats${query}`, {
            headers: buildHeaders(country),
        });
        return await handleResponse(res);
    } catch (error) {
        console.error("Failed to fetch dashboard stats", error);
        return null;
    }
}

export async function fetchActiveRides(country = "") {
    try {
        const query = country ? `?country=${country}` : '';
        const res = await fetch(`${API_URL}/active-rides/all/active${query}`, {
            headers: buildHeaders(country),
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
            headers: buildHeaders(),
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
                ...buildHeaders(),
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
            headers: buildHeaders(),
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
            headers: buildHeaders(),
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
            headers: buildHeaders(),
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
                ...buildHeaders(),
            },
            body: JSON.stringify(data)
        });
        return res.ok;
    } catch (e) {
        console.error("Failed to update garage", e);
        return false;
    }
}

export async function createGarage(data: any) {
    try {
        const res = await fetch(`${API_URL}/garages`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...buildHeaders(),
            },
            body: JSON.stringify(data)
        });
        return res.ok;
    } catch (e) {
        console.error("Failed to create garage", e);
        return false;
    }
}

export async function fetchCountries() {
    try {
        const res = await fetch(`${API_URL}/countries`, {
            headers: buildHeaders(),
        });
        return await handleResponse(res);
    } catch (e) {
        console.error("Failed to fetch countries", e);
        return [];
    }
}

export async function fetchCurrentUser() {
    try {
        const res = await fetch(`${API_URL}/users/me`, {
            headers: buildHeaders(),
        });
        return await handleResponse(res);
    } catch (e) {
        console.error("Failed to fetch current user", e);
        return null;
    }
}

export async function fetchRoutes(page = 1, limit = 10, search = "", country = "") {
    try {
        const query = `page=${page}&limit=${limit}${search ? `&search=${encodeURIComponent(search)}` : ''}${country ? `&country=${country}` : ''}`;
        const res = await fetch(`${API_URL}/routes?${query}`, {
            headers: buildHeaders(country),
        });
        return await handleResponse(res);
    } catch (error) {
        console.error("Failed to fetch routes", error);
        return { data: [], meta: { total: 0 } };
    }
}

export async function deleteRoute(id: string) {
    try {
        const res = await fetch(`${API_URL}/routes/${id}`, {
            method: 'DELETE',
            headers: buildHeaders(),
        });
        return res.ok;
    } catch (error) {
        console.error("Failed to delete route", error);
        return false;
    }
}
