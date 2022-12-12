import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { Box, Button, Input } from 'theme-ui'
import { SyntheticEvent, useEffect, useState } from 'react'

interface Post {
  content: string
  id: number
  inserted_at: string
  title: string
  user_email: string
  user_id: string
}

const AddMushroom = () => {
  console.log('posts')

  const session = useSession()
  const supabase = useSupabaseClient()
  const [posts, setPosts] = useState<Post[]>([])
  const [postText, setPostText] = useState('')

  useEffect(() => {
    getData()
  }, [])
  

  const getData = async () => {
    console.log('get')
    const { data, error } = await supabase.from('posts').select()
    if (data) {
      await setPosts(data as [])
    }
    console.log('data', posts)
    console.log('error', error)
  }

  const writeData = async () => {
    console.log('insert ')
    const { status } = await supabase.from('posts').insert([
      {
        title: 'Hello World',
        content: postText,
        user_id: session?.user.id,
        user_email: session?.user.email,
      },
    ])
    getData()
    console.log('status', status)
  }

  const deletePost = async (id:number) => {
    const { error } = await supabase.from('posts').delete().eq('id', id)
    if (error) {
      throw(error)
    }
    getData()
  }

  const viewPost = async (id:number) => {
    const { data, error } = await supabase.from('posts').select()
    .eq('id', id) 
    if (data) {
      await setPosts(data as [])
    }
    console.log('data', posts)
    console.log('error', error)
  }

  const handleInput = (e: SyntheticEvent) => {
    const input = (e.currentTarget as HTMLInputElement).value
    setPostText(input)
  }

  return (
    <div className="container" style={{ padding: '50px 0 100px 0' }}>
      {!session ? (
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          theme="default"
        />
      ) : (
        <Box>
          POSTS<br />
          <Input id="newPost" onInput={(e)=>{handleInput(e)}}></Input>
          <Button onClick={() => writeData()}> Write Post</Button><br />
          <ul style={{listStyle: 'none'}}>
            {posts.map((post) => (
              <li key={post.id}>
                ID: {post.id} <br />
                Text: {post.content}<br />
                <Button onClick={() => deletePost(post.id)}>delete</Button>
                <Button onClick={() => viewPost(post.id)}>view</Button>
              </li>
            ))}
          </ul>
        </Box>
      )}
    </div>
  )
}

export default AddMushroom
