const getVideoIdFromParameter = (
  name: string,
  url = window.location.href
): string | undefined => {
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
  if (!results) return undefined;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
};

export const getVideoIdFromUrl = (url: string): string | undefined => {
  const splittedVideo = url.split('/');
  return splittedVideo[splittedVideo.length - 1];
};

export const getVideoId = (url: string): string | undefined => {
  if (url.includes('watch?v=')) return getVideoIdFromParameter('v', url);
  else return getVideoIdFromUrl(url);
};
