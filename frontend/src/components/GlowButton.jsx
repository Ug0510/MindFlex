// GlowButton.js
import React, { useEffect } from 'react';
import gsap from 'gsap';
import chroma from 'chroma-js';
import '../assets/css/components/GlowButton.css'


const GlowButton = () => {
  const generateGlowButtons = () => {
    document.querySelectorAll('.glow-button').forEach((button) => {
      let gradientElem = button.querySelector('.gradient');

      if (!gradientElem) {
        gradientElem = document.createElement('div');
        gradientElem.classList.add('gradient');

        button.appendChild(gradientElem);
      }

      button.addEventListener('pointermove', (e) => {
        const rect = button.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        gsap.to(button, {
          '--pointer-x': `${x}px`,
          '--pointer-y': `${y}px`,
          duration: 0.6,
        });

        gsap.to(button, {
          '--button-glow': chroma
            .mix(
              getComputedStyle(button)
                .getPropertyValue('--button-glow-start')
                .trim(),
              getComputedStyle(button).getPropertyValue('--button-glow-end').trim(),
              x / rect.width
            )
            .hex(),
          duration: 0.2,
        });
      });
    });
  };

  useEffect(() => {
    // Set variables on loaded
    generateGlowButtons();

    // Set variables on resize
    window.addEventListener('resize', generateGlowButtons);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', generateGlowButtons);
    };
  }, []); // Empty dependency array ensures the effect runs only once on mount

  return (
    <button className="glow-button">
      <span>Button</span>
    </button>
  );
};

export default GlowButton;
