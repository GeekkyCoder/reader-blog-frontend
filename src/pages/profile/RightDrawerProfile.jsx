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


const RightDrawerProfile = ({ user }) => {

  return (
    <Box>
      <SwipeableDrawer
        anchor={"right"}
        open={true}
        hideBackdrop={true}
        sx={{ zIndex: -20 }}
      >
        <Box
          fontFamily={"sans-serif"}
          sx={{ width: 450, position: "relative", top: "8rem" }}
        >
          <Box fontFamily={"inherit"} sx={{ width: "80%", mx: "auto" }}>
            <img
              width={"70px"}
              height={"70px"}
              style={{
                borderRadius: "50%",
                objectFit: "cover",
                display: "block",
                margin: "0em",
              }}
              src={user?.profileImage}
              alt={user.name}
            />
            <Typography
              fontFamily={"inherit"}
              component={"h3"}
              variant="p"
              fontWeight={600}
              my={"1em"}
            >
              {user?.name}
            </Typography>
            <Stack direction={"row"} spacing={2}>
              <Typography
                component={"h4"}
                fontWeight={400}
                variant="p"
                color={"GrayText"}
              >
                {user?.followers?.length} followers
              </Typography>
              <Typography
                component={"h4"}
                fontWeight={400}
                variant="p"
                color={"GrayText"}
              >
                {user?.posts?.length} posts
              </Typography>
            </Stack>

            <Box my={"1em"}>
              <Typography
                fontWeight={400}
                lineHeight={"22px"}
                letterSpacing={"1px"}
                color={"GrayText"}
                fontFamily={"sans-serif"}
              >
                {user?.bio || "No Bio"}
              </Typography>
            </Box>

            {user.followers.length > 0 && (
              <Box mt={"2em"}>
                <Typography component={"p"} fontWeight={"600"}>
                  Following
                </Typography>
                <Box>
                  {user.followers.map((follower, idx) => {
                    return (
                      <Box my={"1em"} key={follower.id}>
                        <Box
                          display={"flex"}
                          alignItems={"center"}
                          justifyContent={"space-between"}
                          width={"80%"}
                        >
                          <Box display={"flex"} alignItems={"center"}>
                            <Tooltip title={follower?.name}>
                              <Avatar
                                src={follower.profileImage}
                                alt={follower.name}
                              ></Avatar>
                            </Tooltip>
                            <Typography
                              color={"GrayText"}
                              fontFamily={"sans-serif"}
                              ml={".5em"}
                              component={"p"}
                              variant="'p"
                            >
                              {follower.name}
                            </Typography>
                          </Box>

                          <Button
                            variant="text"
                            startIcon={
                              <MoreHoriz
                                sx={{ color: "GrayText", fontWeight: 800 }}
                               
                              />
                            }
                          ></Button>
                    
                        </Box>
                      </Box>
                    );
                  })}
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      </SwipeableDrawer>
    </Box>
  );
};

export default RightDrawerProfile;
