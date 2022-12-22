import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function DeleteContext({
  showModal,
  hideModal,
  confirmModal,
  id,
  message,
}) {
  return (
    <Modal
      centered
      size="sm"
      show={showModal}
      onHide={hideModal}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Supprimer définitivement ? </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="alert alert-danger">{message}</div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="default" onClick={hideModal}>
          Non
        </Button>
        <Button variant="danger" onClick={() => confirmModal(id)}>
          Oui
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
