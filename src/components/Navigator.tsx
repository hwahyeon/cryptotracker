import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun, faHome } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isDarkAtom } from "../atoms";
import { styled } from "styled-components";

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 5vh; // 전체 화면 높이
    margin-top: 35px;
`;

const StyledButton = styled.button`
    background-color: rgba(0, 0, 0, 0.7); // 투명도 적용
    color: white;
    border: none;
    padding: 15px;
    margin: 0 5px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: rgba(0, 0, 0, 0.9);
    }
`;

interface NavButtonProps {}

const Navigator = (props: NavButtonProps) => {
    const navi = useNavigate()
    const isDark = useRecoilValue(isDarkAtom)
    const setDarkAtom = useSetRecoilState(isDarkAtom);

    const handleDarkmodeButtonClick = () => {    
        setDarkAtom(prev => !prev);
    };

    const handleHomeButtonClick = () => {
        navi("/");
    };

    return (
        <ButtonContainer>
            <StyledButton  onClick={handleDarkmodeButtonClick}>
                <FontAwesomeIcon icon={isDark ? faMoon : faSun} />
            </StyledButton >
            <StyledButton  onClick={handleHomeButtonClick}>
                <FontAwesomeIcon icon={faHome} />
            </StyledButton >
        </ButtonContainer>
    );
}

export default Navigator;
