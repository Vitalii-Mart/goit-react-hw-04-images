import axios from 'axios';

async function ImageApi(quary, page) {
  const BASE_URL = 'https://pixabay.com/api/';
  const KEY = '35916807-4b4569ea51a2cf76aabe9d625';
  const response = await axios.get(
    `${BASE_URL}?key=${KEY}&q=${quary}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=12`
  );
  const images = response.data.hits.map(
    ({ id, webformatURL, largeImageURL, tags }) => {
      return {
        id,
        webformatURL,
        largeImageURL,
        tags,
      };
    }
  );
  return { images, totalImages: response.data.totalHits };
};
export default ImageApi;
