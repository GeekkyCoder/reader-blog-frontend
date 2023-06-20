import { useState, useEffect, useCallback } from "react";

import { Box, Typography, Button } from "@mui/material";

import { AwesomeText, ButtonsContainer } from "./LandingPageStyles";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { currentUserSelector } from "../../store/user/userSelector";

// slick library for landing page carousels
import Slider from "react-slick";
import { LazyLoadImage } from "react-lazy-load-image-component";

import LandingPageImage from "../../Assets/landing-page-main.jpg";
import LandingPageImage2 from "../../Assets/landing-page-main-2.jpg";
import LandingPageImage3 from "../../Assets/landing-page-main-3.jpg";

import "./slider.css";

import axios from "axios";

// import Typewriter from "typewriter-effect";

const sliderSettings = {
  dots: true,
  infinite: true,
  autoplay: true,
  speed: 2000,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  dots: false,
  swipeToSlide: true,
  centerPadding: "50px",
};

const LandingPage = () => {
  const [unsplashImages, setUnsplashImages] = useState([
    { imageSrc: "", user: {} },
  ]);

  const navigate = useNavigate();

  const currentUser = useSelector(currentUserSelector);

  const handleBlogsClick = useCallback(() => {
    navigate("/content");
  },[]);

  const fetchImagesFromUnsplash = useCallback(async () => {
    let results;
    let imagesPayload = { imageData: [] };
    const unsplash_url = `https://api.unsplash.com/search/photos?query=nature&orientation=landscape&client_id=RnRdjYOOGF3VMlN773x5grn8lAv6YbsPJ8qUY5bgAVw `;
    try {
      const { data } = await axios.get(unsplash_url);

      results = data.results;
      results.forEach((result) => {
        imagesPayload.imageData.push({
          imageSrc: result.urls.full,
          description: result.description,
          user: result.user,
        });
      });

      setUnsplashImages(imagesPayload.imageData);
    } catch (err) {
      console.log(err);
    }
  },[]);

  useEffect(() => {
    fetchImagesFromUnsplash();
  }, []);

  const randomIndex = Math.floor(Math.random() * unsplashImages.length) || 0;

  return (
    <>
      <Box
        sx={{
          backgroundImage: `url(
            ${unsplashImages[randomIndex]?.imageSrc}
          )`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundBlendMode: "multiply",
          backgroundColor: "GrayText",
          height:{xs:'150vh',sm:'800px'},
          padding: "2em",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box flex={2} sx={{ order: { xs: 2, sm: 1 } }}>
            <AwesomeText
              fontWeight={"bold"}
              variant="h2"
              component={"h1"}
              color={"white"}
            >
              Where great{" "}
              <Typography component={"span"} className="span" variant="span">
                minds
              </Typography>{" "}
              write awesome{" "}
              <Typography
                component={"span"}
                className="blogText"
                variant="span"
              >
                blogs
              </Typography>{" "}
              <Typography component={"span"} className="span" variant="span">
                priceless
              </Typography>
            </AwesomeText>

            <Box mt={"1em"}>
              <Typography variant="p" component={"p"} color={"white"}>
                Find, explore and learn in an awesome place
              </Typography>
              <Typography
                variant="p"
                component={"p"}
                color={"white"}
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
            <Slider className="slider-container" {...sliderSettings}>
              <Box>
                <LazyLoadImage
                  style={{
                    borderRadius: { xs: 0, sm: "25px" },
                    height: "500px",
                  }}
                  width={"100%"}
                  src={LandingPageImage}
                  alt="landing-page"
                />
              </Box>
              <Box>
                <LazyLoadImage
                  style={{
                    borderRadius: { xs: 0, sm: "25px" },
                    height: "500px",
                  }}
                  width={"100%"}
                  src={LandingPageImage2}
                  alt="landing-page"
                />
              </Box>
              <Box>
                <LazyLoadImage
                  style={{
                    borderRadius: { xs: 0, sm: "25px" },
                    height: "500px",
                  }}
                  width={"100%"}
                  src={LandingPageImage3}
                  alt="landing-page"
                />
              </Box>
            </Slider>
          </Box>
        </Box>

        <Box>
          <Typography
            textAlign={"center"}
            mt={"4em"}
            mb={'2em'}
            fontSize={"1.5rem"}
            fontFamily={"monospace"}
            color="whitesmoke"
            component={"p"}
            variant="p"
          >
            {unsplashImages[randomIndex]?.description}
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default LandingPage;
