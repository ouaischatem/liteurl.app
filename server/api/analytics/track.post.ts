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
    const parser = new UAParser(userAgentString);
    const os = parser.getOS().name || 'Unknown OS';
    const browser = parser.getBrowser().name || 'Unknown Browser';

    const { error: insertError } = await supabase
        .from('analytics')
        .insert([
            { short_id, os, browser }
        ]);

    if (insertError) {
        return { error: insertError.message };
    }
    return { message: 'Click data recorded successfully' };
});