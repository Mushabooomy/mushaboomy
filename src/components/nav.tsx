/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from 'theme-ui'
import Link from 'next/link'

const Nav = () => {

  console.log('nav')
  
  return (
    <header
      sx={{
        bg: 'primary',
        height: '60px',
        width: '100%',
      }}
    >
      <nav
        sx={{
          alignItems: 'center',
          display: 'flex',
          height: '100%',
          justifyContent: 'space-between',
          padding: '25px',
          width: '100VW',
        }}
      >
        <Link
          href="/"
          sx={{ fontWeight: 'bold', fontSize: 4, cursor: 'pointer' }}
        >
          MUSH-A-BOOM!
        </Link>
        <Link
          href="/addmushroom/"
          sx={{ fontWeight: 'bold', fontSize: 3, cursor: 'pointer' }}
        >
          + 🍄
        </Link>
        <Link
          href="/posts/"
          sx={{ fontWeight: 'bold', fontSize: 3, cursor: 'pointer' }}
        >
          Posts
        </Link>
      </nav>
    </header>
  )
}

export default Nav
