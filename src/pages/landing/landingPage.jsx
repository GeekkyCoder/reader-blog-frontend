import { Box, Container, Typography, Button } from "@mui/material";

import LandingPageImage from "../../Assets/landing-page-main.jpg";
import { AwesomeText, ButtonsContainer } from "./LandingPageStyles";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { currentUserSelector } from "../../store/user/userSelector";

export const LandingPage = () => {
  const navigate = useNavigate();

  const currentUser = useSelector(currentUserSelector)


  const handleBlogsClick = () => {
    navigate("/content");
  };

  return (
    <>
      <Container sx={{ mt: "2em" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box flex={1} sx={{ order: { xs: 2, sm: 1 } }}>
            <AwesomeText
              fontWeight={"bold"}
              variant="h2"
              component={"h1"}
              color={"CaptionText"}
            >
              Where great{" "}
              <Typography component={"span"} className="span" variant="span">
                minds
              </Typography>{" "}
              write awesome    <Typography component={"span"} className="blogText" variant="span">
                blogs
              </Typography>{" "}
              <Typography component={"span"} className="span" variant="span">
                priceless
              </Typography>
            </AwesomeText>

            <Box mt={"1em"}>
              <Typography variant="p" component={"p"} color={"GrayText"}>
                Find, explore and learn in an awesome place
              </Typography>
              <Typography
                variant="p"
                component={"p"}
                color={"GrayText"}
                mt={".5em"}
              >
                Find, explore and learn in great way
              </Typography>
            </Box>

            <ButtonsContainer
              direction={"row"}
              spacing={{ sm: 2, xs: 0 }}
              mt={"2em"}
            >
              <Button
                sx={{ width: { xs: "100%", sm: "150px" } }}
                variant="contained"
                color="secondary"
                onClick={handleBlogsClick}
              >
                Blogs
              </Button>
              {!currentUser && (
                <Button
                  sx={{
                    width: { xs: "100%", sm: "150px" },
                    marginTop: { xs: "20px" },
                  }}
                  variant="contained"
                  color="primary"
                  onClick={() => navigate("/auth")}
                >
                  Sign up
                </Button>
              )}
            </ButtonsContainer>
          </Box>
          <Box flex={1} sx={{ order: { xs: 1, sm: 2 } }}>
            <img
              style={{ borderRadius: { xs: 0, sm: "25px" } }}
              width={"100%"}
              src={LandingPageImage}
              alt="landing-page"
            />
          </Box>
        </Box>
      </Container>
    </>
  );
};
