import Link from 'next/link'
import { useRouter } from 'next/router'

const Nav = () => {
  const router = useRouter()
  const expanded = router.pathname === '/'

  return (
    <header>
      <nav className={expanded ? 'expanded' : ''}>
        <Link href="/">
          <h1>MUSHROOM BOOM!</h1>
        </Link>
        <div>
          <Link href="/addmushroom/">
            <button className="add">🍄</button>
          </Link>
          <Link href="/mushrooms/">
            <button className="mushrooms">Mushroom List</button>
          </Link>
        </div>
      </nav>
    </header>
  )
}

export default Nav
