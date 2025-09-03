import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button, TextField, List, ListItem, ListItemText, Checkbox, IconButton, CircularProgress } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify';
import api from '../services/api';

const DashboardPage = () => {
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [loading, setLoading] = useState(true); // State to track loading
  const navigate = useNavigate();

  // Fetch tasks when the component loads
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await api.get('/tasks');
        setTasks(response.data);
      } catch (error) {
        toast.error('Could not fetch tasks. Please log in again.');
        handleLogout();
      } finally {
        setLoading(false); // Stop loading after fetch is complete
      }
    };

    fetchTasks();
  }, []);

  // Handler to add a new task
  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) {
      toast.warn('Task title cannot be empty.');
      return;
    }

    try {
      const response = await api.post('/tasks', { title: newTaskTitle });
      setTasks([...tasks, response.data]);
      setNewTaskTitle('');
      toast.success('Task added successfully!');
    } catch (error) {
      toast.error('Failed to add task.');
    }
  };

  // Handler to toggle task completion
  const handleToggleComplete = async (id, completed) => {
    try {
      const response = await api.put(`/tasks/${id}`, { completed: !completed });
      setTasks(tasks.map(task => (task._id === id ? response.data : task)));
      toast.info(`Task marked as ${!completed ? 'complete' : 'pending'}.`);
    } catch (error) {
      toast.error('Failed to update task.');
    }
  };

  // Handler to delete a task
  const handleDeleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks(tasks.filter(task => task._id !== id));
      toast.info('Task deleted.');
    } catch (error) {
      toast.error('Failed to delete task.');
    }
  };

  // Handler for logging out
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <Box sx={{ padding: { xs: 2, sm: 4 }, maxWidth: '700px', margin: 'auto' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1">
          Your Tasks
        </Typography>
        <Button variant="outlined" onClick={handleLogout}>
          Logout
        </Button>
      </Box>

      {/* Form to add a new task */}
      <Box component="form" onSubmit={handleAddTask} sx={{ display: 'flex', mb: 4 }}>
        <TextField
          label="Add a new task..."
          variant="outlined"
          fullWidth
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          sx={{ mr: 2 }}
        />
        <Button type="submit" variant="contained" sx={{ whiteSpace: 'nowrap' }}>Add Task</Button>
      </Box>

      {/* Conditional Rendering for Task List */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
          <CircularProgress />
        </Box>
      ) : tasks.length === 0 ? (
        <Typography sx={{ textAlign: 'center', mt: 8, color: 'text.secondary' }}>
          You have no tasks yet. Add one to get started!
        </Typography>
      ) : (
        <List>
          {tasks.map((task) => (
            <ListItem
              key={task._id}
              secondaryAction={
                <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteTask(task._id)}>
                  <DeleteIcon />
                </IconButton>
              }
              disablePadding
              sx={{
                mb: 1,
                bgcolor: 'background.paper',
                borderRadius: 2,
                boxShadow: 1,
              }}
            >
              <Checkbox
                edge="start"
                checked={task.completed}
                onChange={() => handleToggleComplete(task._id, task.completed)}
              />
              <ListItemText 
                primary={task.title} 
                sx={{ textDecoration: task.completed ? 'line-through' : 'none', color: task.completed ? 'text.secondary' : 'text.primary' }}
              />
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default DashboardPage;
