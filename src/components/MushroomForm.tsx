import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useSession } from '@supabase/auth-helpers-react'
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
import NextImage from 'next/image'

interface FormProps {
  setToggleEdit?: Dispatch<SetStateAction<boolean>>
  setMushrooms?: React.Dispatch<SetStateAction<Mushroom[] | []>>
  mushroomEdit?: Mushroom
}

const MushroomForm = ({
  mushroomEdit,
  setToggleEdit,
  setMushrooms,
}: FormProps) => {
  const session = useSession()
  const supabase = useSupabaseClient()
  const [photoFiles, setPhotoFiles] = useState<[] | null>()
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
    photoUrls: [],
    user_id: session?.user.id,
    user_email: session?.user.email,
  })
  const isMountedRef = useRef(false)
  const [editImageArray, setEditImageArray] = useState<ImageArray>([])

  const [alertState, setAlertState] = useState<AlertProps>({
    message: '',
    type: 'none',
  })

  useEffect(() => {
    console.log('reloaded')
  }, [photoFiles])

  useEffect(() => {
    if (!isMountedRef.current) {
      isMountedRef.current = true
      return
    }
    if (mushroomEdit) {
      const imageActiveArray = mushroomEdit.photoUrls.map((photo) => ({
        photoUrl: photo.fileName,
        isActive: false,
      }))
      handleFieldChange(mushroomEdit)
      setEditImageArray(imageActiveArray)
    }
  }, [])

  const addMushroom = async () => {
    const mushroom: Mushroom = formState
    setLoading(true)
    await uploadPhotos()
    await handleCreate(supabase, mushroom)
    clearForm()
    setLoading(false)
  }

  const updateMushroom = async () => {
    const deleteImageArray = editImageArray
      .filter(({ isActive }) => isActive)
      .map(({ photoUrl }) => `${session?.user.id}/${photoUrl}`)

    const updatedPhotoUrls = formState.photoUrls.filter(
      ({ fileName }) =>
        !editImageArray.find(({ photoUrl }) => photoUrl === fileName) ||
        !editImageArray.find(({ photoUrl }) => photoUrl === fileName).isActive
    )

    await handleUpdate(
      supabase,
      session,
      { ...formState, photoUrls: updatedPhotoUrls },
      deleteImageArray
    )

    await uploadPhotos()
    await handleGetAll(supabase, session, setMushrooms)
    setToggleEdit?.(false)
    clearForm()
  }

  const uploadPhotos = async () => {
    if (photoFiles) {
      setPhotoUploading(true)
      photoFiles.forEach(async (file) => {
        try {
          const { error: uploadError } = await supabase.storage
            .from(`mushroom-photos/${session?.user.id}`)
            .upload(file.name, file, {
              cacheControl: '3600',
              upsert: false,
            })
          if (uploadError) {
            throw uploadError
          }
        } catch (uploadError) {
          setAlertState({
            message: 'Error uploading photo.  Mushroom record not created',
            type: 'error',
          })
        }
      })
      setPhotoUploading(false)
    }
  }

  const setPhotos = async (files: []) => {
    const incomingFilesArray = Array.from(files)
    const newImageArray = formState.photoUrls
    const currentFileNames = formState.photoUrls.map((obj) => obj.fileName)
    const newFilesArray = photoFiles || []

    for (const photoFile of incomingFilesArray) {
      const fileName = photoFile.name

      if (currentFileNames.includes(fileName)) {
        setAlertState({
          message: `File ${fileName} is already added and will not be uploaded again`,
          type: 'warning',
        })
      } else {
        const file = new File([photoFile], fileName)
        newFilesArray.push(file)

        const img = new Image()
        img.src = URL.createObjectURL(photoFile)
        await img.decode()
        const { width, height } = img
        newImageArray.push({ fileName, width, height })
      }
    }

    setPhotoFiles(newFilesArray)
    setFormState({ ...formState, photoUrls: newImageArray })
    ref.current.value = ''
  }

  const handlePhotoChange = async (e: ChangeEvent) => {
    if (
      //To do: If there is one photo already that's been uploaded skip the alert
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
    const files: any = (e.target as HTMLInputElement).files

    setPhotos(files)
  }

  const removePhotoFile = (file: File) => {
    const newFileArray = photoFiles.filter((obj) => obj !== file)
    const newPhotoUrls = formState.photoUrls.filter(
      (obj) => obj.fileName !== file.name
    )

    setPhotoFiles(newFileArray)
    setFormState({ ...formState, photoUrls: newPhotoUrls })
  }

  const togglePendingDelete = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const photourl = (e.target as HTMLInputElement).dataset.photourl
    const updatedEditImages = editImageArray.map((i) => {
      if (i.photoUrl === photourl) {
        return {
          ...i,
          isActive: !i.isActive,
        }
      } else {
        return i
      }
    })
    setEditImageArray(updatedEditImages)
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
      photoUrls: [],
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
      <label htmlFor='pictures'>Add Photos</label>
      {!photoUploading ? (
        <input
          accept='image/*'
          className={styles.fileInput}
          name='pictures'
          id='pictures'
          type='file'
          ref={ref}
          onChange={(e) => handlePhotoChange(e)}
          multiple
        />
      ) : (
        <p>Loading . . . </p>
      )}
      {photoFiles && photoFiles?.length > 0 && (
        <div className={styles.imagesWrapper}>
          {photoFiles.map((file) => {
            return (
              <div
                key={file.name}
                className={styles.deleteImage}
                onClick={() => removePhotoFile(file)}
              >
                <div className={styles.deleteButton}>
                  <NextImage
                    alt='Delete image'
                    src={'/images/minus.png'}
                    width={15}
                    height={15}
                  />
                </div>
                <NextImage
                  alt='Delete image'
                  src={URL.createObjectURL(file)}
                  width={72}
                  height={72}
                />
              </div>
            )
          })}
        </div>
      )}
      {editImageArray.length > 0 ? (
        <div>
          <label htmlFor='delete pictures'>Select Photos to Delete</label>
          <div className={styles.imagesWrapper}>
            {editImageArray.map((i) => {
              return (
                <div
                  key={i.photoUrl}
                  className={`${styles.deleteImage} ${
                    i.isActive ? styles.active : null
                  }`}
                  onClick={(e) => {
                    togglePendingDelete(e)
                  }}
                >
                  {i.isActive ? (
                    <div className={styles.deleteButton}>
                      <NextImage
                        alt='Delete image'
                        src={'/images/delete.png'}
                        width={15}
                        height={15}
                      />
                    </div>
                  ) : null}
                  <NextImage
                    src={`${process.env.NEXT_PUBLIC_PHOTO_BUCKET_URL}${session?.user.id}/${i.photoUrl}`}
                    alt={formState.scientificName}
                    width={72}
                    height={72}
                    data-photourl={i.photoUrl}
                  />
                </div>
              )
            })}
          </div>
        </div>
      ) : null}
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
                setToggleEdit?.(false)
              }}
            >
              Cancel
            </button>
            <button
              type='submit'
              onClick={async (e) => {
                e.preventDefault()
                updateMushroom()
              }}
            >
              Save 🍄
            </button>
          </div>
        ) : (
          <button
            type='submit'
            onClick={(e) => {
              e.preventDefault()
              addMushroom()
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
