import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { Session } from '@supabase/supabase-js'
import styles from '../../styles/FormView.module.scss'
import {
  ChangeEvent,
  useRef,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from 'react'
import { handleCreate, handleUpdate, handleGetAll } from '../../utils/db'
import Alert from './Alert'

interface FormProps {
  session: Session
  mushroomEdit?: Mushroom
  setToggleEdit: Dispatch<SetStateAction<boolean>>
  setMushrooms: React.Dispatch<React.SetStateAction<Mushroom[] | []>>
}

const MushroomForm = ({
  session,
  mushroomEdit,
  setToggleEdit,
  setMushrooms,
}: FormProps) => {
  const supabase = useSupabaseClient()
  const [photoFile, setPhotoFile] = useState<File | undefined>()
  const [photoUploading, setPhotoUploading] = useState(false)
  // const [loading, setLoading] = useState(true)
  const ref = useRef<HTMLInputElement | null>(null)
  const [formState, setFormState] = useState<Mushroom>({
    scientificName: '',
    commonName: '',
    description: '',
    sporePrint: '',
    edibility: '',
    edibilityNotes: '',
    photoUrl: '',
    user_id: session?.user.id,
    user_email: session?.user.email,
  })
  const [alertState, setAlertState] = useState<AlertProps>({
    message: '',
    type: 'none',
  })

  useEffect(() => {
    if (mushroomEdit) {
      handleFieldChange(mushroomEdit)
    }
  }, [])

  const addMushroom = async () => {
    const mushroom: Mushroom = formState
    // setLoading(true)
    await handleCreate(supabase, mushroom)
    clearForm()
    // setLoading(false)
  }

  const updateMushroom = async () => {
    const mushroom: Mushroom = formState
    await handleUpdate(supabase, mushroom)
    await handleGetAll(supabase, setMushrooms)
    setToggleEdit(false)
    clearForm()
  }

  const uploadPhoto = async () => {
    setPhotoUploading(true)
    try {
      const { error: uploadError } = await supabase.storage
        .from('mushroom-photos')
        .upload(formState.photoUrl, photoFile!, {
          cacheControl: '3600',
          upsert: false,
        })
      if (uploadError) {
        throw uploadError
      }
    } catch (uploadError) {
      console.log({ uploadError })
      setAlertState({
        message: 'Error uploading photo.  Mushroom record not created',
        type: 'error',
      })
      console.log(uploadError)
    } finally {
      setPhotoUploading(false)
    }
  }

  const setPhotoUrl = (name: string) => {
    const newFileName = `${session?.user.id}-${name}`
    const filePath = `${newFileName}`
    setFormState({ ...formState, photoUrl: filePath })
  }

  const handlePhotoChange = async (e: ChangeEvent) => {
    if (
      !(e.target as HTMLInputElement).files ||
      (e.target as HTMLInputElement).files?.length === 0
    ) {
      setAlertState({
        message: 'You must select an image to upload.',
        type: 'warning',
      })
      throw new Error('You must select an image to upload.')
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const file: any = (e.target as HTMLInputElement).files?.[0]
    setPhotoFile(file)
    setPhotoUrl(file.name)
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

  return (
    <div className={styles.formWrapper}>
      <Alert {...alertState} />
      <label htmlFor='scientificName'>Scientific Name</label>
      <input
        type='text'
        name='scientificName'
        id='scientificName'
        value={formState.scientificName}
        onChange={(e) => {
          handleFieldChange({ ...formState, scientificName: e.target.value })
        }}
      />
      <label htmlFor='commonName'>Common Name</label>
      <input
        type='text'
        name='commonName'
        id='commonName'
        value={formState.commonName}
        onChange={(e) => {
          handleFieldChange({ ...formState, commonName: e.target.value })
        }}
      />
      <label htmlFor='pictures'>Picture</label>
      {!photoUploading ? (
        <input
          name='pictures'
          id='pictures'
          type='file'
          ref={ref}
          onChange={(e) => handlePhotoChange(e)}
        />
      ) : (
        <p>Loading . . . </p>
      )}
      <label htmlFor='description'>Description</label>
      <textarea
        name='description'
        id='comment'
        value={formState.description}
        onChange={(e) => {
          handleFieldChange({ ...formState, description: e.target.value })
        }}
      />
      <label htmlFor='sporePrint'>Spore Print (Color)</label>
      <input
        type='text'
        name='sporePrint'
        id='sporePrint'
        value={formState.sporePrint}
        onChange={(e) => {
          handleFieldChange({ ...formState, sporePrint: e.target.value })
        }}
      />
      <label>Edibility</label>
      <fieldset
        id='edibility'
        onChange={(e) => {
          handleFieldChange({
            ...formState,
            edibility: (e.target as HTMLInputElement).value,
          })
        }}
      >
        <label>
          <input
            type='radio'
            checked={formState.edibility === 'Edible'}
            value='Edible'
            name='edibility'
          />{' '}
          Edible
        </label>
        <label>
          <input
            type='radio'
            checked={formState.edibility === 'Inedible'}
            value='Inedible'
            name='edibility'
          />{' '}
          Inedible
        </label>
        <label>
          <input
            type='radio'
            checked={formState.edibility === 'Poisonous'}
            value='Poisonous'
            name='edibility'
          />{' '}
          Poisonous
        </label>
        <label>
          <input
            type='radio'
            checked={formState.edibility === 'Unknown'}
            value='Unknown'
            name='edibility'
          />{' '}
          Unknown
        </label>
      </fieldset>
      <label htmlFor='edibilityNotes'>Edibility Notes</label>
      <textarea
        name='edibilityNotes'
        id='edibilityNotes'
        value={formState.edibilityNotes}
        onChange={(e) =>
          handleFieldChange({ ...formState, edibilityNotes: e.target.value })
        }
      />
      <div className={styles.buttonWrapper}>
        {mushroomEdit ? (
          <div className={styles.editButtons}>
            <button
              onClick={() => {
                setToggleEdit(false)
              }}
            >
              Cancel
            </button>
            <button
              type='submit'
              onClick={async (e) => {
                e.preventDefault()
                await updateMushroom()
              }}
            >
              Save 🍄
            </button>
          </div>
        ) : (
          <button
            type='submit'
            onClick={async (e) => {
              e.preventDefault()
              await uploadPhoto()
              await addMushroom()
            }}
          >
            Submit
          </button>
        )}
      </div>
    </div>
  )
}

export default MushroomForm
