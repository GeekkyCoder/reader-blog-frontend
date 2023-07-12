import { useEffect,useState } from "react";

import { MoreHoriz } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Stack,
  SwipeableDrawer,
  Tooltip,
  Typography,
  Button,
} from "@mui/material";
import Skeleton from "../../components/Skeleton/Skeleton";

import axios from "axios";


const RightDrawerProfile = ({userId,handleClickOnUser}) => {
  const [user, setUser] = useState(null);

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
  }, [userId]);

  return (
    <>
   {user ? <Box position={'relative'} flex={2} display={{xs:"none",md:"block"}} >
        <Box
         height={"100vh"}
         position={"absolute"}
         top={"0px"}
         bottom={"0px"}
         right={"0px"}
         p={"1em"}
         overflow={"auto"}
         className="scrollbar-hidden"
         fontFamily={"sans-serif"}
         sx={{ width: 450 }}
        >
          <Box fontFamily={"inherit"} sx={{ width: "80%", mx: "auto" }} >
            <img
              width={"100px"}
              height={"100px"}
              style={{
                borderRadius: "50%",
                objectFit: "cover",
                display: "block",
                margin: "0em",
              }}
              src={user?.profileImage}
              alt={user?.name}
            />
            <Typography
              fontFamily={"inherit"}
              component={"h2"}
              variant="p"
              fontWeight={600}
              my={"1em"}
            >
              {user?.name}
            </Typography>
            <Stack direction={"row"} spacing={2}>
              <Typography
                component={"h3"}
                fontWeight={600}
                variant="p"
                color={"GrayText"}
              >
                {user?.followers?.length} followings
              </Typography>
              <Typography
                component={"h3"}
                fontWeight={600}
                variant="p"
                color={"GrayText"}
              >
                {user?.posts?.length} posts
              </Typography>
            </Stack>

            <Box my={"1em"}>
              <Typography
                fontFamily={"cursive"}
                fontWeight={600}
                lineHeight={"22px"}
                letterSpacing={"1px"}
                color={"black"}
              >
                {user?.bio || "No Bio"}
              </Typography>
            </Box>

            {user?.followers?.length > 0 && (
              <Box mt={"2em"}>
                <Typography component={"p"} fontWeight={"600"}>
                  Following
                </Typography>
                <Box>
                  {user.followers.map((follower, idx) => {
                    return (
                      <Box my={"1em"} key={follower.id}  onClick={() => handleClickOnUser(follower.id)}>
                        <Box
                          display={"flex"}
                          alignItems={"center"}
                          justifyContent={"space-between"}
                          width={"80%"}
                        >
                          <Box display={"flex"} alignItems={"center"}>
                            <Tooltip title={follower?.name}>
                              <Avatar
                               sx={{alignSelf:"flex-start",width:"60px",height:"60px"}}
                                src={follower?.profileImage}
                                alt={follower?.name}
                              ></Avatar>
                            </Tooltip>
                            <Box display={'flex'} flexDirection={'column'}>
                            <Typography
                            fontWeight={600}
                              color={"GrayText"}
                              fontFamily={"sans-serif"}
                              ml={".5em"}
                              component={"p"}
                              variant="'p"
                            >
                              {follower?.name}
                            </Typography>

                            <Box flex={1}>
                            <Typography  component={'p'} variant="p" color={'GrayText'} >{`${follower?.bio.slice(0,40)}...`}</Typography>
                            </Box>

                            </Box>
                          </Box>

            
                    
                        </Box>
                      </Box>
                    );
                  })}
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
      :
     <Skeleton/> 
      }

    </>
  );
};

export default RightDrawerProfile;
