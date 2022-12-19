import React, { useState } from 'react'
import Image from 'next/image'
import { Mushroom } from '../../pages/addmushroom'

type Props = {
  mushroom: Mushroom
  expandChange: (id: number | undefined) => void
  activeMushroom: number | undefined
}

const MushroomView = ({ mushroom, expandChange, activeMushroom }: Props) => {
  const [expanded, setExpanded] = useState(false)

  function toggleExpanded() {
    console.log(activeMushroom)
    mushroom.id === activeMushroom
      ? expandChange(undefined)
      : expandChange(mushroom.id)
    setExpanded(!expanded)
  }

  return !expanded ? (
    <li
      key={mushroom.id}
      onClick={toggleExpanded}
    >
      <Image src="" alt={mushroom.scientificName} />
      <h2>{mushroom.scientificName}</h2>
      <h3>{mushroom.commonName}</h3>
    </li>
  ) : (
    <div className="expanded">
      <Image src="" alt={mushroom.scientificName} />
      <h2 onClick={toggleExpanded}>BIG VIEW{mushroom.scientificName}</h2>
      <h3>{mushroom.commonName}</h3>
      <p className="description">{mushroom.description}</p>
      <p className="edibility">{mushroom.edibility}</p>
      <p className="edibilityNotes">{mushroom.edibilityNotes}</p>
      <p className="sportPrint">{mushroom.sporePrint}</p>
    </div>
  )
}

export default MushroomView
