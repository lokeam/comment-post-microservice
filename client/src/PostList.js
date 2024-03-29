import React, { useState, useEffect } from "react";
import axios from 'axios';
import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";
import { API_ENDPOINT } from "./constants";

const PostList = () => {
  const [posts, setPosts] = useState({});

  const fetchPosts = async () => {
    try {
      const response = await axios.get(API_ENDPOINT);

      setPosts(response.data);
    } catch (error) {
      console.log('I am error. Problem with fetchPosts: ', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const renderedPosts = Object.values(posts).map((post) => {
    const { id, title, comments } = post;
    return (
      <div
        className="card"
        style={{width: '30%', marginBottom: '20px'}}
        key={id}
      >
        <div className="card-body">
          <h3>{title}</h3>
          <CommentList comments={comments} />
          <CommentCreate postId={id} />
        </div>
      </div>
    );
  });

  return (
    <div className="d-flex flex-row flex-wrap justify-content-between">{renderedPosts}</div>
  )
};

export default PostList;
