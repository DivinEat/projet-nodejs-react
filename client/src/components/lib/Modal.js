import React, {useEffect} from "react";
import "./Modal.css";

export default function Modal({title, children, open, onClose}) {
    return (
        open && (
            <>
                <div className="overlay" onClick={onClose}/>
                <div className="modal">
                    <div className="modal-title">
                        <h2>{title}</h2>
                        <button onClick={onClose} className="close-modal">
                            CLOSE
                        </button>
                    </div>
                    <div className="modal-content">{children}</div>
                </div>
            </>
        )
    );
}
