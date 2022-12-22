import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { Session } from '@supabase/supabase-js'
import { ChangeEvent, useRef, useState } from 'react'
import { handleCreate } from '../../utils/db'

interface FormProps {
  session: Session
}

const MushroomForm = ({ session }: FormProps) => {
  const supabase = useSupabaseClient()
  const [photoFile, setPhotoFile] = useState<File | undefined>()
  const [photoUploading, setPhotoUploading] = useState(false)
  const [loading, setLoading] = useState(true)
  const ref = useRef<HTMLInputElement | null>(null)
  const [formState, setFormState] = useState<Mushroom>({
    scientificName: '',
    commonName: '',
    description: '',
    sporePrint: '',
    edibility: '',
    edibilityNotes: '',
    photoUrl: '',
  })

  const addMushroom = async () => {
    const mushroom: Mushroom = formState
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
      const { error: uploadError } = await supabase.storage
        .from('mushroom-photos')
        .upload(filePath, photoFile!, { cacheControl: '3600', upsert: false })
      if (uploadError) {
        throw uploadError
      } else {
        addMushroom()
      }
    } catch (uploadError) {
      alert('Error uploading photo.  Mushroom record not created')
      console.log(uploadError)
    } finally {
      setPhotoUploading(false)
    }
  }

  const handlePhotoChange = async (e: ChangeEvent) => {
    if (
      !(e.target as HTMLInputElement).files ||
      (e.target as HTMLInputElement).files?.length === 0
    ) {
      throw new Error('You must select an image to upload.')
    }
    await setPhotoFile((e.target as HTMLInputElement).files![0])
  }

  const handleFieldChange = (object: Mushroom) => {
    setFormState(object)
  }

  const clearForm = () => {
    setFormState({
      scientificName: '',
      commonName: '',
      description: '',
      sporePrint: '',
      edibility: '',
      edibilityNotes: '',
      photoUrl: '',
    })

    ref.current!.value = ''
  }

  const handleSubmit = () => {
    uploadPhoto()
  }

  return (
    <div className="flex-column" id="addMushroom">
      <label htmlFor="scientificName">Scientific Name</label>
      <input
        type="text"
        name="scientificName"
        id="scientificName"
        value={formState.scientificName}
        onChange={(e) => {
          handleFieldChange({ ...formState, scientificName: e.target.value })
        }}
      />
      <label htmlFor="commonName">Common Name</label>
      <input
        type="text"
        name="commonName"
        id="commonName"
        value={formState.commonName}
        onChange={(e) => {
          handleFieldChange({ ...formState, commonName: e.target.value })
        }}
      />
      <label htmlFor="pictures">Upload Pictures</label>
      {!photoUploading ? (
        <input
          name="pictures"
          id="pictures"
          type="file"
          ref={ref}
          onChange={(e) => handlePhotoChange(e)}
        />
      ) : (
        <p>Loading . . . </p>
      )}
      <label htmlFor="description">Description</label>
      <textarea
        name="description"
        id="comment"
        value={formState.description}
        rows={4}
        onChange={(e) => {
          handleFieldChange({ ...formState, description: e.target.value })
        }}
      />
      <label htmlFor="sporePrint">Spore Print (Color)</label>
      <input
        type="text"
        name="sporePrint"
        id="sporePrint"
        value={formState.sporePrint}
        onChange={(e) => {
          handleFieldChange({ ...formState, sporePrint: e.target.value })
        }}
      />
      <label>Edibility</label>
      <fieldset
        id="edibility"
        onChange={(e) => {
          handleFieldChange({
            ...formState,
            edibility: (e.target as HTMLInputElement).value,
          })
        }}
      >
        <label>
          <input
            type="radio"
            checked={formState.edibility === 'Edible'}
            value="Edible"
            name="edibility"
          />{' '}
          Edible
        </label>
        <label>
          <input
            type="radio"
            checked={formState.edibility === 'Inedible'}
            value="Inedible"
            name="edibility"
          />{' '}
          Inedible
        </label>
        <label>
          <input
            type="radio"
            checked={formState.edibility === 'Poisonous'}
            value="Poisonous"
            name="edibility"
          />{' '}
          Poisonous
        </label>
        <label>
          <input
            type="radio"
            checked={formState.edibility === 'Unknown'}
            value="Unknown"
            name="edibility"
          />{' '}
          Unknown
        </label>
      </fieldset>
      <label htmlFor="edibilityNotes">Edibility Notes</label>
      <textarea
        name="edibilityNotes"
        id="edibilityNotes"
        rows={2}
        value={formState.edibilityNotes}
        onChange={(e) =>
          handleFieldChange({ ...formState, edibilityNotes: e.target.value })
        }
      />
      <button
        type="submit"
        onClick={(e) => {
          e.preventDefault()
          handleSubmit()
        }}
      >
        Submit
      </button>
    </div>
  )
}

export default MushroomForm
