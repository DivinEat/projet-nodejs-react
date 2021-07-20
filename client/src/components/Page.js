import React from "react";
import Body from "./Body";

function Page({theme, setTheme}) {
    return (
        <div>
            <Body theme={theme}/>
        </div>
    );
}

export default Page;
