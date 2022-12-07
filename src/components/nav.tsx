/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "theme-ui";
import Link from "next/link";

const Nav = () => (
  <header
    sx={{
      display: "grid",
      justifyContent: "center",
      bg: "primary",
      height: "60px",
      width: "100%",
    }}
  >
    <nav
      sx={{
        display: "flex",
        alignItems: "center",
        height: "100%",
        width: "100%",
      }}
    >
      <Link href="/">
        <a sx={{ fontWeight: "bold", fontSize: 4, cursor: "pointer" }}>
          🍄 MUSH-A-BOOM! 🍄
        </a>
      </Link>
    </nav>
  </header>
);

export default Nav;
