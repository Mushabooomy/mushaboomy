import React from 'react'
import { Mushroom } from '../../pages/addmushroom';

const MushroomView = (props: { Mushroom: Mushroom }) => {
  console.log(props)

  // for (const item in props) {
  //   console.log(item)
  // }

  // const thing = Object.keys(props).forEach(function(key, index) {
  //   props[key] *= 2;
  // });

  // console.log(thing)
  return (
    <>
      <h1>MUSHROOM</h1>
      <ul>
      </ul>
    </>
  )
}

export default MushroomView
