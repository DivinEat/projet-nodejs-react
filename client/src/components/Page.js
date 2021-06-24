import React from "react";
import Body from "./Body";
import Header from "./Header";

function Page({ theme, setTheme }) {
  return (
    <div>
      <Header theme={theme} setTheme={setTheme} />
      <Body theme={theme} />
    </div>
  );
}

export default Page;
