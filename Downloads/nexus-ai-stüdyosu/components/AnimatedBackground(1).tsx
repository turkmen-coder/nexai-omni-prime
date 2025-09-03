
import React from 'react';

const AnimatedBackground: React.FC = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
      <div className="absolute w-full h-full bg-gradient-to-r from-nexus-primary via-nexus-secondary to-nexus-accent opacity-20 animate-gradient-x"></div>
      <div 
        className="absolute w-full h-full"
        style={{
          backgroundImage:
            'radial-gradient(circle at 25px 25px, rgba(224, 224, 224, 0.1) 2%, transparent 0%),' +
            'radial-gradient(circle at 75px 75px, rgba(224, 224, 224, 0.1) 2%, transparent 0%)',
          backgroundSize: '100px 100px',
        }}
      ></div>
    </div>
  );
};

export default AnimatedBackground;
