import { useState, useEffect } from "react";
import { useHistory, useParams } from 'react-router-dom';
import useFetch from './use-fetch';
import './global.js'

const Edit = () => {
  const { id } = useParams();
  const { data: blog, error, isFetchPending } = useFetch(global.urlBlogs + id);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [body, setBody] = useState('');
  const [type, setType] = useState('insight');
  const [isPending, setIsPending] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (blog){
      setTitle(blog.title);
      setDate(blog.date);
      setBody(blog.body);
      setType(blog.type); 
    }
  }, [blog])
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const blog = { title, date, body, type };

    setIsPending(true);
        
    fetch(global.urlBlogs + id, {
      method: 'PUT',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(blog)
    }).then(() => {
      console.log(`blog id: ${id} was updated`);
      setIsPending(false);
      history.push('/blogs/' + id);
    })    
  }  

  return (
    <div className="create">
      <h2>Edit the Blog</h2>
      { isFetchPending && <div>Loading...</div> }
      { error && <div>{ error }</div> }
      { blog && (
        <form onSubmit={handleSubmit}>
          <label>Title:</label>
          <input 
            type="text"
            name="title"
            required
            value={title}          
            onChange={(e) => setTitle(e.target.value)}
          />
          <label>Date:</label>
          <input 
            type="text"
            name="date"
            required
            value={date}          
            onChange={(e) => setDate(e.target.value)}
          />
          <label>Body:</label>
          <textarea
            name="body"
            required
            value={body}          
            onChange={(e) => setBody(e.target.value)}
          ></textarea>
          <label>Type:</label>
          <select
            name="type"
            value={type}          
            onChange={(e) => setType(e.target.value)}
          >
            <option value="insight">insight</option>
            <option value="tip">tip</option>
          </select>
          { !isPending && !isFetchPending && <button>Update Blog</button>}
          { isPending && <button disabled>Updating blog...</button>}
        </form>
      )}
    </div>
   );
}
 
export default Edit;