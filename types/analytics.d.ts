export interface ClickDetail {
    id: string;
    short_id: string;
    os: string;
    browser: string;
    country: string;
    countryCode: string;
    timestamp: string;
}

export interface AnalyticsData {
    original_url: string;
    clicks: number;
    details: ClickDetail[];
}

export interface UsageCount {
    name: string;
    count: number;
    country?: string;
}