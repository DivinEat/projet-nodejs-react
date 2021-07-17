import React, { useContext } from "react";

function Button({ title, onClick, variant = "default", size = 20 }) {
    title = title.toString();
    const style = { textTransform: "uppercase" };
    if (["icon", "rounded"].includes(variant)) {
        style.borderRadius = "50%";
    }
    if (variant === "icon") {
        style.width = size;
        style.height = size;
        style.maxWidth = size;
        style.maxHeight = size;
        style.minWidth = size;
        style.minHeight = size;
    }

    return (
        <button onClick={onClick} style={style}>
            {title}
        </button>
    );
}

export default Button;
