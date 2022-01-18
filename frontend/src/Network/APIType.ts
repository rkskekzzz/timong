export function url(path: string) {
  const version = 'v1'; // process.env.REACT_APP_API_VERSION

  return `https://42world.kr/api/${version}/${path}`;
}
