import { Nettruyen } from "./Nettruyen";
import assert from "assert";
import {
    Source,
    Chapter
} from "paperback-extensions-common";
import * as cheerio from 'cheerio';

describe("Nettruyen", function () {
    let source: Source;
    let nettruyen: Nettruyen;

    before(async () => {
        source = new Nettruyen(cheerio);
        nettruyen = source as Nettruyen;
    });

    describe("getChapters()", function () {
        it("should return an array of chapters", async function () {
            const chapters = await nettruyen.getChapters("my-manga-id");
            assert(Array.isArray(chapters));
            assert(chapters.length > 0);

            const chapter = chapters[0];
            console.log(chapter);
        });
    });
});
