document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const searchResults = document.querySelector('#search-results');
    const repositoriesSection = document.querySelector('#repositories');
  
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const searchInput = document.querySelector('#search-input').value;
  
      // Fetch users based on search input
      const usersResponse = await fetch(`https://api.github.com/search/users?q=${searchInput}`);
      const usersData = await usersResponse.json();
  
      // Display user information
      searchResults.innerHTML = '';
      usersData.items.forEach(user => {
        const userCard = document.createElement('div');
        userCard.innerHTML = `
          <h3>${user.login}</h3>
          <img src="${user.avatar_url}" alt="${user.login}" />
          <a href="${user.html_url}" target="_blank">Profile</a>
        `;
        userCard.addEventListener('click', async () => {
          // Fetch repositories for the selected user
          const reposResponse = await fetch(`https://api.github.com/users/${user.login}/repos`);
          const reposData = await reposResponse.json();
  
          // Display repositories
          repositoriesSection.innerHTML = '';
          reposData.forEach(repo => {
            const repoItem = document.createElement('div');
            repoItem.innerHTML = `
              <h4>${repo.name}</h4>
              <p>${repo.description}</p>
              <a href="${repo.html_url}" target="_blank">View on GitHub</a>
            `;
            repositoriesSection.appendChild(repoItem);
          });
        });
  
        searchResults.appendChild(userCard);
      });
    });
  });