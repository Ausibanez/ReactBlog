import { useState } from "react";
import { useHistory } from 'react-router-dom';

const Create = () => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [body, setBody] = useState('');
  const [type, setType] = useState('insight');
  const [isPending, setIsPending] = useState(false);
  const history = useHistory();

  const handleSubmit = (e) => {
    /** prevents page refresh */
    e.preventDefault();
    const blog = { title, date, body, type };

    setIsPending(true);
        
    fetch('http://localhost:8000/blogs', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(blog)
    }).then(() => {
      console.log('blog was added');
      setIsPending(false);
      /** history.go(-1); */
      history.push('/');
    })    
  }

  return ( 
    <div className="create">
      <h2>Add a New Blog</h2>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input 
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Date:</label>
        <input 
          type="text"
          required
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <label>Body:</label>
        <textarea
          required
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
        <label>Type:</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="insight">insight</option>
          <option value="tip">tip</option>
        </select>
        { !isPending && <button>Add Blog</button>}
        { isPending && <button disabled>Adding blog...</button>}
      </form>
    </div>
   );
}
 
export default Create;