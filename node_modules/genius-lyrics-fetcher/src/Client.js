const axios = require("axios");
const cheerio = require("cheerio");

const SEARCH_ENDPOINT = `https://api.genius.com/search?q=`;

class Client {
  constructor(accessToken) {
    if (!accessToken) throw new Error("accessToken must be present");
    if (typeof accessToken !== "string")
      throw new Error("accessToken must be of type string");

    this.accessToken = accessToken;
  }

  fetch(trackTitle, artistName) {
    if (!trackTitle) throw new Error("trackTitle must be present");
    if (!artistName) throw new Error("artistName must be present");

    const searchTerm = `${normalize(trackTitle)} ${normalize(artistName)}`;
    const findTrackInfo = getData(
      this.accessToken,
      getSearchEndpoint(searchTerm)
    )
      .then((response) => response.data)
      .then((data) => findTrackFromResults(data, trackTitle, artistName))
      .then((track) => {
        if (!track) throw new Error(`Track was not found from Genius API`);
        return track;
      })
      .then(filterForTrackInfo);

    const findLyrics = findTrackInfo
      .then((track) => track.url)
      .then(getHtml)
      .then(extractLyrics);

    return Promise.all([findTrackInfo, findLyrics])
      .then((result) => ({
        ...result[0],
        trackTitle,
        artistName,
        lyrics: result[1],
      }))
      .catch((err) => {
        throw new Error(
          `Unable to find track [${trackTitle}] for [${artistName}]`
        );
      });
  }

  fetchArtist(artistName) {
    if (!artistName) throw new Error("artistName must be present");

    const searchTerm = `${normalize(artistName)}`;
    return getData(this.accessToken, getSearchEndpoint(searchTerm))
      .then((response) => response.data)
      .then((data) => findArtistFromResults(data, artistName))
      .then((artist) => {
        if (!artist) throw new Error(`Artist was not found from Genius API`);
        return artist;
      })
      .then(filterForArtistInfo)
      .then((result) => ({
        ...result,
        artistName,
      }))
      .catch((err) => {
        throw new Error(`Unable to find artist [${artistName}]`);
      });
  }
}

const getData = (accessToken, url) => {
  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

const getSearchEndpoint = (searchTerm) =>
  // encode special characters, which need to be escaped
  encodeURI(`${SEARCH_ENDPOINT}${searchTerm}`);

const normalize = (text) => {
  return text
    ? text
        .trim()
        .toLowerCase()
        .replace(/[’!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g, "") // remove punctuation
        .replace(/\s{2,}/g, " ") // remove any extra spaces
        .replace(/\u200B/g, "") // remove zero-width character (8203)
    : "";
};

const findTrackFromResults = (results, track, artist) => {
  if (
    results &&
    results.response &&
    results.response.hits &&
    results.response.hits.length
  ) {
    return results.response.hits.find(
      (item, idx) =>
        normalize(item.result.title) === normalize(track) &&
        normalize(item.result.primary_artist.name) === normalize(artist)
    );
  }
};

const findArtistFromResults = (results, artist) => {
  if (
    results &&
    results.response &&
    results.response.hits &&
    results.response.hits.length
  ) {
    return results.response.hits.find(
      (item, idx) =>
        normalize(item.result.primary_artist.name) === normalize(artist)
    );
  }
};

const filterForTrackInfo = (hit) =>
  hit &&
  hit.result && {
    songImg: hit.result.song_art_image_url,
    songImgSm: hit.result.song_art_image_thumbnail_url,
    artistImg: hit.result.primary_artist.image_url,
    url: hit.result.url,
  };

const filterForArtistInfo = (hit) =>
  hit &&
  hit.result && {
    artistImg: hit.result.primary_artist.image_url,
    url: hit.result.primary_artist.url,
  };

const getHtml = (url) => {
  return axios.get(url).then((response) => {
    if (response.status === 200) {
      return response.data;
    }
  });
};

const extractLyrics = (html) => {
  if (html) {
    const $ = cheerio.load(html);
    const lyricsEl = $(".lyrics");
    if (lyricsEl.length) {
      const lyrics = lyricsEl.text().trim();
      return lyrics;
    }
  }
};

module.exports = Client;
