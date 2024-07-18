import { BrowserRouter, Routes as ReactRouterRoutes, Route } from 'react-router-dom';
import NotFoundComponent from './pages/NotFound.jsx';
import Navigation from './components/Navigation.jsx';
import DomainListing from './components/domain/DomainListing.jsx';
import DomainDetail from './components/domain/DomainDetail.jsx';
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
          <Route path="domains" element={<DomainListing />} />
          <Route path="domains/:id" element={<DomainDetail />} />
          <Route path="*" element={<NotFoundComponent />} />
        </Route>
      </ReactRouterRoutes>
    </BrowserRouter>
  );
}
