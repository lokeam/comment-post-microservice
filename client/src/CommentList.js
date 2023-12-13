import React, { useState, useEffect } from "react";
import axios from 'axios';
import { COMMENTS_API_ENDPOINT } from "./constants";

export default ({ postId }) => {
  const [comments, setComments] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${COMMENTS_API_ENDPOINT}${postId}/comments`);
      
      setComments(response.data);
    } catch (error) {
      console.log('I am error. Problem with Comments List: ', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log('comments: ', comments);

  const renderedComments = comments.map((comment) => {
    return <li key={comment.id}>{comment.content}</li>
  });

  return <ul>{renderedComments}</ul>
};
