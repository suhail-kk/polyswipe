"use client";

import React, { ReactNode } from "react";
import ReactDOM from "react-dom";
import { X } from "lucide-react";

interface ModalProps {
    open: boolean;
    onClose?: () => void;
    children: ReactNode;
    title?: string;
    description?: string;
    modalStyle?: string;
    triggerLabel?: string;
    maxWidth?: string;
    isTriggerNeeded?: boolean;
}

const Modal: React.FC<ModalProps> = ({
    open,
    onClose,
    children,
    title,
    description,
    modalStyle = "",
    triggerLabel = "Open Modal",
    maxWidth = "700px",
    isTriggerNeeded = false,
}) => {
    if (typeof document === "undefined") return null; // SSR safe

    return (
        <>

            {/* Modal Portal */}
            {open &&
                ReactDOM.createPortal(
                    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50 transition-all duration-300">
                        <div
                            className={`relative w-full md:rounded-2xl shadow-2xl overflow-y-auto max-h-[80vh] glass-modal border border-white/20 mx-3 ${modalStyle}`}
                            style={{ maxWidth }}
                        >
                            {/* Header */}
                            {(title || description) && (
                                <div className="relative py-4 pl-4 pr-8">
                                    {title && (
                                        <h2 className="text-lg font-semibold text-white">{title}</h2>
                                    )}
                                    {description && (
                                        <p className="mt-1 text-sm text-gray-200">{description}</p>
                                    )}
                                    <X
                                        size={24}
                                        className="absolute top-4 right-4 text-gray-300 cursor-pointer hover:text-white transition-colors"
                                        onClick={onClose}
                                    />
                                </div>
                            )}

                            {/* Content */}
                            <div className="p-5 text-white">{children}</div>
                        </div>
                    </div>,
                    document.body
                )}
        </>
    );
};

export default Modal;
