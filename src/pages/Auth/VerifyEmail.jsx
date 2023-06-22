import {useEffect,useState} from "react"

import {Link, useLocation} from "react-router-dom"


import axios from "axios"

const VerifyPage = () => {

    function useQuery() {
        return new URLSearchParams(useLocation().search);
      }

    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const query = useQuery();
  
    const verifyToken = async () => {
      setLoading(true);
      try {
        const { data } = await axios.post('https://reader-blogging-web.onrender.com/api/v1/auth/verify-email', {
          verificationToken: query.get('token'),
          email: query.get('email'),
        },{
          withCredentials:true
        });
        setLoading(false)
        setError(false)
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
  
    useEffect(() => {
        verifyToken();
    }, []);
  
    if (loading) {
      return (
        <div >
          <h2>Loading...</h2>
        </div>
      );
    }
  
    if (error) {
      return (
        <div>
          <h4>There was an error, please double check your verification link </h4>
        </div>
      );
    }
  
    return (
      <div className='page'>
        <h2>Account Confirmed</h2>
        <Link to='/auth' className='btn'>
          Please login
        </Link>
      </div>
    );
  };
  

  export default VerifyPage;
  