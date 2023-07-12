import { Box, Typography, Tooltip, Divider, Avatar, Button } from "@mui/material";

import { useNavigate } from "react-router-dom";

const UserList = (props) => {
  const { profileImage, name, bio, _id } = props.user;
  const { addToFollowing } = props;

  const navigate = useNavigate();

  const handleClickOnUser = (userId) => {
    navigate(`/profile/${userId}`);
  };


  return (
    <>
      <Box
        sx={{ cursor: "pointer"}}
        display={"flex"}
        my={"2em"}
        alignItems={"center"}
      >
        <Tooltip title={name}>
          <Avatar 
           onClick={() => handleClickOnUser(_id)}
            sx={{ width: 24, height: 24, alignSelf: "flex-start" }}
            flex={1}
            src={profileImage}
            alt={name}
          ></Avatar>
        </Tooltip>
        <Box ml={"1em"} flex={1.5}>
          <Typography variant="p" component={"h3"} fontWeight={800}>
            {name}
          </Typography>
          <Typography
            lineHeight={"30px"}
            color={"GrayText"}
            component={"p"}
            variant="p"
          >
            {`${bio.slice(0,30)}...` || "Things aren’t on fire. Fire is on things"}
          </Typography>
        </Box>
        <Tooltip title={`follow ${name} to see their posts`}>
        <Button
          onClick={() => addToFollowing(_id)}
          flex={1}
          variant="outlined"
          color="inherit"
        >
          Follow
        </Button>
        </Tooltip>
      </Box>
      <Divider />
    </>
  );
};

export default UserList;
