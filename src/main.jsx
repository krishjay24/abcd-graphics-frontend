import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RedirectComponent from './components/RedirectComponent.jsx';
import Login from './components/pages/Login.jsx';
import Admin from './components/pages/Admin.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import EditApps from './components/backend/EditApps.jsx';
import EditProjects from './components/backend/EditProjects.jsx';
import Home from './pages/Home.jsx';
import './styles/App.css';
import './styles/output.css';
import ProjectView from './components/layout/ProjectView.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
