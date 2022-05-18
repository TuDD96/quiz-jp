export const getUrlMovie = (thumb_url) => {
  return encodeURI(
    `https://ophim.cc/_next/image?url=https://img.ophim.tv/uploads/movies/${thumb_url}&w=160&q=75`
  );
};
