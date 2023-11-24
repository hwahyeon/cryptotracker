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
    background: ${(props) => props.theme.loadingColor};
    border-radius: 50%;
    animation-delay: ${props => props.n * 0.1}s;

    ${({ n }) => {
        const size = 50 - (n - 1) * 10;
        const opacity = 1 - (n - 1) * 0.2;
        return `
            width: ${size}px; 
            height: ${size}px;
            opacity: ${opacity};
        `;
    }}
`;

const circles = [1, 2, 3, 4, 5];

const LoadingBar = () => {
    return (
        <Container>
            {circles.map(n => <Circle key={n} n={n} />)}
        </Container>
    );
}

export default LoadingBar;
