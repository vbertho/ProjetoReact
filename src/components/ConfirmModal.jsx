function ConfirmModal({ title, message, onConfirm, onCancel, onlyCancel = false }) {
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            onClick={onCancel}
        >
            <div
                className="w-full max-w-md rounded-xl bg-neutral-100 p-6 shadow-2xl animate-fade-in"
                onClick={(e) => e.stopPropagation()}
            >

                {/* TÍTULO */}
                <h2 className="text-2xl font-bold text-neutral-900 mb-2">
                    {title}
                </h2>

                {/* MENSAGEM */}
                <p className="text-neutral-700 mb-6 leading-relaxed">
                    {message}
                </p>

                {/* AÇÕES */}
                <div className="flex justify-end gap-3">
                    <button
                        onClick={onCancel}
                        autoFocus
                        className="
                            px-5 py-2 rounded-lg
                            bg-neutral-300 text-neutral-800
                            hover:bg-neutral-400
                            transition
                        "
                    >
                        Cancelar
                    </button>

                    {!onlyCancel && (
                        <button
                            onClick={onConfirm}
                            className="
                                px-5 py-2 rounded-lg
                                bg-red-600 text-white
                                hover:bg-red-700
                                shadow-md hover:shadow-lg
                                transition
                            "
                        >
                            Confirmar
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ConfirmModal;