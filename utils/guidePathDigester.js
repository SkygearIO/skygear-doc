export function digest(p) {
  if (!p) {
    throw new Error('Missing path');
  }

  let path = p;
  if (path.slice(-1) === '/') {
    path = path.slice(0, -1);
  }
  if (path.slice(0, 1) === '/') {
    path = path.slice(1);
  }

  const pathPrefix = 'guides/';
  if (path.indexOf(pathPrefix) !== 0) {
    throw new Error('Missing path prefix');
  }
  path = path.slice(pathPrefix.length);

  const pathSplits = path.split('/');
  const guide = {};

  if (pathSplits.length === 1) {
    guide.name = pathSplits[0];
    return guide;
  }

  guide.section = pathSplits[0];
  if (pathSplits.length === 2) {
    guide.name = pathSplits[1];
    return guide;
  }

  guide.language = pathSplits.slice(-1)[0];
  guide.name = pathSplits.slice(1, -1).join('/');

  return guide;
}
