import React, { useEffect, useRef } from 'react'
import { Mushroom } from '../../pages/addmushroom'
import styles from '../../styles/MushroomView.module.scss'

type Props = {
  mushroom: Mushroom
  expandChange: (id: number | undefined) => void
  activeMushroom: number | undefined
}

const MushroomView = ({ mushroom, expandChange, activeMushroom }: Props) => {
  const ref = useRef<HTMLDetailsElement | null>(null)

  useEffect(() => {
    console.log('init', activeMushroom)
  }, [])

  function toggleExpanded() {
    if (ref.current!.open) {
      expandChange(undefined)
    } else {
      expandChange(mushroom.id)
    }
  }

  return (
    <details ref={ref} className={styles.details}>
      <summary onClick={toggleExpanded}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Amanita_muscaria_%28fly_agaric%29.JPG/1024px-Amanita_muscaria_%28fly_agaric%29.JPG"
          alt={mushroom.scientificName}
        />
        <div className="titles">
          <h3>{mushroom.scientificName}</h3>
          <h4>{mushroom.commonName}</h4>
        </div>
      </summary>
      <div className={styles.content}>
        <p className="description">{mushroom.description}</p>
        <h5>Edibility</h5>
        <p className="edibility">{mushroom.edibility}</p>
        <h5>Edibility Notes</h5>
        <p className="edibilityNotes">{mushroom.edibilityNotes}</p>
        <h5>Spore Print</h5>
        <p className="sportPrint">{mushroom.sporePrint}</p>
      </div>
    </details>
  )
}

export default MushroomView
