import React, { useState, useEffect } from 'react';
import { Card, CardContent, Fade } from '@mui/material';

const About = () => {
  const [textIndex, setTextIndex] = useState(0);
  const texts = [
    'Saya Mohammad Denny',
    'Saya adalah seseorang yang sangat suka coding'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Fade in={true} timeout={1000}>
        <Card>
          <CardContent>
            {texts[textIndex]}
          </CardContent>
        </Card>
      </Fade>
    </div>
  );
}

export default About;
