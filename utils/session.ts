import { SupabaseClient } from '@supabase/auth-helpers-react'

export async function handleSignout(supabase: SupabaseClient) {
  console.log(supabase)
  try {
    const { error } = await supabase.auth.signOut()

    if (error) {
      throw new Error(error.message)
    }
  } catch (error) {
    console.log(error)
  }
}
