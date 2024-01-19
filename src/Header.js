import React from "react";

//Component for header that contains the title component 
export default function Header () {
    return (
        <header className="Header">
            <Title />
        </header>
    );
}

//Component for Title 
function Title () {
    return (
    <h1 className="Title">CSPStore</h1>
    );
}