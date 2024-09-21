import React, { useEffect, useState } from 'react'
import Posts from '../components/Posts'

const IndexPages = () => {
  const[posts,setPosts]=useState([]);
  useEffect(()=>{
    fetch('http://localhost:3000/post').then((res)=>{
      res.json().then((posts)=>{
        setPosts(posts);
      })
    })
  },[])
  return (
    <>
    {posts.length>0 && posts.map(post=>(
      <Posts {...post}/>
    ))}
    </>
  )
}

export default IndexPages