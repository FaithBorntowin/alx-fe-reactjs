import axios from "axios";

async function fetchUserData(username, location, minRepos) {
  try {
    const query = ${username}+location:${location}+repos:>${minRepos};
    const url = https://api.github.com/search/users?q=${query}&per_page=30;
    const response = await axios.get(url)
    return response.data

  } catch (error) {
    return error
  }
}

export default fetchUserData;