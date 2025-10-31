import { Plus } from "lucide-react";

interface Props {
    onClick: () => void;
}
export default function FloatingGlassButton(props: Props) {
    const { onClick } = props;
    return (
        <button
            className="fixed bottom-8 right-8 z-50 rounded-full p-3 sm:p-5 shadow-2xl glass-btn hover:scale-110 transition-all duration-300 ease-[cubic-bezier(0.25,0.8,0.25,1)]"
            aria-label="Add"
            onClick={onClick}
        >
            <Plus className="text-white w-6 h-6" strokeWidth={3} />
        </button>
    );
}
