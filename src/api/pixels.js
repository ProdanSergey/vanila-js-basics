const KEY = '15820844-4ffc87a820c3e67e7742878c9';
const BASE_PATH = 'https://pixabay.com/api/';

export const getPixelsByQuery = async (query, page = 1) => {
  const url = new URL(`${BASE_PATH}?key=${KEY}&q=${encodeURIComponent(query)}&page=${page}`);

  const response = await fetch(url);

  if (response.ok) {
    const data = await response.json();
    
    return data.hits;
  } else {
    throw new Error(response.statusText);
  }
}