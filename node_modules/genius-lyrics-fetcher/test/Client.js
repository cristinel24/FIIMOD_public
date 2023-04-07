const chai = require("chai");
const { assert, expect } = chai;
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

require("dotenv").config();
const GeniusFetcher = require("..");
const TOKEN = process.env.GENIUS_ACCESS_TOKEN || "TOKEN";

describe("GeniusFetcher", function () {
  this.timeout(0); // disable default 2s timeout

  context("initialize client", () => {
    it("apiKey must be present", () => {
      expect(() => {
        const client = new GeniusFetcher.Client();
      }).to.throw();
    });

    it("apiKey must be of type string", () => {
      expect(() => {
        let invalidToken = 123;
        const client = new GeniusFetcher.Client(invalidToken);
      }).to.throw();
    });
  });

  context("fetch song", () => {
    let client;
    before(() => {
      client = new GeniusFetcher.Client(TOKEN);
    });

    it("parameters must be present", () => {
      try {
        client.fetch();
        assert.fail("should not pass");
      } catch (err) {
        expect(err).to.be.an("Error");
      }
    });

    it("song 1: lyrics and other info should be returned", async () => {
      const trackTitle = "San Francisco Street";
      const artistName = "Sun Rai";
      const result = await client.fetch("San Francisco Street", "Sun Rai");
      expect(result).to.not.be.null;
      expect(result).to.have.all.keys(
        "songImg",
        "songImgSm",
        "artistImg",
        "url",
        "artistName",
        "trackTitle",
        "lyrics"
      );
      expect(result.trackTitle).to.equal(trackTitle);
      expect(result.artistName).to.equal(artistName);
      expect(result.songImg).to.not.be.null;
      expect(result.songImgSm).to.not.be.null;
      expect(result.artistImg).to.not.be.null;
      expect(result.url).to.equal(
        "https://genius.com/Sun-rai-san-francisco-street-lyrics"
      );
      expect(result.lyrics).to.not.be.null;
    });

    it("song 2: lyrics should be returned (song with quotes)", () => {
      return expect(client.fetch("Baby I'm Yours", "Arctic Monkeys")).to
        .eventually.not.be.null;
    });

    it("song 3: lyrics should be returned (artist / song with punctuation)", () => {
      return expect(client.fetch("still feel.", "half•alive")).to.eventually.not
        .be.null;
    });

    it("song 4: lyrics should be returned (artist / song with punctuation)", () => {
      return expect(client.fetch("Life Ain't the Same", "Summer Salt")).to
        .eventually.not.be.null;
    });

    it("song 5: lyrics should be returned (song with special characters)", () => {
      return expect(client.fetch("Instantané", "Paradis")).to.eventually.not.be
        .null;
    });

    it("song 6: lyrics should be returned", () => {
      return expect(client.fetch("9.13", "Khalid")).to.eventually.not.be.null;
    });

    it("song 7: lyrics should be returned", () => {
      return expect(client.fetch("Within", "Daft Punk")).to.eventually.not.be
        .null;
    });

    it("song 8: lyrics should be returned (song with special characters)", () => {
      return expect(client.fetch("Nanã", "Polo & Pan")).to.eventually.not.be
        .null;
    });

    it("lyrics should not be returned", () => {
      return expect(
        client.fetch("random invalid song title", "random invalid artist name")
      ).to.be.rejectedWith();
    });
  });

  context("fetch artist", () => {
    let client;
    before(() => {
      client = new GeniusFetcher.Client(TOKEN);
    });

    it("parameters must be present", () => {
      try {
        client.fetchArtist();
        assert.fail("should not pass");
      } catch (err) {
        expect(err).to.be.an("Error");
      }
    });

    it("artist info should be returned", async () => {
      const artistName = "Tame Impala";
      const result = await client.fetchArtist(artistName);
      expect(result).to.not.be.null;
      expect(result).to.have.all.keys("artistImg", "url", "artistName");
      expect(result.artistName).to.equal(artistName);
      expect(result.artistImg).to.not.be.null;
      expect(result.url).to.equal("https://genius.com/artists/Tame-impala");
    });

    it("artist info should not be returned", () => {
      return expect(
        client.fetchArtist("random invalid artist!!")
      ).to.be.rejectedWith();
    });
  });
});
