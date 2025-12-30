document.getElementById('loadData').addEventListener('click', () => {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            document.getElementById('jsonData').textContent = JSON.stringify(data, null, 2);
        })
        .catch(error => {
            console.error('Error fetching JSON:', error);
        });
});