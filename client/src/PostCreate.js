import React, { useState } from "react";
import axios from 'axios';
import { POST_CREATE_API_ENDPOINT } from "./constants";

const PostCreate = () => {
  const [title, setTitle] = useState('');

  const onSubmit = async (event) => {
    event.preventDefault();

    await axios.post(POST_CREATE_API_ENDPOINT, {
      title
    });

    setTitle('');
  }

  return(
    <div>
      <form
        onSubmit={(onSubmit)}
      >
        <div className="form-group">
          <label>Title</label>
          <input
            className="form-control"
            onChange={(event) => setTitle(event.target.value)}
            style={{marginBottom: '10px'}}
            value={title}
          />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default PostCreate;
