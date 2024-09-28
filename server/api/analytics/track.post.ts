import { supabase } from '~/utils/supabase';
//@ts-ignore
import UAParser from 'ua-parser-js';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const { short_id } = body;

    if (!short_id) {
        return { error: 'short_id is required' };
    }

    const userAgentString = event.node.req.headers['user-agent'] || '';
    const ipHeader = event.node.req.headers['x-forwarded-for'];
    const ip = Array.isArray(ipHeader) ? ipHeader[0] : ipHeader || event.node.req.socket.remoteAddress;

    const parser = new UAParser(userAgentString);
    const os = parser.getOS().name || 'Unknown';
    const browser = parser.getBrowser().name || 'Unknown';
    const { country, country_code } = await fetchGeoData(ip);

    const { error: insertError } = await supabase
        .from('analytics')
        .insert([
            {
                short_id: short_id,
                os: os,
                browser: browser,
                country: country,
                country_code: country_code
            }
        ]);

    if (insertError) {
        return { error: insertError.message };
    }
    return { message: 'Click data recorded successfully' };
});

async function fetchGeoData(ip: string | undefined) {
    const geoData: any = await $fetch(`http://ip-api.com/json/${ip}?fields=country,countryCode`);
    return {
        country: geoData.country || 'Unknown',
        country_code: geoData.country_code || 'Unknown',
    };
}