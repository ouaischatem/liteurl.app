import { supabase } from '~/utils/supabase';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const { original_url } = body;

    if (!original_url) {
        return { error: 'Missing URL' };
    }

    const { data: existingUrlData, error: existingUrlError } = await supabase
        .from('urls')
        .select('short_id')
        .eq('original_url', original_url)
        .single();

    if (existingUrlError && existingUrlError.code !== 'PGRST116') {
        return { error: existingUrlError.message };
    }

    if (existingUrlData) {
        return { message: 'URL already exists', data: { short_id: existingUrlData.short_id } };
    }

    const { data: idData, error: idError } = await supabase
        .rpc('generate_short_id', { length: 6 });

    if (idError || !idData) {
        return { error: 'Error generating short ID' };
    }

    const short_id = idData;

    const { data: existingIdData, error: checkIdError } = await supabase
        .from('urls')
        .select('id')
        .eq('short_id', short_id)
        .single();

    if (checkIdError && checkIdError.code !== 'PGRST116') {
        return { error: checkIdError.message };
    }

    if (existingIdData) {
        return { error: 'Generated short ID already exists' };
    }

    const { data, error: insertError } = await supabase
        .from('urls')
        .insert([{ original_url, short_id }]);

    if (insertError) {
        return { error: insertError.message };
    }

    return { message: 'URL successfully shortened', data: { short_id } };
});