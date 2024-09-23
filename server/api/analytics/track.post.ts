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
    const ip = event.node.req.headers['x-forwarded-for'] || event.node.req.socket.remoteAddress;

    const parser = new UAParser(userAgentString);
    const os = parser.getOS().name || 'Unknown';
    const browser = parser.getBrowser().name || 'Unknown';

    const geoData = await $fetch(`http://ip-api.com/json/${ip}?fields=country`);
    let country = (geoData as any).country ?? 'Unknown';

    const { error: insertError } = await supabase
        .from('analytics')
        .insert([
            { short_id, os, browser, country }
        ]);

    if (insertError) {
        return { error: insertError.message };
    }
    return { message: 'Click data recorded successfully' };
});