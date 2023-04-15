const BASE_URL = 'https://api.github.com';

/**
 * Searches GitHub users based on the provided query.
 *
 * @param {string} query - The search query (username or email).
 * @param {number} [page=1] - The page number for the search results (default is 1).
 * @param {number} [per_page=12] - The number of results per page (default is 12).
 * @returns {Promise<Object>} A Promise that resolves to the search results JSON object.
 */
export const searchUsers = async (query, page = 1, per_page = 12) => {
  const response = await fetch(
    `${BASE_URL}/search/users?q=${encodeURIComponent(query)}&page=${page}&per_page=${per_page}`);
  return response.json();
};

/**
 * Retrieves the details of a GitHub user by username.
 *
 * @param {string} username - The GitHub username
 * @returns {Promise<Object>} user details JSON object.
 */
export const getUserDetail = async (username) => {
  const response = await fetch(`${BASE_URL}/users/${encodeURIComponent(username)}`);
  return response.json();
};