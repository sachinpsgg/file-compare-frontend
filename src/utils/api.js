export const compareFiles = async (file1, file2) => {
    const formData = new FormData();
    formData.append('file1', file1);
    formData.append('file2', file2);

    const response = await fetch('https://file-compare-backend.onrender.com/compare', {
        method: 'POST',
        body: formData,
    });

    if (!response.ok) {
        console.log(response);
        throw new Error('Network response was not ok');
    }

    return await response.json();
};