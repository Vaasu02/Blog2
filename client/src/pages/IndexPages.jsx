import React, { useEffect, useState } from 'react'
import Posts from '../components/Posts'

const IndexPages = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://blogg-xs4m.onrender.com/post')
      .then((res) => res.json())
      .then((posts) => {
        setPosts(posts);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
        setLoading(false);
      });
  }, []);

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        posts.length > 0 ? (
          posts.map(post => (
            <Posts key={post._id} {...post} />
          ))
        ) : (
          <div>No posts available</div>
        )
      )}
    </>
  )
}

export default IndexPages
