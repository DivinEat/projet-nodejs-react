import React from "react";

function Button({ title, onClick, variant = "default", size = 20, theme }) {
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
  style.color = theme === "dark" ? "white" : "black";
  style.backgroundColor = theme !== "dark" ? "white" : "black";
  return (
    <button onClick={onClick} style={style}>
      {title}
    </button>
  );
}

export default Button;
