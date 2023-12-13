import React, { useState } from 'react';
import axios from 'axios';
import { COMMENTS_API_ENDPOINT } from './constants';

const CommentCreate = ({ postId }) => {
  const [content, setContent] = useState('');

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const resposne = await axios.post(`${COMMENTS_API_ENDPOINT}${postId}/comments`, {
        content
      });

      setContent('');
    } catch (error) {
      console.log('I am error. Problem with Comment Create: ', error);
    }
  }

  return(
    <div>
      <form
        onSubmit={onSubmit}
      >
        <div className="form-group">
          <label>New Comment</label>
          <input
            className='form-control'
            onChange={(event) => setContent(event.target.value)}
            value={content}
          />
        </div>
        <button className='btn btn-primary'>Submit</button>
      </form>
    </div>
  )
};


export default CommentCreate;
