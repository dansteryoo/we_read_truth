export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';

export const openModal = (modal, id) => ({
    type: OPEN_MODAL,
    modal: { 
        formType: modal, 
        typeId: id 
    }
});

export const closeModal = () => ({
    type: CLOSE_MODAL
});