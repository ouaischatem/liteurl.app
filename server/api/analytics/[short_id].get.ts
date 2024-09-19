import { supabase } from '~/utils/supabase';

export default defineEventHandler(async (event) => {
    const {short_id} = event.context.params as { short_id: string };

    if (!short_id) {
        return {error: 'Missing short_id'};
    }

    const { data: urlData, error: urlError } = await supabase
        .from('urls')
        .select('*')
        .eq('short_id', short_id)
        .single();

    if (urlError || !urlData) {
        return { error: 'URL not found' };
    }

    const { data: clickData, error: clickError } = await supabase
        .from('analytics')
        .select('*')
        .eq('short_id', short_id);

    if (clickError) {
        return { error: clickError.message };
    }

    return {
        original_url: urlData.original_url,
        clicks: clickData.length,
        details: clickData,
    };
});