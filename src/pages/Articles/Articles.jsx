import {
  Autocomplete,
  Stack,
  TextField,
  Box,
  Container,
  Avatar,
  Typography,
  Divider,
  Chip,
  Tooltip,
  IconButton,
  Tab,
} from "@mui/material";

// import { Routes, Route } from "react-router-dom";

import axios from "axios";

import "./article.css";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  blogsSelector,
  loadingSelector,
} from "../../store/blogs/blogs.selector";
import {
  FETCH_BLOGS_FAILED,
  FETCH_BLOGS_START,
  FETCH_BLOGS_SUCCESS,
} from "../../store/blogs/blogs.actions";
import ArticlesModals from "./ArticlesModal";

import Skeleton from "../../components/Skeleton/Skeleton";

import { ArticleContainer, FormContainer } from "./ArticlesModalStyles";
import { BookmarkAddOutlined } from "@mui/icons-material";

import { useNavigate } from "react-router-dom";
import { formatDate } from "../../utils/convertToDate";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { shuffleArray } from "../../utils/shuffleArray";

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

const Articles = () => {
  const [tag, setTag] = useState("");
  const [filter, setFilter] = useState("");
  const [activeTab, setActiveTab] = useState("1");
  // const [currentPage, setCurrentPage] = useState(1);
  const [fetchNewOnCreate, setFetchNewOnCreate] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const blogs = useSelector(blogsSelector);
  const isBlogsLoading = useSelector(loadingSelector);

  useEffect(() => {
    const fetchAllBlogs = async () => {
      dispatch(FETCH_BLOGS_START());
      try {
        const { data } = await axios.get(
          `http://localhost:8000/api/v1/posts/allPosts?tags=${tag}&sort=${filter}`,
          {
            withCredentials: true,
          }
        );
       const shuffledArray = shuffleArray(data?.blogs || [])
        dispatch(FETCH_BLOGS_SUCCESS(shuffledArray));
      } catch (err) {
        dispatch(FETCH_BLOGS_FAILED(err?.response?.data?.msg));
      }
    };

    const fetchFollowerBlogs = async () => {
      dispatch(FETCH_BLOGS_START());
      try {
        const { data } = await axios.get(
          "http://localhost:8000/api/v1/posts/followerposts",
          {
            withCredentials: true,
          }
        );
        const shuffledArray = shuffleArray(data?.posts || [])
        dispatch(FETCH_BLOGS_SUCCESS(shuffledArray));
      } catch (err) {
        dispatch(FETCH_BLOGS_FAILED(err?.response?.data?.msg));
      }
    };

    if (activeTab === "1") {
      fetchAllBlogs();
    }

    if (activeTab === "2") {
      fetchFollowerBlogs();
    }
  }, [tag, filter, fetchNewOnCreate, activeTab]);

  const handleClickOnBlog = (blogId) => {
    navigate(`/content/blog/${blogId}`);
  };

  const handleTabChange = (e, newValue) => {
    setActiveTab(newValue);
  };

  const blogsJsx = () => {
    return <>
      {!isBlogsLoading ? (
        <Box>
          {blogs &&
            blogs.map((blog) => {
              return (
                <Container
                  key={blog._id}
                  onClick={() => handleClickOnBlog(blog._id)}
                >
                  <Stack direction={"column"} py={"2em"} px={".5em"} pb={"1em"}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        mb: { xs: "1em", sm: "0em" },
                      }}
                    >
                      <Avatar src={blog.profileImage} alt={blog.name} />
                      <Typography
                        ml={{ xs: ".5em", sm: "1em" }}
                        component={"h3"}
                        variant="p"
                        fontWeight={600}
                      >
                        {blog.name}
                      </Typography>
                    </Box>

                    <Stack
                      direction={{ xs: "column", sm: "row" }}
                      justifyContent={"space-between"}
                      alignItems={{ xs: "start", sm: "center" }}
                      display={"flex"}
                    >
                      <Box flex={5} order={{ xs: 2, sm: 1 }}>
                        <Typography
                          component={"h2"}
                          my={{ xs: "1em", sm: ".5em" }}
                          variant="p"
                          fontWeight={800}
                        >
                          {blog.title}
                        </Typography>
                        <Typography
                          mr={".5em"}
                          className="fade-description fade-description-lines"
                          component={"p"}
                        >
                          {blog.description}
                        </Typography>

                        <Stack
                          my={"1em"}
                          direction={"row"}
                          alignItems={"center"}
                          display={"flex"}
                          justifyContent={"space-between"}
                        >
                          <Chip
                            variant="filled"
                            label={blog.tags}
                            size="large"
                          />
                          <Box
                            alignSelf={"flex-end"}
                            display={"flex"}
                            alignItems={"center"}
                            justifyContent={"space-between"}
                          >
                            <Typography
                              display={{ xs: "none", sm: "block" }}
                              color={"GrayText"}
                              fontSize={"15px"}
                            >
                              {formatDate(blog.createdAt)}
                            </Typography>

                            <Tooltip
                              title={"save"}
                              sx={{ ml: "1em", mr: "1em" }}
                            >
                              <IconButton>
                                <BookmarkAddOutlined />
                              </IconButton>
                            </Tooltip>
                          </Box>
                        </Stack>
                      </Box>

                      <Box flex={2} order={{ xs: 1, sm: 2 }}>
                        <img
                          className="blog-image"
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
        </Box>
      ) : (
        <Skeleton />
      )}
    </>;
  };

  return (
    <>
      <ArticlesModals setFetchNewOnCreate={setFetchNewOnCreate} />
      <ArticleContainer p={{ xs: "0em", sm: "2em" }}>
        <FormContainer
          sx={{ my: "2em", px: { xs: "1em", sm: "2em" } }}
          component={"form"}
        >
          <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent={"right"}
            alignItems={"center"}
          >
            <Autocomplete
              value={tag}
              // inputValue={tags}
              fontFamily={"inherit"}
              size="medium"
              onChange={(e, value) => {
                setTag(value);
              }}
              name="tags"
              options={tagsOptions}
              sx={{
                width: 200,
                mr: { xs: "0em", sm: "2em" },
                mb: { xs: "1em", sm: "0em" },
              }}
              renderInput={(params) => (
                <TextField {...params} label="catogories" />
              )}
            />

            <Autocomplete
              value={filter}
              // inputValue={view}
              fontFamily={"inherit"}
              size="medium"
              onChange={(e, value) => {
                setFilter(value);
              }}
              name="filter"
              options={filterOptions}
              sx={{ width: 200 }}
              renderInput={(params) => (
                <TextField {...params} label="sort by" />
              )}
            />
          </Stack>
        </FormContainer>

        <Box my={"2em"}>
          <TabContext value={activeTab}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList onChange={handleTabChange} aria-label="tabs">
                <Tab label="All" value="1" />
                <Tab label="Followings" value="2" />
              </TabList>
            </Box>
            <TabPanel value="1">{blogsJsx()}</TabPanel>
            <TabPanel value="2">{blogsJsx()}</TabPanel>
          </TabContext>

          {!isBlogsLoading && blogs?.length === 0 && (
            <Typography
              my={"1em"}
              variant="h3"
              component={"p"}
              fontWeight={800}
              textAlign={"center"}
            >
              No Blogs Found
            </Typography>
          )}
        </Box>
      </ArticleContainer>
    </>
  );
};

export default Articles;
