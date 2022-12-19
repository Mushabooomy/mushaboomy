import React, { useEffect, useRef } from 'react'
import Image from 'next/image'
import { Mushroom } from '../../pages/addmushroom'

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
    <details ref={ref}>
      <summary onClick={toggleExpanded}>{mushroom.scientificName}</summary>
      <div className="content">
        <Image src="" alt={mushroom.scientificName} />
        <h3>{`${mushroom.id} - ${mushroom.commonName}`}</h3>
        <p className="description">{mushroom.description}</p>
        <p className="edibility">{mushroom.edibility}</p>
        <p className="edibilityNotes">{mushroom.edibilityNotes}</p>
        <p className="sportPrint">{mushroom.sporePrint}</p>
      </div>
    </details>
  )
}

export default MushroomView
