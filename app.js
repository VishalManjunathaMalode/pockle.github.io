async function uploadImage() {
    const fileInput = document.getElementById('fileInput');
    const password = document.getElementById('password').value;
    if (!fileInput.files[0]) {
        alert('Select an image file');
        return;
    }
    const reader = new FileReader();
    reader.onload = async () => {
        const base64Image = reader.result.split(',')[1]; // Remove data URL prefix
        const response = await fetch('/upload', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ imageBase64: base64Image, password })
        });
        if (!response.ok) {
            const errorText = await response.text();
            alert('Upload failed: ' + errorText);
			console.log('Upload failed: ' + errorText);
            return;
        }
        const result = await response.json();
        alert('Image uploaded. Block index: ' + result.block.index);
    };
    reader.readAsDataURL(fileInput.files[0]);
}

async function retrieveImage() {
    const index = document.getElementById('blockIndex').value;
    const response = await fetch(`/retrieve/${index}`);
    if (!response.ok) {
        const errorText = await response.text();
        alert('Error: ' + errorText);
        return;
    }
    const data = await response.json();
    document.getElementById('retrievedImage').src = 'data:image/jpeg;base64,' + data.imageBase64;
}