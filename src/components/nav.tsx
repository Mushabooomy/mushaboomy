import Link from "next/link";

const Nav = () => (
  <header>
    <nav>
      <Link href="/">
        <h1>MUSH-A-BOOM!</h1>
      </Link>
      <Link href="/addmushroom/">
        <button className="add">+ 🍄</button>
      </Link>
      <Link href="/mushrooms/">
        <button className="mushrooms">Mushrooms</button>
      </Link>
    </nav>
  </header>
);

export default Nav;
