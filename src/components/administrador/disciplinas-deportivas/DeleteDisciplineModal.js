import React from 'react';
import { Modal } from 'semantic-ui-react';

const DeleteDisciplineModal = ({
    discipline,
    deleteModal,
    toggleDeleteModal,
    handleDeleteDiscipline
}) => {
    return (
        <Modal
            closeIcon
            open={deleteModal === discipline._id ? true : false}
            onClose={() => toggleDeleteModal(false)}
        >
            <Modal.Header>
                <p>Alerta</p>
            </Modal.Header>
            <Modal.Content>
                <p>
                    ¿Está seguro de eliminar la disciplina{' '}
                    <b>{discipline.nombre}</b>?
                </p>
            </Modal.Content>
            <Modal.Actions>
                <button
                    className='button-delete'
                    onClick={e => {
                        e.stopPropagation();
                        toggleDeleteModal(false);
                    }}
                >
                    Cancelar
                </button>
                <button
                    className='buttons-save-edit'
                    onClick={e => {
                        e.stopPropagation();
                        handleDeleteDiscipline(discipline);
                    }}
                >
                    Aceptar
                </button>
            </Modal.Actions>
        </Modal>
    );
};

export default DeleteDisciplineModal;
