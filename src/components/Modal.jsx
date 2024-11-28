const Modal = ({ setVisible, description }) => {
  return (
    <div className="modal-root">
      <div className="modal">
        {/* button pour fermer la modal */}
        <button
          onClick={() => {
            setVisible(false);
          }}
        >
          X
        </button>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default Modal;
