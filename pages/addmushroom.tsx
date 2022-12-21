/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useState, useRef, ChangeEvent } from 'react'
import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { handleCreate } from '../utils/db'

const AddMushroom = () => {
  const session = useSession()
  const supabase = useSupabaseClient()
  const [loading, setLoading] = useState(true)
  const [scientificName, setScienctificName] = useState('')
  const [commonName, setCommonName] = useState('')
  const [description, setDescription] = useState('')
  const [sporePrint, setSporePrint] = useState('')
  const [edibility, setEdibility] = useState('')
  const [edibilityNotes, setEdibilityNotes] = useState('')
  const [photoUploading, setPhotoUploading] = useState(false)
  const [photoUrl, setPhotoUrl] = useState('')
  const [photoFile, setPhotoFile] = useState<File | undefined>()
  const ref = useRef<HTMLInputElement | null>()

  const addMushroom = async () => {
    const mushroom: Mushroom = {
      scientificName,
      commonName,
      description,
      sporePrint,
      edibility,
      edibilityNotes,
      photoUrl,
      user_id: session?.user.id,
      user_email: session?.user.email,
    }
    setLoading(true)
    await handleCreate(supabase, mushroom)
    clearForm()
    setLoading(false)
  }

  const uploadPhoto = async () => {
    setPhotoUploading(true)
    try {
      const newFileName = `${session?.user.id}-${photoFile?.name}`
      const filePath = `${newFileName}`
      setPhotoUrl(filePath)
      const { error: uploadError } = await supabase.storage
        .from('mushroom-photos')
        .upload(filePath, photoFile!, { cacheControl: '3600', upsert: false })
      if (uploadError) {
        throw uploadError
      } else {
        addMushroom()
      }
    } catch (error) {
      alert('Error uploading photo.  Mushroom record not created')
      console.log(error)
    } finally {
      setPhotoUploading(false)
    }
  }

  const clearForm = () => {
    setScienctificName('')
    setCommonName('')
    setDescription('')
    setSporePrint('')
    setEdibility('')
    setEdibilityNotes('')
    setPhotoUrl('')
    ref.current!.value = ''
  }

  const handlePhotoChange = async (e: ChangeEvent) => {
    console.log(photoUploading)
    setPhotoUploading(true)
    if (
      !(e.target as HTMLInputElement).files ||
      (e.target as HTMLInputElement).files?.length === 0
    ) {
      throw new Error('You must select an image to upload.')
    }
    setPhotoFile((e.target as HTMLInputElement).files![0])
  }

  console.log(loading)
  return (
    <div>
      {!session ? (
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          theme='default'
        />
      ) : (
        <div>
          <div className='flex-column' id='addMushroom'>
            <label htmlFor='scientificName'>Scientific Name</label>
            <input
              type='text'
              name='scientificName'
              id='scientificName'
              value={scientificName}
              onChange={(e) => {
                setScienctificName(e.target.value)
              }}
            />
            <label htmlFor='commonName'>Common Name</label>
            <input
              type='text'
              name='commonName'
              id='commonName'
              value={commonName}
              onChange={(e) => {
                setCommonName(e.target.value)
              }}
            />
            <label htmlFor='pictures'>Upload Pictures</label>
            <input
              name='pictures'
              id='pictures'
              type='file'
              // @ts-ignore
              ref={ref}
              onChange={(e) => handlePhotoChange(e)}
            />
            <label htmlFor='description'>Description</label>
            <textarea
              name='description'
              id='comment'
              value={description}
              rows={4}
              onChange={(e) => {
                setDescription(e.target.value)
              }}
            />
            <label htmlFor='sporePrint'>Spore Print (Color)</label>
            <input
              type='text'
              name='sporePrint'
              id='sporePrint'
              value={sporePrint}
              onChange={(e) => {
                setSporePrint(e.target.value)
              }}
            />
            <label>Edibility</label>
            <fieldset
              id='edibility'
              // @ts-ignore
              value={edibility}
              onChange={(e) => {
                setEdibility((e.target as HTMLInputElement).value)
              }}
            >
              <label>
                <input type='radio' value='Edible' name='edibility' /> Edible
              </label>
              <label>
                <input type='radio' value='Inedible' name='edibility' />{' '}
                Inedible
              </label>
              <label>
                <input type='radio' value='Poisonous' name='edibility' />{' '}
                Poisonous
              </label>
              <label>
                <input type='radio' value='Unknown' name='edibility' /> Unknown
              </label>
            </fieldset>
            <label htmlFor='edibilityNotes'>Edibility Notes</label>
            <textarea
              name='edibilityNotes'
              id='edibilityNotes'
              rows={2}
              value={edibilityNotes}
              onChange={(e) => setEdibilityNotes(e.target.value)}
            />
            <button
              type='submit'
              onClick={async (e) => {
                e.preventDefault()
                await uploadPhoto()
              }}
            >
              Submit
            </button>
          </div>

          <button onClick={() => supabase.auth.signOut()}>Sign out</button>
        </div>
      )}
    </div>
  )
}

export default AddMushroom
