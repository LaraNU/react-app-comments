import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ProjectsPage from './pages/ProjectsPage/ProjectsPage';
import SignUpPage from './pages/SignUpPage/SignUpPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <ProjectsPage />,
  },
  {
    path: '/signup',
    element: <SignUpPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
