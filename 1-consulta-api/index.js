const ddd = 67;

fetch(`https://brasilapi.com.br/api/ddd/v1/${ddd}`)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(`[ERROR]: ${error}`));
