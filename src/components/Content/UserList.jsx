import { Box, Typography, Tooltip, Divider, Avatar } from "@mui/material";

import { LoadingButton } from "@mui/lab";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const UserList = (props) => {
  const { profileImage, name, bio, _id } = props.user;
  const { addToFollowing, loadingAction } = props;

  const navigate = useNavigate();

  const handleClickOnUser = (userId) => {
    navigate(`/profile/${userId}`);
  };

  return (
    <>
      <Box
        sx={{ cursor: "pointer"}}
        onClick={() => handleClickOnUser(_id)}
        display={"flex"}
        my={"2em"}
        alignItems={"center"}
      >
        <Tooltip title={name}>
          <Avatar
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
            {bio || "Things aren’t on fire. Fire is on things"}
          </Typography>
        </Box>
        <LoadingButton
          loading={loadingAction}
          onClick={() => addToFollowing(_id)}
          flex={1}
          variant="outlined"
          color="inherit"
        >
          Follow
        </LoadingButton>
      </Box>
      <Divider />
    </>
  );
};

export default UserList;
