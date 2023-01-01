import Link from 'next/link'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { handleSignout } from '../../utils/session';

const Nav = () => {
  const session = useSession()
  const supabase = useSupabaseClient()
  const router = useRouter()
  const expanded = router.pathname === '/'

  return (
    <header>
      <nav className={expanded ? 'expanded' : ''}>
        <Image
          alt="Mushroom logo"
          src="/images/MushroomManCropped.png"
          width="110"
          height="110"
        />
        <Link href="/">
          <h1>MUSHROOM BOOM!</h1>
        </Link>
        <div>
          <Link href="/addmushroom/">
            <button className="add">Add a mushroom</button>
          </Link>
          <Link href="/mushrooms/">
            <button className="mushrooms">Mushroom List</button>
          </Link>
          {session ? (
            <button onClick={() => handleSignout(supabase)}>Sign Out</button>
          ) : (
            <Link href="/login">
              <button>Sign In / Sign Up</button>
            </Link>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Nav
