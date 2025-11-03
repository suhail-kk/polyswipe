import React from 'react'
import Modal from './Modal'
import LessonForm from './LessonForm'
import { toast } from 'sonner'; // Import toast

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
        toast.success('Lesson added successfully!'); // Add toast message
    }

    return (
        <Modal open={open} onClose={onClose} title='Add Lessons (JSON Format)' description='JSON Input:'>
            <LessonForm onLessonAdded={onSuccess} />
        </Modal>
    )
}
