import { useHistory, useParams } from "react-router";
import useFetch from './use-fetch';
import { Link } from 'react-router-dom';
import './global.js'

const BlogDetails = () => {
  const { id } = useParams();
  const { data: blog, error, isPending } = useFetch(global.urlBlogs + id);
  const history = useHistory();

  const handleDeleteClick= () => {
    fetch(global.urlBlogs + blog.id, {
      method: 'DELETE'
    }).then(() => {
      history.push('/');
    })
  }

  return ( 
    <div className="blog-details">
      { isPending && <div>Loading...</div> }
      { error && <div>{ error }</div> }
      { blog && (
        <article>
          <h2>{ blog.title }</h2>
          <p>{ blog.date }</p>
          <div>{ blog.body }</div>
          <Link to={`/edit/${blog.id}`}>
            <button>edit</button>
          </Link>
          <button id="deleteButton" onClick={ () => { 
            if (window.confirm('Delete this blog, are you sure?')) {
              handleDeleteClick();
            }
          } }>delete</button>
        </article>
      )}
    </div>
   );
}
 
export default BlogDetails;