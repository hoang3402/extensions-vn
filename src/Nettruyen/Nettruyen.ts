import {
    Chapter,
    ChapterDetails,
    ContentRating,
    HomeSection,
    Manga,
    MangaTile,
    PagedResults,
    Request,
    Response,
    SearchRequest,
    Source,
    SourceInfo,
    SourceManga,
    TagType,
} from "paperback-extensions-common";

const DOMAIN = 'https://nettruyen.live/';

export const NettruyenInfo: SourceInfo = {
    version: '1.0.0',
    name: 'NetTruyen',
    icon: 'icon.jpg',
    author: 'Hoang3409',
    authorWebsite: 'https://github.com/hoang3402',
    description: 'Extension that pulls manga from NetTruyen.',
    websiteBaseURL: DOMAIN,
    contentRating: ContentRating.MATURE,
    sourceTags: [
        {
            text: "Recommended",
            type: TagType.BLUE
        },
        {
            text: 'Notifications',
            type: TagType.GREEN
        }
    ]
}

export class Nettruyen extends Source {

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
    })

    override async getHomePageSections(sectionCallback: (section: HomeSection) => void): Promise<void> {
        let newAdded: HomeSection = createHomeSection({
            id: 'new_added',
            title: "Truyện Mới Thêm Gần Đây",
            view_more: true,
        });

        //Load empty sections
        sectionCallback(newAdded);

        //New Updates
        let url = `${DOMAIN}`
        let request = createRequestObject({
            url: url,
            method: "GET",
        });
        let data = await this.requestManager.schedule(request, 1);
        let $ = this.cheerio.load(data.data);

        newAdded.items = this.parseNewUpdatedSection($);
        sectionCallback(newAdded);
    }

    override getMangaDetails(mangaId: string): Promise<SourceManga | Manga> {
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

    parseNewUpdatedSection($: any): MangaTile[] {
        let newUpdatedItems: MangaTile[] = [];
        for (let manga of $('div.item', 'div.row').toArray().splice(0, 20)) {
            const title = $('figure.clearfix > figcaption > h3 > a', manga).first().text();
            const id = $('figure.clearfix > div.image > a', manga).attr('href')?.split('/').pop();
            const image = $('figure.clearfix > div.image > a > img', manga).first().attr('data-original');
            const subtitle = $("figure.clearfix > figcaption > ul > li.chapter:nth-of-type(1) > a", manga).last().text().trim();
            if (!id || !title) continue;
            newUpdatedItems.push(createMangaTile({
                id: id,
                image: !image ? "https://i.imgur.com/GYUxEX8.png" : 'http:' + image,
                title: createIconText({ text: title }),
                subtitleText: createIconText({ text: subtitle }),
            }));
        }

        return newUpdatedItems;
    }
}

