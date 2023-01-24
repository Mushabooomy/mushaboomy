import React, { useRef, useState } from 'react'
import { SupabaseClient } from '@supabase/supabase-js'
import { useSession } from '@supabase/auth-helpers-react'
import { Session } from '@supabase/supabase-js'
import styles from '../../styles/MushroomView.module.scss'
import Image from 'next/image'
import {
  handleDeleteOne,
  handleDeletePhoto,
  handleGetAll,
} from '../../utils/db'
import MushroomForm from './MushroomForm'

type Props = {
  mushroom: Mushroom
  expandChange: (id: number | undefined) => void
  supabase: SupabaseClient
  setActiveMushroom: React.Dispatch<React.SetStateAction<number | undefined>>
  setMushrooms: React.Dispatch<React.SetStateAction<Mushroom[] | []>>
}

const MushroomView = ({
  mushroom,
  expandChange,
  supabase,
  setActiveMushroom,
  setMushrooms,
}: Props) => {
  const ref = useRef<HTMLDetailsElement | null>(null)
  const [toggleEdit, setToggleEdit] = useState(false)
  const session = useSession()

  function toggleExpanded() {
    if (ref.current?.open && !toggleEdit) {
      expandChange(undefined)
    } else if (ref.current?.open && toggleEdit) {
      setToggleEdit(false)
    } else {
      expandChange(mushroom.id)
    }
  }

  function deleteMushroom() {
    Promise.all([
      handleDeleteOne(supabase, mushroom.id),
      handleDeletePhoto(
        supabase,
        `${session?.user.id}/${mushroom.photoUrls[0]}`
      ),
    ]).then(() => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      handleGetAll(supabase, session!, setMushrooms)
      setActiveMushroom(undefined)
    })
  }

  return (
    <>
      <details ref={ref} className={styles.details}>
        <summary onClick={toggleExpanded}>
          <div className={styles.thumbnailWrapper}>
            <Image
              src={`https://cxyyaruovsakyjdwtljt.supabase.co/storage/v1/object/public/mushroom-photos/${session?.user.id}/${mushroom.photoUrls[0]}`}
              alt={mushroom.scientificName}
              fill={true}
            />
          </div>
          <div className='titles'>
            <h3>{mushroom.scientificName}</h3>
            <h4>{mushroom.commonName}</h4>
          </div>
        </summary>
        {!toggleEdit ? (
          <div className={styles.content}>
            {mushroom.photoUrls.map((url) => {
              return (
                <Image
                  key={url}
                  src={`https://cxyyaruovsakyjdwtljt.supabase.co/storage/v1/object/public/mushroom-photos/${session?.user.id}/${url}`}
                  alt={mushroom.scientificName}
                  width={72}
                  height={72}
                />
              )
            })}
            <h5>Description</h5>
            <p className='description'>{mushroom.description}</p>
            <h5>Edibility</h5>
            <p className='edibility'>{mushroom.edibility}</p>
            <h5>Edibility Notes</h5>
            <p className='edibilityNotes'>{mushroom.edibilityNotes}</p>
            <h5>Spore Print</h5>
            <p className='sporePrint'>{mushroom.sporePrint}</p>
            <div className={styles.edit}>
              <div className={styles.edit}>
                <button
                  onClick={() => {
                    setToggleEdit(!toggleEdit)
                  }}
                >
                  Edit 🍄
                </button>
                <button onClick={() => deleteMushroom()}>Delete 🍄</button>
              </div>
            </div>
          </div>
        ) : null}

        {toggleEdit ? (
          <MushroomForm
            mushroomEdit={mushroom}
            setToggleEdit={toggleExpanded}
            setMushrooms={setMushrooms}
          />
        ) : null}
      </details>
    </>
  )
}

export default MushroomView
