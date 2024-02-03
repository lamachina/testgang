import React, { useEffect, useRef } from 'react';
import styled from 'styled-components/macro';
import gsap from 'gsap';
import logo from './realmlogo.png';

export function BigLogo() {
  const logoRef = useRef(null);

  useEffect(() => {
    // Create a GSAP timeline
    const tl = gsap.timeline({ repeat: -1, yoyo: true });

    // Define the translation animation
    tl.to(logoRef.current, { duration: 2, y: -30, ease: 'power2.out' });

    // Add a rotation animation every 4.4 seconds
    tl.to(logoRef.current, { duration: 0.4, rotation: -20, ease: 'power2.out' }, "-=1.7"); // Rotate after 3.4 seconds

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
  padding-top: 20px

`;

const ImgLogo = styled.img`
  max-width: 250px;
  @media (max-width: 768px) {
    max-width: 125px;
  }
`;
