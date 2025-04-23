import LoadingSpinner from './LoadingSpinner';

function FileInput({ label, onChange, file, content, contentLoading, contentError }) {
    return (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">{label}</label>
            <input
                type="file"
                accept=".txt"
                onChange={onChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition duration-200"
            />
            {contentLoading && (
                <div className="flex items-center mt-2">
                    <LoadingSpinner />
                    <span className="ml-2 text-gray-600">Reading file...</span>
                </div>
            )}
            {contentError && (
                <p className="text-red-600 text-sm mt-2">{contentError}</p>
            )}
            {content && !contentLoading && !contentError && (
                <div className="mt-2 p-4 bg-gray-50 rounded-md border border-gray-200 max-h-40 overflow-auto">
                    <p className="text-sm text-gray-700 whitespace-pre-wrap">{content}</p>
                </div>
            )}
        </div>
    );
}

export default FileInput;