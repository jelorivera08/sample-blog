import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import {
  Grid,
  TextField,
  Button,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import AppBar from 'components/AppBar';
import { saveBlog, getBlog, deleteBlog } from 'mockServer/services';

const BlogDetailsPage = () => {
  const router = useRouter();
  const [errors, setErrors] = useState([]);
  const [modal, setModal] = useState({
    open: false,
    payload: '',
  });

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
    let hasError = false;

    if (!blog.title) {
      hasError = true;
      setErrors((s) => [...s, 'title']);
    } else {
      hasError = false;
      setErrors((s) => s.filter((e) => e !== 'title'));
    }

    if (!blog.body) {
      hasError = true;
      setErrors((s) => [...s, 'body']);
    } else {
      hasError = false;
      setErrors((s) => s.filter((e) => e !== 'body'));
    }

    if (hasError) {
      return;
    }

    saveBlog({
      ...blog,
    });

    router.push('/');
  };

  const handleCloseModal = () => {
    setModal({ open: false, payload: '' });
  };

  const handleConfirmModal = () => {
    deleteBlog(modal.payload);
    handleCloseModal();
    router.push('/');
  };

  const handleDeleteRowClick = () => {
    setModal({ open: true, payload: slug });
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
            error={Boolean(errors.includes('title'))}
            value={blog.title}
            onChange={(event) =>
              setBlog({ ...blog, title: event.target.value })
            }
            helperText={
              Boolean(errors.includes('title')) && 'Title body is required'
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
            error={Boolean(errors.includes('body'))}
            helperText={
              Boolean(errors.includes('body')) && 'Blog body is required'
            }
            onChange={(event) => setBlog({ ...blog, body: event.target.value })}
            rows={6}
            label="Body"
            variant="outlined"
          />
        </Grid>
        <Grid item p={2} xs={6} display="flex" justifyContent="flex-start">
          <Box>
            <Button
              color="error"
              onClick={handleDeleteRowClick}
              variant="contained"
            >
              Delete
            </Button>
          </Box>
        </Grid>
        <Grid item p={2} xs={6} display="flex" justifyContent="flex-end">
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
      <Dialog open={modal.open} onClose={handleCloseModal}>
        <DialogTitle id="alert-dialog-title">Delete this blog?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to perform this action?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancel</Button>
          <Button onClick={handleConfirmModal} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default BlogDetailsPage;
