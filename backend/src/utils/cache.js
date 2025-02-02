import NodeCache from 'node-cache';
const cache = new NodeCache({ stdTTL: 600 });

export function getCache(key) {
  return cache.get(key);
}

export function setCache(key, value) {
  return cache.set(key, value);
}