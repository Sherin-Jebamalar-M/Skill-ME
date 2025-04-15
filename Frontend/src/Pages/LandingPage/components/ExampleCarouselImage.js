import React from 'react';
import { Image } from 'react-bootstrap';

function ExampleCarouselImage({ text }) {
  return (
    <div className="text-center" style={{ backgroundColor: '#ddd', height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <h2>{text}</h2>
    </div>
  );
}

export default ExampleCarouselImage;
