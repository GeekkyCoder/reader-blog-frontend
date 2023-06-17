import {
  Autocomplete,
  Avatar,
  Box,
  Container,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

// import { Routes, Route } from "react-router-dom";

import axios from "axios";

import "./article.css";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BlogsData from "../../Blogs_MOCK_DATA.json";

import {
  blogsSelector,
  loadingSelector,
  errorSelector,
  isModalOpenSelector,
} from "../../store/blogs/blogs.selector";
import {
  FETCH_BLOGS_FAILED,
  FETCH_BLOGS_START,
  FETCH_BLOGS_SUCCESS,
} from "../../store/blogs/blogs.actions";
import ArticlesModals from "./ArticlesModal";

import Skeleton from "../../components/Skeleton/Skeleton";

import { ArticleContainer, FormContainer } from "./ArticlesModalStyles";

const Articles = () => {
  const dispatch = useDispatch();

  const blogs = useSelector(blogsSelector);

  const [formFields, setFormFields] = useState({
    tags: "",
    filter: "",
  });

  const tagsOptions = [
    "technology",
    "science",
    "politics",
    "history",
    "health and fitness",
    "coding",
    "general",
  ];

  const filterOptions = ["oldest", "newest"];

  // const blogsError = useSelector(errorSelector);
  // const isBlogsLoading = useSelector(loadingSelector);

  useEffect(() => {
    const fetchAllBlogs = async () => {
      dispatch(FETCH_BLOGS_START());
      try {
        const { data } = await axios.get("/api/v1/posts/allPosts");
        dispatch(FETCH_BLOGS_SUCCESS(data.posts));
      } catch (err) {
        console.log(err);
        dispatch(FETCH_BLOGS_FAILED(err.response.data.msg));
      }
    };

    fetchAllBlogs();
  }, []);

  const handleFormFieldsChange = () => {
    // send request every timw i play with these fields!
    //todo
  };

  return (
    <>
      <ArticlesModals />
      <ArticleContainer p={"2em"}>
        <FormContainer sx={{ my: "2em", px: "2em" }} component={"form"}>
          <Stack
            direction={"row"}
            justifyContent={"right"}
            alignItems={"center"}
          >
            <Autocomplete
              //  value={tags}
              // inputValue={tags}
              fontFamily={"inherit"}
              size="medium"
              onInputChange={handleFormFieldsChange}
              name="tags"
              options={tagsOptions}
              sx={{ width: 200, mr: "2em" }}
              renderInput={(params) => (
                <TextField {...params} label="catogories" />
              )}
            />

            <Autocomplete
              // inputValue={view}
              fontFamily={"inherit"}
              size="medium"
              onInputChange={handleFormFieldsChange}
              name="filter"
              options={filterOptions}
              sx={{ width: 200 }}
              renderInput={(params) => (
                <TextField {...params} label="sort by" />
              )}
            />
          </Stack>
        </FormContainer>

        {blogs.map((blog) => {
          return (
            <Container>
              <Stack direction={"column"}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Avatar src={blog.profileImage} alt={blog.name} />
                  <Typography component={"h4"}>{blog.name}</Typography>
                </Box>

                <Stack
                  direction={"row"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                >
                  <Box flex={5}>
                    <Typography component={"h2"} variant="p" fontWeight={800}>
                      {blog.title}
                    </Typography>
                    <Typography className="fade-description" component={"p"}>
                      {blog.description}
                    </Typography>
                  </Box>
                  <Box flex={2}>
                    <img
                      width={"150px"}
                      height={"150px"}
                      style={{ objectFit: "cover" }}
                      src={blog.image}
                      alt={blog.title}
                    />
                  </Box>
                </Stack>

                <Divider />
              </Stack>
            </Container>
          );
        })}
      </ArticleContainer>
    </>
  );
};

export default Articles;
