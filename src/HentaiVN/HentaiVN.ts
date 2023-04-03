import {
    Chapter,
    ChapterDetails,
    Manga,
    PagedResults,
    SearchRequest,
    Source
} from "paperback-extensions-common";

export class HentaiVN extends Source {
    requestManager = createRequestManager({
        requestsPerSecond: 0
    });
    override getMangaDetails(mangaId: string): Promise<Manga> {
        throw new Error("Method not implemented.");
    }
    override getChapters(mangaId: string): Promise<Chapter[]> {
        throw new Error("Method not implemented.");
    }
    override getChapterDetails(mangaId: string, chapterId: string): Promise<ChapterDetails> {
        throw new Error("Method not implemented.");
    }
    override getSearchResults(query: SearchRequest, metadata: any): Promise<PagedResults> {
        throw new Error("Method not implemented.");
    }
}