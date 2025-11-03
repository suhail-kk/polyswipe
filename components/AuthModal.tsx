import React, { useState } from 'react';
import Modal from './Modal';

interface Props {
    open: boolean;
    onAuthenticate: (password: string) => void;
    onClose: () => void;
}

export default function AuthModal(props: Props) {
    const { open, onAuthenticate, onClose } = props;
    const [password, setPassword] = useState('');

    const handleSubmit = () => {
        onAuthenticate(password);
        setPassword(''); // Clear password after attempt
    };

    const handleClose = () => {
        setPassword(''); // Clear password on close
        onClose();
    };

    return (
        <Modal open={open} onClose={handleClose} maxWidth='400px' title='Authentication Required' description='Enter Password:'>
            <div className="py-4">
                <input
                    type="password"
                    className="border p-3 w-full mb-4 border-white/20 rounded-2xl font-mono text-sm bg-white/5 text-white placeholder:text-gray-400"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button
                    className="w-full px-3 py-2 mt-6 rounded-full font-semibold text-white shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed
             bg-white/10 backdrop-blur-lg border border-white/20 hover:bg-white/20 active:scale-95"
                    onClick={handleSubmit}
                >
                    Submit
                </button>
            </div>
        </Modal>
    );
}
