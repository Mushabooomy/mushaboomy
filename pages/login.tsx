import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { handleSignout } from '../utils/session';

const Login = () => {
  const session = useSession()
  const supabase = useSupabaseClient()

  return (
    <div>
      {!session ? (
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          theme="default"
        />
      ) : (
        <div className=''>
          You are signed in
          <button onClick={() => handleSignout(supabase)}>Sign Out</button>
        </div>
      )}
    </div>
  )
}

export default Login
