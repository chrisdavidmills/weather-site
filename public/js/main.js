// BASIC TEST FETCH
// const url = 'http://puzzle.mead.io/puzzle';
//
// fetch(url)
// .then(response => response.json())
// .then(data => {
//   console.log(data.puzzle);
// })

// Note: destructuring the data object returned in the second promise to make the console.logs shorter
// also note the default value of an empty object in case the data is not returned; stops the resulting
// error from occurring

const weatherForm = document.querySelector('form');
const searchInput = document.querySelector('input');
const results = document.querySelector('.results');

function fetchForecast() {
  const url = `/weather?address=${searchInput.value}`;

  const locationResult = document.createElement('dt');
  results.appendChild(locationResult);
  locationResult.textContent = `Loading`;

  fetch(url)
  .then(response => response.json())
  .then(({error,location,temperature,description} = {}) => {
    if(error) {
      results.removeChild(locationResult);
      return alert(`Error: ${error}`);
    }

    const descriptionResult = document.createElement('dd');

    locationResult.textContent = `The weather for ${ location }`;
    descriptionResult.textContent = `The temperature is ${ temperature }°C. It is ${ description }.`;


    results.appendChild(descriptionResult);

    searchInput.value = '';
  })
}

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  fetchForecast();
});
