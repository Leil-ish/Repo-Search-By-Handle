'use strict';

const apiHeader = "application/vnd.github.v3+json";

const searchURL = "https://api.github.com/users";


function repoSearch(query) {
  const params = query.split(" ").join("");
  const queryString = `${params}/repos`;
  const url = searchURL + "/" + queryString;
  console.log(url);
  const option = {
    headers: new Headers({
      "Accept": apiHeader
    })
  };


  console.log(option);

  
  fetch(url, option)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText)
    })
    .then(responseJson => displayResults(responseJson))
    .catch(error => $("#error").append(`
    <p id="errorMessage">Oops! ${error.message}.</p>`));
    $('.repos').removeClass('hidden');
}


function displayResults(responseJson) {
  $("#results").empty();
  for (let i = 0; i < responseJson.length; i++) {
    $("#results").append(`
  <li class="repoList"><h2>${responseJson[i].name}</h2>
  <p>Repo description: ${responseJson[i].description}</p>
  <p><a href="${responseJson[i].url}">${responseJson[i].url}</a></p>
  </li>`
    );
    console.log(responseJson[i].url);
  };
  $('.repos').removeClass('hidden');
}


function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    let textInput = $("#handle").val();
    repoSearch(textInput);
    console.log('Working on it!');
  });
}
$(watchForm);