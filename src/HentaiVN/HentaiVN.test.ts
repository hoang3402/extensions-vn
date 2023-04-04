import { Source } from 'paperback-extensions-common';
import { HentaiVN } from './HentaiVN';
import * as cheerio from 'cheerio';
import { expect } from 'chai';

describe("HentaiVN", function () {
    let source: Source;
    let hentaivn: HentaiVN;

    source = new HentaiVN(cheerio);
    hentaivn = source as HentaiVN;

    describe("getMangaDetails()", function () {
        it('Get Manga Details', async () => {
            var data = await hentaivn.getMangaDetails('/33394-doc-truyen-chinh-phuc-gai-genshin-impact-5-luat-le-sinh-ton-tien-quyet.html');
            expect(data, 'Null').to.be.not.empty
            // console.debug(data);
        })
    })
    describe("getChapters()", function () {
        it('Get Chapters', async () => {
            var data = await hentaivn.getChapters('33390');
            expect(data, 'Null').to.be.not.empty
            // console.debug(data);
        })
    })
    describe("getChapterDetails()", function () {
        it('Get Chapters Details', async () => {
            var data = await hentaivn.getChapterDetails('29301', '61703');
            expect(data, 'Null').to.be.not.empty
            // console.debug(data);
        })
    })
    describe("getViewMoreItems()", function () {
        it('Get View More Items', async () => {
            var data = await hentaivn.getViewMoreItems('new_added', '');
            expect(data, 'Null').to.be.not.empty
            // console.debug(data);
        })
    })
})