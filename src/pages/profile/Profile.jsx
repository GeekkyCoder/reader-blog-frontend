import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Box } from "@mui/material";

import RightDrawerProfile from "./RightDrawerProfile";

const Profile = () => {
  const [user, setUser] = useState(null);

  const { userId } = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:8000/api/v1/auth/user?userId=${userId}`,
          {
            withCredentials: true,
          }
        );
        setUser(data.user);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUser();
  }, []);

  return <>
   {user &&
     <RightDrawerProfile user={user}/>
   }
   </>;
};

export default Profile;
