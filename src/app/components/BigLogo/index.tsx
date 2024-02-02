import React, { useEffect, useRef } from 'react';
import styled from 'styled-components/macro';
import gsap from 'gsap';
import logo from './realmsicon.png';

export function BigLogo() {
  const logoRef = useRef(null);

  useEffect(() => {
    // Create a GSAP timeline
    const tl = gsap.timeline({ repeat: -1, yoyo: true });

    // Define the animation
    tl.to(logoRef.current, { duration: 1, y: -20, ease: 'power2.out' });

    // You can add more animations to the timeline if needed

    // Cleanup on component unmount
    return () => {
      tl.kill(); // Kill the timeline to prevent memory leaks
    };
  }, []);

  return (
    <Wrapper>
      <ImgLogo ref={logoRef} src={logo} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const ImgLogo = styled.img`
  max-width: 250px;

  @media (max-width: 768px) {
    max-width: 125px;
  }
`;
