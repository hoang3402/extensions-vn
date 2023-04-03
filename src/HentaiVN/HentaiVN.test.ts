import { Source } from 'paperback-extensions-common';
import { HentaiVN } from './HentaiVN';
import * as cheerio from 'cheerio';
import { expect } from 'chai';

describe("HentaiVN", function () {
    let source: Source;
    let hentaivn: HentaiVN;

    before(async () => {
        source = new HentaiVN(cheerio);
        hentaivn = source as HentaiVN;
    });

    describe("getMangaDetails()", function () {
        it('Get Chapter', async () => {
            var data = await hentaivn.getMangaDetails('12302');
            expect(data, 'Null').to.be.not.empty
            console.log(data);
        })
    })
})