function ResultDisplay({ result }) {
    if (!result) return  null;

    return (
        <div className="bg-white p-8 rounded-xl shadow-lg h-full">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Comparison Result</h2>
            {result?.similarity !== undefined ? (
                <div className="space-y-4">
                    <p className="text-green-800 bg-green-100 p-3 rounded-md">
                        Similarity Score: {(result?.similarity * 100).toFixed(2)}%
                    </p>
                    <div>
                        <p className="text-gray-700 font-medium mb-2">Common Words:</p>
                        {result?.commonWords?.length > 0 ? (
                            <ul className="list-disc pl-5 text-gray-600">
                                {result?.commonWords.map((word, index) => (
                                    <li key={index}>{word}</li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-600">None</p>
                        )}
                    </div>
                </div>
            ) : (
                <p className="text-red-800 bg-red-100 p-3 rounded-md">Error: {result.error}</p>
            )}
        </div>
    );
}

export default ResultDisplay;