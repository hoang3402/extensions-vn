import {
    Chapter,
    ChapterDetails,
    ContentRating,
    HomeSection,
    LanguageCode,
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

const DOMAIN = 'https://www.nettruyenvt.com';

export const NettruyenInfo: SourceInfo = {
    version: '1.0.1',
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

    override async getMangaDetails(mangaId: string): Promise<SourceManga | Manga> {
        try {
            const url = `${DOMAIN}/truyen-tranh/${mangaId}`;
            const request = createRequestObject({
                url: url,
                method: "GET",
            });
            const data = await this.requestManager.schedule(request, 1);
            let $ = this.cheerio.load(data.data);

            var temp = $('#item-detail > div.detail-info > div > div.col-xs-4.col-image > img');
            var image = 'http:' + temp.attr('src')!;
            var titles = temp.attr('alt')!;
            var des = $('#item-detail > div.detail-content > p').text();
            var id = $('#item-detail > div.detail-info > div > div.col-xs-8.col-info > div.row.rating > div:nth-child(1) > div').attr('data-id')!;
            // var rating = $('div.star').attr('data-rating')!;

            return createManga({
                id: id,
                author: "Nettruyen ăn cắp của ai đó",
                artist: 'chịu á',
                desc: des,
                titles: [titles, id],
                image: image,
                status: 1,
                rating: 5,
                hentai: false,
                tags: [],
            });
        } catch (e) {
            throw new Error("Error: " + e);
        }
    }
    override async getChapters(mangaId: string): Promise<Chapter[]> {
        try {
            const chapters: Chapter[] = [];

            const request = createRequestObject({
                url: 'https://www.nettruyenvt.com/Comic/Services/ComicService.asmx/ProcessChapterList',
                param: `?comicId=${mangaId}`,
                method: "GET",
            });

            const data = await this.requestManager.schedule(request, 1);

            let list = typeof data.data === "string"
                ? JSON.parse(data.data)
                : data.data;

            for (let chapter of list.chapters) {
                chapters.push(
                    createChapter({
                        id: chapter.url,
                        name: chapter.name,
                        mangaId: mangaId,
                        chapNum: Number.parseInt(String(chapter.name).split(' ').at(1)!),
                        langCode: LanguageCode.VIETNAMESE
                    })
                )
            }

            return chapters;
        } catch (e) {
            throw new Error("Error: " + e);
        }
    }
    override async getChapterDetails(mangaId: string, chapterId: string): Promise<ChapterDetails> {
        try {
            const request = createRequestObject({
                url: DOMAIN,
                param: chapterId,
                method: "GET",
            });

            const data = await this.requestManager.schedule(request, 1);
            let $ = this.cheerio.load(data.data);

            const pages: string[] = [];
            for (let image of $('.page-chapter').toArray()) {
                var link = $('div.page-chapter > img', image).attr('data-original')!;
                if (link.indexOf('http') === -1) {//nếu link ko có 'http'
                    pages.push('http:' + link);
                } else {
                    pages.push(link);
                }
            }

            return createChapterDetails({
                pages: pages,
                longStrip: false,
                id: chapterId,
                mangaId: mangaId,
            });
        } catch (e) {
            throw new Error("Error: " + e);
        }
    }
    override async getSearchResults(query: SearchRequest, metadata: any): Promise<PagedResults> {
        throw new Error("Method not implemented.");
    }

    parseNewUpdatedSection($: any): MangaTile[] {
        let newUpdatedItems: MangaTile[] = [];
        for (let manga of $('div.item', 'div.row').toArray().splice(0, 10)) {
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

