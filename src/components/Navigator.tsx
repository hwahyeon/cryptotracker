import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faHome } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from "recoil";
import { isDarkAtom } from "../atoms";

interface DualButtonProps {}

const Navigator = (props: DualButtonProps) => {
    const navi = useNavigate()
    const setDarkAtom = useSetRecoilState(isDarkAtom);

    const handleFirstButtonClick = () => {    
        setDarkAtom(prev => !prev);
    };

    const handleHomeButtonClick = () => {
        navi("/");
    };

    return (
        <div>
            <button onClick={handleFirstButtonClick}>
                <FontAwesomeIcon icon={faMoon} /> 다크 모드
            </button>
            <button onClick={handleHomeButtonClick}>
                <FontAwesomeIcon icon={faHome} /> 홈
            </button>
        </div>
    );
}

export default Navigator;