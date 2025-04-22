import { useState } from 'react';
import Header from './components/Header';
import FileInput from './components/FileInput';
import ResultDisplay from './components/ResultDisplay';
import Button from './components/Button';
import { compareFiles } from './utils/api';
function App() {
    const [file1, setFile1] = useState(null);
    const [file2, setFile2] = useState(null);
    const [content1, setContent1] = useState('');
    const [content2, setContent2] = useState('');
    const [contentLoading, setContentLoading] = useState({ file1: false, file2: false });
    const [contentError, setContentError] = useState({ file1: null, file2: null });
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleFileChange = async (event, setter, contentSetter, fileKey) => {
        const file = event.target.files?.[0] || null;
        setter(file);

        if (file) {
            setContentLoading((prev) => ({ ...prev, [fileKey]: true }));
            setContentError((prev) => ({ ...prev, [fileKey]: null }));

            try {
                const text = await file.text();
                contentSetter(text);
            } catch (error) {
                setContentError((prev) => ({
                    ...prev,
                    [fileKey]: 'Failed to read file content.',
                }));
            } finally {
                setContentLoading((prev) => ({ ...prev, [fileKey]: false }));
            }
        } else {
            contentSetter('');
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!file1 || !file2) {
            setResult({ error: 'Please select two files.' });
            return;
        }

        setLoading(true);
        try {
            const data = await compareFiles(file1, file2);
            setResult(data);
        } catch (error) {
            setResult({ error: 'Failed to compare documents. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8">
                <div className="flex flex-col lg:flex-row gap-6 max-w-5xl mx-auto">
                    <div className="lg:w-1/2 bg-white p-8 rounded-xl shadow-lg">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                            Upload Documents
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <FileInput
                                label="Document 1"
                                onChange={(e) => handleFileChange(e, setFile1, setContent1, 'file1')}
                                file={file1}
                                content={content1}
                                contentLoading={contentLoading.file1}
                                contentError={contentError.file1}
                            />
                            <FileInput
                                label="Document 2"
                                onChange={(e) => handleFileChange(e, setFile2, setContent2, 'file2')}
                                file={file2}
                                content={content2}
                                contentLoading={contentLoading.file2}
                                contentError={contentError.file2}
                            />
                            <Button type="submit" disabled={loading}>
                                {loading ? 'Comparing...' : 'Compare Documents'}
                            </Button>
                        </form>
                    </div>
                    <div className="lg:w-1/2">
                        <ResultDisplay result={result} />
                    </div>
                </div>
            </main>
        </div>
    );
}

export default App;