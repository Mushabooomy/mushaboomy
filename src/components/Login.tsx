import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { useSupabaseClient } from '@supabase/auth-helpers-react'

const Login = () => {
  const supabase = useSupabaseClient()

  return (
    <div>
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        theme='default'
      />
    </div>
  )
}

export default Login
