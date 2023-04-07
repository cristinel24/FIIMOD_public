# genius-lyrics-fetcher

A simple node.js client that fetches song lyrics from the [**Genius API**](https://docs.genius.com/)!

## Installation

```
npm install --save genius-lyrics-fetcher
```

## Example usage

Retrieve an access token from Genius: https://genius.com/developers

### Import and initialize client

```
import GeniusFetcher from 'genius-lyrics-fetcher';

const ACCESS_TOKEN = 'YOUR TOKEN HERE';
const client = new GeniusFetcher.Client(ACCESS_TOKEN);
```

### Async / await usage

```
async function getLyrics() {
  const result = await client.fetch("San Francisco Street", "Sun Rai");
  return result.lyrics;
}
```

```
async function getArtist() {
  return await client.fetchArtist("Tame Impala");
}
```

### .then() usage

```
client.fetch("Nanã", "Polo & Pan")
  .then(result => console.log(result.lyrics));
```

## Methods

### `fetch(trackTitle, artistName)`

Returns a Promise resolving to an object `{ songImg, songImgSm, artistImg, url, artistName, trackTitle, lyrics }` for `trackTitle` by `artistName`. If the track is not found, an `Error` will be thrown.

### `fetchArtist(artistName)`

Returns a Promise resolving to an object `{ artistImg, url, artistName }` for `artistName`. If the artist is not found, an `Error` will be thrown.
