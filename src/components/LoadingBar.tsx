import React from 'react';
import styled, { keyframes } from 'styled-components';

const moveX = keyframes`
    0%  { transform: translate(-100px, 0); }
    100%{ transform: translate(100px, 0); }
`;


interface CircleProps {
    n: number;
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 100px; 
    height: 100px;
    margin: auto; 
`;

const Circle = styled.div<CircleProps>`
    position: absolute;
    animation: ${moveX} 1s ease-in-out alternate infinite;
    background: #fff;
    width: 50px; 
    height: 50px;
    border-radius: 50%;
    
    &:nth-of-type(2),
    &:nth-of-type(3),
    &:nth-of-type(4),
    &:nth-of-type(5) {
        animation-delay: calc(0.1s * ${props => props.n});
    }
    &:nth-of-type(2) { width: 40px; height: 40px; opacity: 0.8; }
    &:nth-of-type(3) { width: 30px; height: 30px; opacity: 0.6; }
    &:nth-of-type(4) { width: 20px; height: 20px; opacity: 0.4; }
    &:nth-of-type(5) { width: 10px; height: 10px; opacity: 0.2; }
    
`;

const LoadingBar = () => {
    return (
        <Container>
            <Circle n={1}></Circle>
            <Circle n={2}></Circle>
            <Circle n={3}></Circle>
            <Circle n={4}></Circle>
            <Circle n={5}></Circle>
        </Container>
    );
}

export default LoadingBar;