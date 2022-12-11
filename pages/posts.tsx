import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { Flex, Box, Button, Label, Input, Textarea, Radio } from 'theme-ui'
import { SyntheticEvent, useState } from 'react'
import { PostgrestBuilder } from '@supabase/postgrest-js'

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
  console.log(session)

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
    console.log('status', status)
  }

  const deletePost = async (id:number) => {
    const { error } = await supabase.from('posts').delete().eq('id', id)
    getData()
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
          <Button onClick={() => getData()}> Get Posts</Button><br />
          <Input id="newPost" onInput={(e)=>{handleInput(e)}}></Input>
          <Button onClick={() => writeData()}> Write Posts</Button><br />
          <ul style={{listStyle: 'none'}}>
            {posts.map((post) => (
              <li key={post.id}>
                ID: {post.id} <br />
                Text: {post.content}<br />
                <Button onClick={() => deletePost(post.id)}>delete</Button>
              </li>
            ))}
          </ul>
        </Box>
      )}
    </div>
  )
}

export default AddMushroom