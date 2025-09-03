import { AppBar, Toolbar, Typography, Container, Box } from '@mui/material';
import TaskAltIcon from '@mui/icons-material/TaskAlt';

const Layout = ({ children }) => {
  return (
    <Box sx={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1d2671 0%, #0d1117 100%)', // Modern gradient
    }}>
      <AppBar position="static" color="transparent" elevation={0} sx={{ backdropFilter: 'blur(10px)' }}>
        <Toolbar>
          <TaskAltIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Task Manager
          </Typography>
        </Toolbar>
      </AppBar>
      <Container component="main" sx={{ pt: 4, pb: 4 }}>
        {children}
      </Container>
    </Box>
  );
};

export default Layout;