import { Dispatch, SetStateAction } from 'react'

interface FormProps {
  handleSubmit: () => void
  handlePhotoChange: (event: React.ChangeEvent) => void
  scientificName: string
  setScienctificName: Dispatch<SetStateAction<string>>
  commonName: string
  setCommonName: Dispatch<SetStateAction<string>>
  description: string
  setDescription: Dispatch<SetStateAction<string>>
  sporePrint: string
  setSporePrint: Dispatch<SetStateAction<string>>
  edibility: string
  setEdibility: Dispatch<SetStateAction<string>>
  edibilityNotes: string
  setEdibilityNotes: Dispatch<SetStateAction<string>>
  forwardedRef: any
}

const MushroomForm = (props: FormProps) => {
  const {
    handleSubmit,
    handlePhotoChange,
    scientificName,
    setScienctificName,
    commonName,
    setCommonName,
    description,
    setDescription,
    sporePrint,
    setSporePrint,
    edibility,
    setEdibility,
    edibilityNotes,
    setEdibilityNotes,
    forwardedRef,
  } = props
  return (
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
        ref={forwardedRef}
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
          <input
            type='radio'
            checked={edibility === 'Edible'}
            value='Edible'
            name='edibility'
          />{' '}
          Edible
        </label>
        <label>
          <input
            type='radio'
            checked={edibility === 'Inedible'}
            value='Inedible'
            name='edibility'
          />{' '}
          Inedible
        </label>
        <label>
          <input
            type='radio'
            checked={edibility === 'Poisonous'}
            value='Poisonous'
            name='edibility'
          />{' '}
          Poisonous
        </label>
        <label>
          <input
            type='radio'
            checked={edibility === 'Unknown'}
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
        rows={2}
        value={edibilityNotes}
        onChange={(e) => setEdibilityNotes(e.target.value)}
      />
      <button
        type='submit'
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
