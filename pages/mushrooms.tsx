import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useEffect, useState } from 'react'
import { Mushroom } from './addmushroom'
import MushroomView from '../src/components/MushroomView'

const Mushrooms = () => {
  const session = useSession()
  const supabase = useSupabaseClient()
  const [mushrooms, setMushrooms] = useState<Mushroom[]>([])
  const [activeMushroom, setActiveMushroom] = useState<number | undefined>(
    undefined,
  )

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    const { data, error } = await supabase.from('mushroom').select('*')
    if (data) {
      await setMushrooms(data)
    }
    console.log(error)
  }

  function changeFocus(id: number | undefined) {
    setActiveMushroom(id)
  }

  return (
    <div>
      {!session ? (
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          theme="default"
        />
      ) : (
        <ul className="mushroomsList">
          {mushrooms.map((mushroom) => (
            <MushroomView
              mushroom={mushroom}
              {...mushroom}
              key={mushroom.id}
              expandChange={changeFocus}
              activeMushroom={activeMushroom}
            />
          ))}
        </ul>
      )}
    </div>
  )
}

export default Mushrooms
