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
  const [photoFile, setPhotoFile] = useState<File | undefined>()
  const ref = useRef<HTMLInputElement | null>(null)
  const [photoUploading, setPhotoUploading] = useState(false)
  const [photoUrl, setPhotoUrl] = useState('')

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

  const handleSubmit = () => {
    uploadPhoto()
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
          <MushroomForm
            handleSubmit={handleSubmit}
            handlePhotoChange={handlePhotoChange}
            scientificName={scientificName}
            setScienctificName={setScienctificName}
            commonName={commonName}
            setCommonName={setCommonName}
            description={description}
            setDescription={setDescription}
            sporePrint={sporePrint}
            setSporePrint={setSporePrint}
            edibility={edibility}
            setEdibility={setEdibility}
            edibilityNotes={edibilityNotes}
            setEdibilityNotes={setEdibilityNotes}
            forwardedRef={ref}
          />
        </div>
      )}
    </div>
  )
}

export default AddMushroom
