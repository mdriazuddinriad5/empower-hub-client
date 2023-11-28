import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  RouterProvider,
} from "react-router-dom";
import Router from './Router/Router.jsx';
import SiteTheme from './Utils/SiteTheme.jsx';
import "./dark-theme.css";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import AuthProvider from './providers/AuthProvider.jsx';

const queryClient = new QueryClient()


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <SiteTheme>
          <RouterProvider router={Router} />
        </SiteTheme>
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>,
)
