interface Mushroom {
  id?: number
  scientificName: string
  commonName: string
  description: string
  sporePrint: string
  edibility: string
  edibilityNotes: string
  photoUrls: Array<{ fileName: string; width: number; height: number }>
  user_id?: string
  user_email?: string
}

interface Post {
  content: string
  id: number
  inserted_at: string
  title: string
  user_email: string
  user_id: string
}

type AlertProps = {
  message: string
  type: 'error' | 'warning' | 'success' | 'none'
}

interface ImageObj {
  isActive: boolean
  photoUrl: string
}

type ImageArray = ImageObj[]

interface PhotoUrlsObj {
  fileName: string
  width: number
  height: number
}
