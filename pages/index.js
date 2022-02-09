import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { Grid, Button } from '@mui/material';
import AppBar from 'components/AppBar';
import DataTable from 'components/DataTable';
import { getBlogs } from 'mockServer/services';
import { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';

export default function Home() {
  const [tableRows, setTableRows] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const blogs = getBlogs();

    setTableRows(
      blogs.map((blog) => ({
        id: blog.id,
        title: blog.title,
        description: blog.description,
      })),
    );
  }, []);

  const handleCreateClick = () => {
    router.push(`/${uuidv4()}`);
  };

  return (
    <>
      <Head>
        <title>Jelo&apos;s two cents</title>
        <meta name="description" content="I am a blog app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Grid container>
        <Grid item xs={12}>
          <AppBar />
        </Grid>
        <Grid item xs={12} m={2}>
          <DataTable
            headCells={['Title', 'Description']}
            bodyCells={tableRows}
          />
        </Grid>
        <Grid item xs={12} mx={2} display="flex" justifyContent="flex-end">
          <Button onClick={handleCreateClick} variant="contained">
            Create
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
