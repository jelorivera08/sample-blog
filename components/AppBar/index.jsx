import * as React from 'react';
import AppBarMUI from '@mui/material/AppBar';
import { Toolbar, Typography, Box } from '@mui/material';
import { useRouter } from 'next/router';

const AppBar = () => {
  const router = useRouter();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBarMUI position="static">
        <Toolbar>
          <Typography
            sx={{ cursor: 'pointer' }}
            onClick={() => router.push('/')}
            variant="h6"
            component="div"
          >
            Blogs
          </Typography>
        </Toolbar>
      </AppBarMUI>
    </Box>
  );
};

export default AppBar;
