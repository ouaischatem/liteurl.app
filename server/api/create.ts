import {supabase} from '~/utils/supabase';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const {original_url} = body;

    if (!original_url) {
        return {error: 'Missing URL'};
    }

    const {data: idData, error: idError} = await supabase
        .rpc('generate_short_id', {length: 6});

    if (idError || !idData) {
        return {error: 'Error generating short ID'};
    }

    let short_id = idData;

    const {data: existingData, error: checkError} = await supabase
        .from('urls')
        .select('id')
        .eq('short_id', short_id)
        .single();

    if (checkError && checkError.code !== 'PGRST116') {
        return {error: checkError.message};
    }

    if (existingData) {
        return {error: 'Short identifier already exists'};
    }

    const {data, error: insertError} = await supabase
        .from('urls')
        .insert([
            {original_url, short_id: short_id}
        ]);

    if (insertError) {
        return {error: insertError.message};
    }

    return {message: 'URL successfully shortened', data: {short_id: short_id}};
});