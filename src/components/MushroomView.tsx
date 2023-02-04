import React, { useRef, useState } from 'react'
import { SupabaseClient } from '@supabase/supabase-js'
import { useSession } from '@supabase/auth-helpers-react'
import styles from '../../styles/MushroomView.module.scss'
import Image from 'next/image'
import { handleDeleteOne, handleGetAll } from '../../utils/db'
import MushroomForm from './MushroomForm'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Lazy, Navigation, Pagination } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/lazy'

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
    const deleteImageArray = mushroom.photoUrls.map(
      (photoUrl: PhotoUrlsObj) => `${session?.user.id}/${photoUrl.fileName}`
    )
    Promise.all([handleDeleteOne(supabase, mushroom, deleteImageArray)]).then(
      () => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        handleGetAll(supabase, session!, setMushrooms)
        setActiveMushroom(undefined)
      }
    )
  }

  return (
    <>
      <details ref={ref} className={styles.details}>
        <summary onClick={toggleExpanded}>
          <div className={styles.thumbnailWrapper}>
            <Image
              src={
                `${process.env.NEXT_PUBLIC_PHOTO_BUCKET_URL}${session?.user.id}/` +
                `${
                  mushroom && mushroom.photoUrls && mushroom.photoUrls[0]
                    ? mushroom.photoUrls[0].fileName
                    : ''
                }`
              }
              alt={mushroom.scientificName}
              fill={true}
            />
          </div>
          <div className='titles'>
            <h3>
              {mushroom.scientificName
                ? mushroom.scientificName
                : 'Scientific Name: Unknown'}
            </h3>
            <h4>
              {mushroom.commonName
                ? mushroom.commonName
                : 'Common Name: Unknown'}
            </h4>
          </div>
        </summary>
        {!toggleEdit ? (
          <div className={styles.content}>
            <Swiper
              style={
                {
                  '--swiper-navigation-color': '#fff',
                  '--swiper-pagination-color': '#fff',
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                } as any
              }
              lazy={true}
              pagination={{
                clickable: true,
              }}
              navigation={true}
              modules={[Lazy, Pagination, Navigation]}
              className='mySwiper'
            >
              {mushroom.photoUrls.map((obj: PhotoUrlsObj) => (
                <SwiperSlide key={obj.fileName}>
                  <div className={styles.imageWrapper}>
                    <Image
                      src={`${process.env.NEXT_PUBLIC_PHOTO_BUCKET_URL}${session?.user.id}/${obj.fileName}`}
                      alt={mushroom.scientificName}
                      width={obj.width}
                      height={obj.height}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <h5>Description</h5>
            <p className='description'>
              {mushroom.description ? (
                mushroom.description
              ) : (
                <i>Edit to add description.</i>
              )}
            </p>
            <h5>Edibility</h5>
            <p className='edibility'>
              {mushroom.edibility ? (
                mushroom.edibility
              ) : (
                <i>Edit to add edibility.</i>
              )}
            </p>
            <h5>Edibility Notes</h5>
            <p className='edibilityNotes'>
              {mushroom.edibilityNotes ? (
                mushroom.edibilityNotes
              ) : (
                <i>Edit to add edibility notes.</i>
              )}
            </p>
            <h5>Spore Print</h5>
            <p className='sporePrint'>
              {mushroom.sporePrint ? (
                mushroom.sporePrint
              ) : (
                <i>Edit to add edibility notes.</i>
              )}
            </p>
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
