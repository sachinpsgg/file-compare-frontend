export const compareFiles = async (file1, file2) => {
    const formData = new FormData();
    formData.append('file1', file1);
    formData.append('file2', file2);

    const response = await fetch('http://localhost:8000/compare', {
        method: 'POST',
        body: formData,
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    return await response.json();
};