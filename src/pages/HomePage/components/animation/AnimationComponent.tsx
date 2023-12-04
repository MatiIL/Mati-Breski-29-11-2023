import React from 'react';
import { useAppSelector } from '../../../../state/hooks';
import './animation.css';

const AnimationComponent: React.FC = () => {
  const loadingStatus = useAppSelector((state) => state.forecast.status); 

  return loadingStatus === 'loading' ? null : (
    <div className="container">
      <div className="cloudy"></div>
      <div className="sunny"></div>
      <div className="rainy"></div>
      <div className="snowy"></div>
      <div className="starry"></div>
      <div className="stormy"></div>
    </div>
  );
};

export default AnimationComponent;
