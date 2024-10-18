import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ProjectsPage from './pages/ProjectsPage/ProjectsPage';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import SignInPage from './pages/SignInPage/SignInPage';
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
    path: '/signin',
    element: <SignInPage />,
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
