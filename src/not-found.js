import { Link } from 'react-router-dom'

/** needs improvement */
const NotFound = () => {
  return ( 
    <div className="not-found">
      <h2>Sorry</h2>
      <p>The page cannot be found</p>
      <Link to='/'>Back to the home page...</Link>
    </div>
   );
}
 
export default NotFound;