/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from 'theme-ui'
import Link from 'next/link'

const Nav = () => (
  <header>
    <nav>
      <Link href="/"><h1>MUSH-A-BOOM!</h1></Link>
      <Link href="/addmushroom/">
        <button className="add">
        + 🍄
        </button>
        </Link>
    </nav>
  </header>
)

export default Nav
