import React, { useEffect, useRef, useState } from 'react'
import { Session, SupabaseClient } from '@supabase/supabase-js'
import styles from '../../styles/MushroomView.module.scss'
import Image from 'next/image'
import { handleDeleteOne, handleDeletePhoto } from '../../utils/db'
import MushroomForm from './MushroomForm'

type Props = {
  mushroom: Mushroom
  expandChange: (id: number | undefined) => void
  activeMushroom: number | undefined
  supabase: SupabaseClient
  setActiveMushroom: React.Dispatch<React.SetStateAction<number | undefined>>
  session: Session
}

const MushroomView = ({
  mushroom,
  expandChange,
  activeMushroom,
  supabase,
  setActiveMushroom,
  session,
}: Props) => {
  const ref = useRef<HTMLDetailsElement | null>(null)
  const [toggle, setToggle] = useState(false)
  const [toggleEdit, setToggleEdit] = useState(false)

  useEffect(() => {
    console.log('init', activeMushroom)
  }, [])

  function toggleExpanded() {
    if (ref.current?.open) {
      expandChange(undefined)
      setToggle(!toggle)
    } else {
      expandChange(mushroom.id)
    }
  }

  return (
    <details ref={ref} className={styles.details}>
      <summary onClick={toggleExpanded}>
        <div className={styles.thumbnailWrapper}>
          <Image
            src={`https://cxyyaruovsakyjdwtljt.supabase.co/storage/v1/object/public/mushroom-photos/${mushroom.photoUrl}`}
            alt={mushroom.scientificName}
            fill={true}
          />
        </div>
        <div className='titles'>
          <h3>{mushroom.scientificName}</h3>
          <h4>{mushroom.commonName}</h4>
        </div>
      </summary>
      <div className={styles.content}>
        <h5>Description</h5>
        <p className='description'>{mushroom.description}</p>
        <h5>Edibility</h5>
        <p className='edibility'>{mushroom.edibility}</p>
        <h5>Edibility Notes</h5>
        <p className='edibilityNotes'>{mushroom.edibilityNotes}</p>
        <h5>Spore Print</h5>
        <p className='sporePrint'>{mushroom.sporePrint}</p>
        <div className={styles.edit}>
          {activeMushroom ? (
            <Image
              className={styles.editImage}
              src='/images/EditIcon.png'
              alt='Edit button'
              height='25'
              width='25'
              onClick={() => setToggle(!toggle)}
            />
          ) : null}
          {toggle ? (
            <div className={styles.edit}>
              <button
                onClick={() => {
                  setToggleEdit(!toggleEdit)
                }}
              >
                Edit 🍄
              </button>
              <button
                onClick={() => {
                  Promise.all([
                    handleDeleteOne(supabase, mushroom.id),
                    handleDeletePhoto(supabase, mushroom.photoUrl),
                  ]).then(() => {
                    setActiveMushroom(undefined)
                  })
                }}
              >
                Delete 🍄
              </button>
            </div>
          ) : null}
        </div>
      </div>
      {toggleEdit ? (
        <MushroomForm session={session} mushroomEdit={mushroom} />
      ) : null}
    </details>
  )
}

export default MushroomView
