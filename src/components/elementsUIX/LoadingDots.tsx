import React from 'react';
import * as Animatable from 'react-native-animatable';
import { useTheme } from '../../hooks/ThemeContext';
import { ColorValue, TextStyle } from 'react-native';

const LoadingDots = ({ color }: { color?: ColorValue }) => {
  const { colorsTheme } = useTheme();
  return (
    <Animatable.View
      animation="pulse"
      easing="ease-in-out"
      iterationCount="infinite"
      style={{ flexDirection: 'row', alignItems: 'center' }}>
      {[...Array(3)].map((_, index) => (
        <Animatable.Text
          key={index}
          animation={{
            0: { opacity: 0 },
            0.5: { opacity: 1 },
            1: { opacity: 0 },
          }}
          iterationCount="infinite"
          delay={index * 100}
          style={{
            marginHorizontal: 1.5,
            fontSize: 24,
            color: color || colorsTheme.button,
          }}>
          •
        </Animatable.Text>
      ))}
    </Animatable.View>
  );
};

export default LoadingDots;
