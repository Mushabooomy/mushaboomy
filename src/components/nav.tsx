import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import Image from 'next/image'

const Nav = () => {
  const router = useRouter()
  const expanded = router.pathname === '/'
  const session = useSession()
  const supabase = useSupabaseClient()

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.log(error)
    }
  }

  return (
    <header>
      <nav className={expanded ? 'expanded' : ''}>
        <Image
          alt='Mushroom logo'
          src='/images/MushroomManCropped.png'
          width='110'
          height='110'
        />
        <Link href='/'>
          <h1>MUSHROOM BOOM!</h1>
        </Link>
        {session ? (
          <div>
            <Link href='/addmushroom/'>
              <button className='add'>Add a mushroom</button>
            </Link>
            <Link href='/mushrooms/'>
              <button className='mushrooms'>Mushroom List</button>
            </Link>
            <button onClick={() => signOut()}>Sign Out</button>
          </div>
        ) : null}
      </nav>
    </header>
  )
}

export default Nav
