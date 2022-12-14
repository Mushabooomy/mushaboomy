import Link from "next/link";

const Nav = () => {
  console.log("nav");

  return (
    <header>
      <nav>
        <Link href="/">MUSH-A-BOOM!</Link>
        <Link href="/addmushroom/">+ 🍄</Link>
        <Link href="/posts/">Posts</Link>
      </nav>
    </header>
  );
};

export default Nav;
