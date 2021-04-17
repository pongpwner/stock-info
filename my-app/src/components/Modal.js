import React from "react";

export default function Modal({ modalSymbol, modalState, setModalState }) {
  console.log(modalState);

  function toggleModal() {
    setModalState(!modalState);
  }
  return (
    <div className={`modal ${modalState === false ? "hidden" : ""}`}>
      <div className="innerModal">
        <h1 className="modalTitle">{modalSymbol}</h1>
        <button onClick={toggleModal}> close</button>
      </div>
    </div>
  );
}
