function Button({ children, type = 'button', disabled = false }) {
    return (
        <button
            type={type}
            disabled={disabled}
            className={`w-full py-2.5 px-4 rounded-md text-white font-semibold transition duration-200 ${
                disabled
                    ? 'bg-blue-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
            }`}
        >
            {children}
        </button>
    );
}

export default Button;