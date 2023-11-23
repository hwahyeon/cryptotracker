import React from 'react';

interface DualButtonProps {}

const Navigator = (props: DualButtonProps) => {
    const handleFirstButtonClick = () => {
        console.log("첫 번째 버튼 클릭됨!");
    };

    const handleSecondButtonClick = () => {
        console.log("두 번째 버튼 클릭됨!");
    };

    return (
        <div>
            <button onClick={handleFirstButtonClick}>버튼 1</button>
            <button onClick={handleSecondButtonClick}>버튼 2</button>
        </div>
    );
}

export default Navigator;