import {
    Chapter,
    ChapterDetails,
    Manga,
    PagedResults,
    SearchRequest,
    Source,
    Request,
    Response,
    HomeSection,
    MangaTile,
    SourceInfo,
    ContentRating,
    TagType
} from "paperback-extensions-common";

const DOMAIN = "https://hentaivn.tv";

export const HentaiVNInfo: SourceInfo = {
    version: "1.0.1",
    name: "HentaiVN",
    icon: "icon.png",
    author: "Hoang3409",
    authorWebsite: 'https://github.com/hoang3402',
    description: "Extension that pulls manga from HentaiVN.",
    contentRating: ContentRating.ADULT,
    websiteBaseURL: DOMAIN,
    sourceTags: [{
        text: 'Hentai',
        type: TagType.RED
    }]
}

export class HentaiVN extends Source {
    requestManager = createRequestManager({
        requestsPerSecond: 5,
        requestTimeout: 20000,
        interceptor: {
            interceptRequest: async (request: Request): Promise<Request> => {
                request.headers = {
                    ...(request.headers ?? {}),
                    ...{
                        'referer': DOMAIN
                    }
                }
                return request
            },

            interceptResponse: async (response: Response): Promise<Response> => {
                return response
            }
        }
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
    // 
    override async getHomePageSections(sectionCallback: (section: HomeSection) => void): Promise<void> {
        let newAdded: HomeSection = createHomeSection({
            id: 'new_added',
            title: "Truyện Mới Cập Nhật",
            view_more: true,
        });

        //Load empty sections
        sectionCallback(newAdded);
        //New Updates
        let request = createRequestObject({
            url: `${DOMAIN}/list-new2.php`,
            method: "GET",
        });

        let data = await this.requestManager.schedule(request, 1);
        let $ = this.cheerio.load(data.data);

        newAdded.items = await this.parseNewUpdatedSection($);
        sectionCallback(newAdded);
    }
    async parseNewUpdatedSection($: any): Promise<import("paperback-extensions-common").MangaTile[]> {
        const items: MangaTile[] = [];

        for (let item of $('ul.page-random').toArray()) {
            items.push(createMangaTile({
                id: $('div.img-same > a', item).attr('href'),
                title: createIconText({ text: $('b', item).first().text() }),
                image: $('div[style*=background]', item).attr('style').match(/background:url\((.+)\);/)[1]
            }))
        }

        return items;
    }
}