import React, { useEffect, useMemo, useState } from 'react';
import Head from 'next/head';
import { Grid, Button, TextField } from '@mui/material';
import AppBar from 'components/AppBar';
import DataTable from 'components/DataTable';
import { getBlogs, getBlogsWithFilter } from 'mockServer/services';
import { useRouter } from 'next/router';
import SearchIcon from '@mui/icons-material/Search';
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
        dateCreated: blog.dateCreated,
      })),
    );
  }, []);

  const handleCreateClick = () => {
    router.push(`/${uuidv4()}`);
  };

  const handleSearch = (searchQueryString) => {
    const blogs = getBlogsWithFilter(searchQueryString);
    setTableRows(
      blogs.map((blog) => ({
        id: blog.id,
        title: blog.title,
        description: blog.description,
        dateCreated: blog.dateCreated,
      })),
    );
  };

  const [columns, data] = useMemo(() => {
    return [
      [
        {
          Header: 'Title',
          accessor: 'title',
        },
        {
          Header: 'Description',
          accessor: 'description',
        },
        {
          Header: 'Date Created',
          accessor: 'dateCreated',
        },
      ],
      tableRows,
    ];
  }, [tableRows]);

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
          <TextField
            sx={{
              width: '300px',
            }}
            placeholder="Search"
            InputProps={{
              endAdornment: <SearchIcon />,
            }}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} m={2}>
          <DataTable columns={columns} data={data} />
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
