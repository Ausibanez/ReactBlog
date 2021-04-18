import BlogList from './blog-list';
import useFetch from './use-fetch';
import './global.js'

/** using local json-server for now */
const Home = () => {
  const { data: blogs, isPending, error } = useFetch(global.urlBlogs);

  /**
  useEffect(() => {
    console.log('runs at every render');
  });
  useEffect(() => {
    console.log('runs once at first load');
  }, []);
  */

  return (
    <div className="home">
      { error && <div>{ error }</div>}
      { isPending && <div>Loading...</div>}
      {blogs && <BlogList blogs={ blogs } title="All blogs"/>}
    </div>
   );
}
 
export default Home;