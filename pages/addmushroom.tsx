import { useSession } from '@supabase/auth-helpers-react'
import MushroomForm from '../src/components/MushroomForm'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

const AddMushroom = () => {
  const router = useRouter()
  const session = useSession()

  useEffect(() => {
    !session ? router.push('/') : null
  })

  return (
    <div>
      <div>
        <MushroomForm />
      </div>
    </div>
  )
}

export default AddMushroom
