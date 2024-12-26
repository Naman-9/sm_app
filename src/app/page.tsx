import React from 'react'
import Navbar from './componentssss/Navbar'
import { Separator } from '@/components/ui/separator'
import Post from './componentssss/Post'

const page = () => {
  return (
    <>
      <Navbar />
      <Separator className='bg-gray-300' />
      <Post />
    </>
  )
}

export default page