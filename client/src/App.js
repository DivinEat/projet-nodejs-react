import logo from "./logo.svg";
import "./App.css";
import Button from "./components/lib/Button";
import Page from "./components/Page";
import { useState, useEffect } from "react";
import Modal from "./components/lib/Modal";
import ButtonGroup from "./components/ButtonGroup";

let mount = false;

function App() {
  const [theme, setTheme] = useState("dark");
  const [modal, setModal] = useState(false);

  useEffect(() => {
    console.log("did mount");
    return () => {
      console.log("will unmount");
    };
  }, []);

  useEffect(() => {
    console.log("did update " + theme);

    return () => {
      console.log("will update " + theme);
    };
  }, [theme]);

  return (
    <div className="App">
      <header className="App-header">
        <ButtonGroup theme={theme} setTheme={setTheme} />
        <Page theme={theme} setTheme={setTheme} />
        <Button onClick={() => setModal(true)} title="open modal" />
        {modal && (
          <Modal
            title={"Mon titre"}
            open={true}
            onClose={() => window.confirm("Closing modal") && setModal(false)}
          >
            <p>Ma description</p>
            <a href="https://google.fr">Google</a>
            <Button title="test" />
          </Modal>
        )}
      </header>
    </div>
  );
}

export default App;
