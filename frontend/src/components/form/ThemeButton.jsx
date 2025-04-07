import React from 'react';
import useTheme from '../../hooks/useTheme';

const ThemeButton = () => {
  const { isDarkMode, setDarkMode } = useTheme();

  return (
    <button
      className={`btn btn-sm rounded-circle p-2 ${
        isDarkMode 
          ? 'btn-outline- text-light' 
          : 'btn-outline text-dark'
      }`}
      onClick={() => setDarkMode(!isDarkMode)}
      aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
      style={{
        width: '40px',
        height: '40px',
        transition: 'all 0.2s ease',
        transform: 'scale(1)'
      }}
      onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
      onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
    >
      <i 
        className={`bi ${
          isDarkMode ? 'bi-sun' : 'bi-moon'
        }`}
        style={{
          transition: 'transform 0.2s ease',
          transform: isDarkMode ? 'scale(1.1)' : 'scale(1)'
        }}
      ></i>
    </button>
  );
};

export default ThemeButton;