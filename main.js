'use strict';

function getRepos(gitHandle) {
  const url = 'https://api.github.com/users/' + gitHandle + '/repos';

  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      } 
      else {
        $('.resultsContainer').addClass('hidden');
        $('.errorContainer').removeClass('hidden');
        $('#js-error-message').empty();
        throw new Error(response.statusText);
      }
      
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
  });
}

function displayResults(results) {
  // if there are previous results, remove them
  console.log('displaying results');
  $('.errorContainer').addClass('hidden');
  $('.resultList').empty();
  // add results to container for every repo
  for (let i = 0; i < results.length; i++) {
    const repoTitle = results[i].name;
    const repoURL = results[i].html_url;
    $('.resultList').append(
      `<li "class="list-item">
        <h3>${repoTitle}</h3>
        <a href="${repoURL}" target="_blank">View Repo</a>
      </li>`
    );
    $('.resultsContainer').removeClass('hidden');
  }
};

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-gitHandle').val();
    getRepos(searchTerm);
  });
}

$(watchForm);