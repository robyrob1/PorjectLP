fetch('/api/spots')
  .then(response => response.json())
  .then(data => console.log(data));