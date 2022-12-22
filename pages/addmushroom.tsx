/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import MushroomForm from '../src/components/MushroomForm'

const AddMushroom = () => {
  const session = useSession()
  const supabase = useSupabaseClient()

  return (
    <div>
      {!session ? (
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          theme='default'
        />
      ) : (
        <div>
          <MushroomForm session={session} />
        </div>
      )}
    </div>
  )
}

export default AddMushroom
