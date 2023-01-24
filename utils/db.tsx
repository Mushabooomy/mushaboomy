import { SupabaseClient, Session } from '@supabase/supabase-js'
import { SetStateAction } from 'react'

export async function handleCreate(
  supabase: SupabaseClient,
  mushroom: Mushroom
) {
  try {
    const { error } = await supabase.from('mushroom').insert(mushroom).single()
    if (error) throw error
    alert('Mushroom record created!')
  } catch (error) {
    alert('Error creating mushroom record')
    console.log(error)
  }
}

export async function handleUpdate(
  supabase: SupabaseClient,
  session: Session | null,
  mushroom: Mushroom,
  deleteImageArray: string[]
) {
  console.log({ mushroom })
  try {
    //Update db record
    const { error } = await supabase
      .from('mushroom')
      .update(mushroom)
      .eq('id', mushroom.id)
    //Delete selected image files
    if (deleteImageArray.length > 0) {
      const { error } = await supabase.storage
        .from('mushroom-photos')
        .remove(deleteImageArray)
      if (error) throw error
    }
    if (error) throw error
    alert('Mushroom record updated!')
  } catch (error) {
    alert('Error updating mushroom record')
    console.log(error)
  }
}

export async function handleGetAll(
  supabase: SupabaseClient,
  session: Session | null,
  setMushrooms?: {
    (value: SetStateAction<Mushroom[]>): void
  }
) {
  try {
    const { data, error } = await supabase
      .from('mushroom')
      .select('*')
      .eq('user_id', session?.user.id)
    if (error) throw error
    setMushrooms?.(data)
  } catch (error) {
    alert('Error loading mushroom records.')
    console.log({ error })
  }
}

export async function handleGetOne(supabase: SupabaseClient, id: string) {
  try {
    const { data, error } = await supabase
      .from('mushroom')
      .select('*')
      .eq('id', id)
    if (error) throw error
    return data
  } catch (error) {
    alert('Error loading mushroom record.')
    console.log(error)
  }
}

export async function handleDeleteOne(supabase: SupabaseClient, id?: number) {
  try {
    const { error } = await supabase.from('mushroom').delete().eq('id', id)
    if (error) throw error
    alert('Mushroom record deleted.')
  } catch (error) {
    alert('Error deleting mushroom record.')
    console.log(error)
  }
}

export async function handleDeletePhoto(
  supabase: SupabaseClient,
  photoUrls: string
) {
  try {
    const { error } = await supabase.storage
      .from('mushroom-photos')
      .remove([`/${photoUrls}`])
    if (error) throw error
    alert('Mushroom photo deleted.')
  } catch (error) {
    alert('Error deleting mushroom photo.')
    console.log(error)
  }
}
