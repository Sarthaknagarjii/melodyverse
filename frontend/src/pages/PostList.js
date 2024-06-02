import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchPosts = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/posts?page=${page}`);
      setPosts(prevPosts => [...prevPosts, ...response.data]);
      setHasMore(response.data.length > 0);
    } catch (error) {
      console.error('Error fetching posts', error);
    }
  }, [page]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || !hasMore) return;
    setPage(prevPage => prevPage + 1);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasMore]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Post List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map(post => (
          <div key={post._id} className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
            <p className="text-gray-700">{post.content}</p>
            <p className="text-sm text-gray-500 mt-2">by {post.author.username}</p>
          </div>
        ))}
      </div>
      {hasMore && (
        <div className="text-center py-4">
          <p>Loading more posts...</p>
        </div>
      )}
    </div>
  );
};

export default PostList;
