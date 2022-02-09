import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { Grid, TextField, Button, Box } from '@mui/material';
import AppBar from 'components/AppBar';
import { saveBlog, getBlog } from 'mockServer/services';

const BlogDetailsPage = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [blog, setBlog] = useState({
    id: slug,
    title: '',
    description: '',
    body: '',
  });

  useEffect(() => {
    const blog = getBlog(slug);

    if (blog) {
      setBlog(blog);
    }
  }, []);

  const handleSaveClick = () => {
    saveBlog({
      ...blog,
    });

    router.push('/');
  };

  return (
    <>
      <Head>
        <title>Create - Blog</title>
        <meta name="description" content="Create new blog" />
      </Head>
      <Grid container>
        <Grid item xs={12}>
          <AppBar />
        </Grid>
        <Grid item xs={12} mt={2} mx={2}>
          <TextField
            fullWidth
            value={blog.title}
            onChange={(event) =>
              setBlog({ ...blog, title: event.target.value })
            }
            label="Title"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} mt={2} mx={2}>
          <TextField
            fullWidth
            value={blog.description}
            onChange={(event) =>
              setBlog({ ...blog, description: event.target.value })
            }
            label="Description"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} mt={2} mx={2}>
          <TextField
            fullWidth
            multiline
            value={blog.body}
            onChange={(event) => setBlog({ ...blog, body: event.target.value })}
            rows={6}
            label="Body"
            variant="outlined"
          />
        </Grid>
        <Grid
          item
          xs={12}
          mt={2}
          mx={2}
          display="flex"
          justifyContent="flex-end"
        >
          <Box ml={1}>
            <Button onClick={() => router.push('/')} variant="contained">
              Back
            </Button>
          </Box>
          <Box ml={1}>
            <Button onClick={handleSaveClick} variant="contained">
              Save
            </Button>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default BlogDetailsPage;
