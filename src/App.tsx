import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ProjectsPage from './pages/ProjectsPage/ProjectsPage';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import NoPage from './pages/NoPage/NoPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <ProjectsPage />,
  },
  {
    path: '/signup',
    element: <SignUpPage />,
  },
  {
    path: '/*',
    element: <NoPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
