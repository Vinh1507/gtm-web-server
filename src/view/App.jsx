import { BrowserRouter, Routes as ReactRouterRoutes, Route } from 'react-router-dom';
import NotFoundComponent from './pages/NotFound.jsx';
import Navigation from './components/Navigation.jsx';
import DomainListing from './components/contest/DomainListing.jsx';
import DomainDetail from './components/contest/DomainDetail.jsx';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <ToastContainer />
      <ReactRouterRoutes>
        <Route path="/">
          <Route index element={<DomainListing />} />
          <Route path="contests" element={<DomainListing />} />
          <Route path="contests/:id" element={<DomainDetail />} />
          <Route path="*" element={<NotFoundComponent />} />
        </Route>
      </ReactRouterRoutes>
    </BrowserRouter>
  );
}
