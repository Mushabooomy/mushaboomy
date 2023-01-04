import Login from '../src/components/Login'
import { useSession } from '@supabase/auth-helpers-react'

const Home = () => {
  const session = useSession()
  return (
    <>
      {!session ? <Login /> : null}
      <div>
        <p>
          MUSH-A-BOOM! is a mushroom cataloging web application that is a useful
          tool for anyone interested in mushrooms. It allows users to create a
          catalog of the different types of mushrooms they have encountered,
          complete with pictures and detailed information about each one. Users
          can also search for and view information about different types of
          mushrooms in the catalog, making it easy to learn more about the
          fascinating world of mushrooms. The web application is user-friendly
          and easy to navigate, making it a valuable resource for both beginners
          and experienced mushroom enthusiasts. With the ability to add and
          organize mushrooms in the catalog, users can keep track of their
          findings and continue to learn more about these fascinating organisms.
        </p>
      </div>
    </>
  )
}

export default Home
