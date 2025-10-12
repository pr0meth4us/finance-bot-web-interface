const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function apiFetch(endpoint, options = {}) {
    const url = `${API_URL}${endpoint}`;
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`API error: ${response.status} ${response.statusText}`);
        }
        return response.json();
    } catch (error) {
        console.error(`Failed to fetch from ${url}`, error);
        throw error;
    }
}

export async function fetchDetailedSummary() {
    return apiFetch('/summary/detailed');
}

export async function fetchRecentTransactions(limit = 15) {
    return apiFetch(`/transactions/recent?limit=${limit}`);
}

export async function fetchOpenDebts() {
    return apiFetch('/debts/');
}

export async function fetchDetailedReport(startDate, endDate) {
    const params = new URLSearchParams({
        start_date: startDate.toISOString().split('T')[0],
        end_date: endDate.toISOString().split('T')[0],
    });
    return apiFetch(`/analytics/report/detailed?${params.toString()}`);
}