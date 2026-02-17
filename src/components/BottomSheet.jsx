import { useState } from "react";

function BottomSheet({ value, onChange }) {
    const [isOpen, setIsOpen] = useState(false);

    function handleSelect(q) {
        onChange(q);
        setIsOpen(false);
    }

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="ml-auto px-3 py-1.5 text-sm border border-neutral-400 rounded-md hover:bg-neutral-100 transition"
            >
                {value > 0 ? `${value} un` : "0 un"}
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-end">
                    <div
                        className="absolute inset-0 bg-black bg-opacity-40"
                        onClick={() => setIsOpen(false)}
                    />

                    <div className="relative w-full bg-white rounded-t-2xl max-h-[80vh]">

                        <div className="flex justify-center py-3">
                            <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
                        </div>

                        <div className="overflow-y-auto divide-y max-h-[60vh]">
                            {[...Array(16).keys()].map((q) => (
                                <button
                                    key={q}
                                    onClick={() => handleSelect(q)}
                                    className={`w-full text-left px-6 py-4 ${value === q ? "font-semibold bg-neutral-100" : ""
                                        }`}
                                >
                                    {q === 0
                                        ? "Remover"
                                        : `${q} ${q === 1 ? "unidade" : "unidades"}`}
                                </button>
                            ))}
                        </div>

                    </div>
                </div>
            )}
        </>
    );
}

export default BottomSheet;