import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';

const Nav = () => {
  const router = useRouter();
  const expanded = router.pathname === '/';

  return (
    <header>
      <nav className={expanded ? 'expanded' : ''}>
        <Image src='/images/MushroomManCropped.png' width='110' height='110' />
        <Link href='/'>
          <h1>MUSHROOM BOOM!</h1>
        </Link>
        <div>
          <Link href='/addmushroom/'>
            <button className='add'>Add a mushroom</button>
          </Link>
          <Link href='/mushrooms/'>
            <button className='mushrooms'>Mushroom List</button>
          </Link>
          <button>Sign In / Sign Up</button>
        </div>
      </nav>
    </header>
  );
};

export default Nav;
