import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useEffect, useState, useRef } from 'react'
import MushroomView from '../src/components/MushroomView'
import { useRouter } from 'next/router'
import { handleGetAll } from '../utils/db'

const Mushrooms = () => {
  const router = useRouter()
  const session = useSession()
  const supabase = useSupabaseClient()
  const [mushrooms, setMushrooms] = useState<Mushroom[]>([])
  const isMountedRef = useRef(false)
  const [activeMushroom, setActiveMushroom] = useState<number | undefined>(
    undefined
  )

  useEffect(() => {
    if (!isMountedRef.current) {
      isMountedRef.current = true
      return
    }
    if (session != null) {
      handleGetAll(supabase, session, setMushrooms)
    }
  }, [session])

  useEffect(() => {
    console.log('reload')
  }, [activeMushroom])

  // Todo: If user not logged in reroute to the login page.  Current behaviour on refresh brings user to the login screen.
  useEffect(() => {
    !session ? router.push('/') : null
  })

  function changeFocus(id: number | undefined) {
    setActiveMushroom(id)
  }

  function getActiveMushroom() {
    if (activeMushroom) {
      return mushrooms.filter((mush) => {
        return mush.id === activeMushroom
      })
    } else return mushrooms
  }

  return (
    <div>
      <div className='mushroomsList'>
        {getActiveMushroom().map((mushroom) => (
          <MushroomView
            mushroom={mushroom}
            {...mushroom}
            key={mushroom.id}
            expandChange={changeFocus}
            supabase={supabase}
            setActiveMushroom={setActiveMushroom}
            setMushrooms={setMushrooms}
          />
        ))}
      </div>
    </div>
  )
}

export default Mushrooms
