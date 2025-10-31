import React from 'react'
import Modal from './Modal'
import LessonForm from './LessonForm'

interface Props {
    open: boolean;
    handleLessonAdded: () => void;
    onClose: () => void;
}

export default function AddLessonModal(props: Props) {
    const { open, handleLessonAdded, onClose } = props

    const onSuccess = () => {
        handleLessonAdded()
        onClose()
    }

    return (
        <Modal open={open} onClose={onClose} title='Add Lessons (JSON Format)' description='JSON Input:'>
            <LessonForm onLessonAdded={onSuccess} />
        </Modal>
    )
}
