import React, { useState} from 'react';
import axios from 'axios';
import { useNavigate,useParams} from 'react-router-dom';
import "./post.scss"
import Spinner from 'react-bootstrap/Spinner';
function Post() {
  const [caption, setCaption] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const params = useParams();
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData();
    formData.append('caption', caption);
    formData.append('image', image);
    formData.append('uid', params.id);
     try {
       const res = await axios.post('http://localhost:8000/upload', formData);
   
       if (res.data.message === 'Image uploaded successfully') {
         // Navigate to home
         navigate('/readposts'); // 👈 redirect to homepage
       }
     } catch (err) {
       console.error('Upload failed:', err);
       alert('Something went wrong da 😢');
     }
     finally
     {
       setLoading(false);
     }
   
  };

  

  return (
    <div style={{ padding: '20px' }} className='bigform'>
      <h3>Upload Image with Caption</h3>
      <form onSubmit={handleSubmit}>
       
        <input
          type="file"
          accept="image/*"
          onChange={e => setImage(e.target.files[0])}
          required
        />
         <input className='text'
          type="text"
          placeholder="Caption"
          maxLength={28}
          value={caption}
          onChange={e => setCaption(e.target.value)}
          required
        />
        <button type="submit">
          {loading?(<Spinner animation="border" role="status" size='sm'>
      <span className="visually-hidden">Loading...</span>
    </Spinner>):("Upload")}
        </button>
      </form>
    </div>
  );
}

export default Post;
