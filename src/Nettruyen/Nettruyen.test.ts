import { Nettruyen } from "./Nettruyen";
// import assert from "assert";
import {
    Source,
    SearchRequest,
} from "paperback-extensions-common";
import * as cheerio from 'cheerio';
import { expect } from "chai";

describe("Nettruyen", function () {
    let source: Source;
    let nettruyen: Nettruyen;

    before(async () => {
        source = new Nettruyen(cheerio);
        nettruyen = source as Nettruyen;
    });

    describe("getChapters()", function () {
        it('Get Chapter', async () => {
            const data = await nettruyen.getChapters("60533");
            expect(data, 'Null').to.be.not.empty
            // console.log(data);
        })
    });

    describe("getSearchResults()", function () {
        it('Get Search', async () => {
            var meta = ''
            var query: SearchRequest = {
                title: 'One',
                parameters: {
                    includedTags: []
                }
            }
            const data = await nettruyen.getSearchResults(query, meta);
            expect(data, 'Null').to.be.not.empty
            // console.log(data);
        })
    });
});
