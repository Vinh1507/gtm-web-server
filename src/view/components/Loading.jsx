import { Spinner } from 'react-bootstrap';
import React from 'react';
export default function Loading() {
  return (
    <div className='justify-content-center'>
      <Spinner animation="border" variant="primary" />
    </div>
  );
}