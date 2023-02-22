


import supabase from '@supabase/supabase-js'
import { useSession } from 'next-auth/react'





const useSupaBase = () => {

    const { data: session } = useSession();
    const supabaseClient = supabase.createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_API!,
        {
            global: {
                headers: {
                    Authorization: `Bearer ${session?.supabaseAccessToken}`,
                },
            },
        })
    const supabaseRoot = supabase.createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SECRET_KEY!)


    return { supabaseClient, supabaseRoot }
}






export { useSupaBase }