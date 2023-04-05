const BASE_URL = 'https://api.github.com';
const TOKEN = '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';

const headers = {
  'Authorization': `token ${TOKEN}`,
};

/**
 * Searches GitHub users based on the provided query.
 *
 * @param {string} query - The search query (username or email).
 * @param {number} [page=1] - The page number for the search results (default is 1).
 * @param {number} [per_page=10] - The number of results per page (default is 10).
 * @returns {Promise<Object>} A Promise that resolves to the search results JSON object.
 */
export const searchUsers = async (query, page = 1, per_page = 12) => {
  const response = await fetch(
    `${BASE_URL}/search/users?q=${encodeURIComponent(query)}&page=${page}&per_page=${per_page}`,
    { headers }
  );
  return response.json();
};

/**
 * Retrieves the details of a GitHub user by username.
 *
 * @param {string} username - The GitHub username to fetch details for.
 * @returns {Promise<Object>} A Promise that resolves to the user details JSON object.
 */
export const getUserDetail = async (username) => {
  const response = await fetch(`${BASE_URL}/users/${encodeURIComponent(username)}`, { headers });
  return response.json();
};