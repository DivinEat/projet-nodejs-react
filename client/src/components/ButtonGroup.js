import React, { useState } from "react";
import Button from "./lib/Button";

const elems = [];
const item = {};
const ready = false;

function ButtonGroup({ theme, setTheme }) {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <Button
        theme={theme}
        title={`${(visible && "Hide") || "Display"} buttons`}
        onClick={() => setVisible(!visible)}
      />
      {visible && (
        <>
          <Button
            theme={theme}
            title="coucou"
            onClick={() => alert("coucou")}
          />
          <Button theme={theme} title="foo" onClick={() => alert("foo")} />
          <Button theme={theme} title={true} />
          <Button theme={theme} variant="icon" title={10} size={40} />
          {elems.length > 0 && (
            <ul>
              <li>{item.deleteable && <button>Delete</button>} Item</li>
            </ul>
          )}
          {!elems.length && ready && "No Elements"}
          {!elems.length && !ready && "Loading"}
          <Button
            theme={theme}
            title={(() => "ToggleTheme")()}
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          />
          <Button theme={theme} variant="rounded" title={["test", "test2"]} />
        </>
      )}
    </>
  );
}

export default ButtonGroup;
