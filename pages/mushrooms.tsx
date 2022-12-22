import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useEffect, useState } from 'react'
import MushroomView from '../src/components/MushroomView'
import { handleGetAll } from '../utils/db'

const Mushrooms = () => {
  const session = useSession()
  const supabase = useSupabaseClient()
  const [mushrooms, setMushrooms] = useState<Mushroom[]>([])
  const [activeMushroom, setActiveMushroom] = useState<number | undefined>(
    undefined
  )

  useEffect(() => {
    handleGetAll(supabase, setMushrooms)
  }, [activeMushroom])

  useEffect(() => {
    console.log('reload')
  }, [activeMushroom])

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
      {!session ? (
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          theme='default'
        />
      ) : (
        <div className='mushroomsList'>
          {getActiveMushroom().map((mushroom) => (
            <MushroomView
              mushroom={mushroom}
              {...mushroom}
              key={mushroom.id}
              expandChange={changeFocus}
              activeMushroom={activeMushroom}
              supabase={supabase}
              setActiveMushroom={setActiveMushroom}
              session={session}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Mushrooms
