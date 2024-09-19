import {supabase} from '~/utils/supabase';

export default defineEventHandler(async (event) => {
    const {short_id} = event.context.params as { short_id: string };

    if (!short_id) {
        return {error: 'Missing short_id'};
    }

    const {data, error} = await supabase
        .from('urls')
        .select('original_url')
        .eq('short_id', short_id)
        .single();

    if (error || !data) {
        return {error: 'URL not found'};
    }

    return {original_url: data.original_url};
});