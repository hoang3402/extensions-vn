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
    Tag,
    TagSection,
    TagType,
} from "paperback-extensions-common";

import tags from "./tags.json";

const DOMAIN = "https://www.nettruyenvt.com";

export const NettruyenInfo: SourceInfo = {
    version: "1.0.6",
    name: "NetTruyen",
    icon: "icon.jpg",
    author: "Hoang3409",
    authorWebsite: "https://github.com/hoang3402",
    description: "Extension that pulls manga from NetTruyen.",
    websiteBaseURL: DOMAIN,
    contentRating: ContentRating.MATURE,
    sourceTags: [
        {
            text: "Recommended",
            type: TagType.BLUE,
        },
        {
            text: "Notifications",
            type: TagType.GREEN,
        },
    ],
};

export class Nettruyen extends Source {
    requestManager = createRequestManager({
        requestsPerSecond: 5,
        requestTimeout: 20000,
        interceptor: {
            interceptRequest: async (request: Request): Promise<Request> => {
                request.headers = {
                    ...(request.headers ?? {}),
                    ...{
                        referer: DOMAIN,
                    },
                };
                return request;
            },

            interceptResponse: async (response: Response): Promise<Response> => {
                return response;
            },
        },
    });

    override async getHomePageSections(
        sectionCallback: (section: HomeSection) => void
    ): Promise<void> {
        let newAdded: HomeSection = createHomeSection({
            id: "new_added",
            title: "Truyện Mới Thêm",
            view_more: true,
        });

        //Load empty sections
        sectionCallback(newAdded);

        //New Updates
        let url = `${DOMAIN}`;
        let request = createRequestObject({
            url: url,
            method: "GET",
        });
        let data = await this.requestManager.schedule(request, 1);
        let $ = this.cheerio.load(data.data);

        newAdded.items = this.parseNewUpdatedSection($);
        sectionCallback(newAdded);
    }

    override async getMangaDetails(mangaId: string): Promise<Manga> {
        try {
            const Tags = await this.getSearchTags();
            const url = `${DOMAIN}/truyen-tranh/${mangaId}`;
            const request = createRequestObject({
                url: url,
                method: "GET",
            });
            const data = await this.requestManager.schedule(request, 1);
            let $ = this.cheerio.load(data.data);

            var temp = $(
                "#item-detail > div.detail-info > div > div.col-xs-4.col-image > img"
            );
            var image = "http:" + temp.attr("src")!;
            var titles = temp.attr("alt")!;
            var des = $("#item-detail > div.detail-content > p").text();
            var id = $(
                "#item-detail > div.detail-info > div > div.col-xs-8.col-info > div.row.rating > div:nth-child(1) > div"
            ).attr("data-id")!;
            var tags: Tag[] = [];
            for (let tag of $(".kind.row > .col-xs-8 > a").toArray()) {
                const label = $(tag).text();
                const id = Tags[0]!.tags.find((tag) => tag.label == label);
                if (!id) continue;
                tags.push(
                    createTag({
                        id: id.id,
                        label: label,
                    })
                );
            }
            // var rating = $('div.star').attr('data-rating')!;

            return createManga({
                id: id,
                author: "Nettruyen ăn cắp của ai đó",
                artist: "chịu á",
                desc: des,
                titles: [titles, id],
                image: image,
                status: 1,
                rating: 5,
                hentai: false,
                tags: [
                    createTagSection({
                        id: "0",
                        label: "Thể loại",
                        tags: tags,
                    }),
                ],
            });
        } catch (e) {
            throw new Error("Error: " + e);
        }
    }

    override async getChapters(mangaId: string): Promise<Chapter[]> {
        const chapters: Chapter[] = [];

        const request = createRequestObject({
            url: `${DOMAIN}/Comic/Services/ComicService.asmx/ProcessChapterList`,
            param: `?comicId=${mangaId}`,
            method: "GET",
        });

        const data = await this.requestManager.schedule(request, 1);

        let list =
            typeof data.data === "string" ? JSON.parse(data.data) : data.data;

        for (let chapter of list.chapters) {
            chapters.push(
                createChapter({
                    id: chapter.url,
                    name: chapter.name,
                    mangaId: mangaId,
                    chapNum: Number.parseInt(String(chapter.name).split(" ").at(1)!),
                    langCode: LanguageCode.VIETNAMESE,
                })
            );
        }

        return chapters;
    }

    override async getChapterDetails(
        mangaId: string,
        chapterId: string
    ): Promise<ChapterDetails> {
        const request = createRequestObject({
            url: DOMAIN,
            param: chapterId,
            method: "GET",
        });

        const data = await this.requestManager.schedule(request, 1);
        let $ = this.cheerio.load(data.data);

        const pages: string[] = [];
        for (let image of $(".page-chapter").toArray()) {
            var link = $("div.page-chapter > img", image).attr("data-original")!;
            if (link.indexOf("http") === -1) {
                pages.push("http:" + link);
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
    }

    override async getSearchResults(
        query: SearchRequest,
        metadata: any
    ): Promise<PagedResults> {
        const page: number = metadata?.page ?? 1;
        let advanced: boolean;
        const tiles: MangaTile[] = [];
        let url = "";
        let param = "";

        if (query.includedTags!.length > 0) {
            advanced = true;
            url = `${DOMAIN}/tim-truyen-nang-cao`;
            param = `?genres=${query
                .includedTags!.map((tag) => tag.id)
                .join(
                    ","
                )}&notgenres=&gender=-1&status=-1&minchapter=1&sort=0?page=${page}`;
        } else {
            advanced = false;
            url = `${DOMAIN}/Comic/Services/SuggestSearch.ashx`;
            param = `?q=${encodeURIComponent(query.title!)}`;
        }

        const request = createRequestObject({
            url: url,
            param: param,
            method: "GET",
        });
        let data: Response;
        try {
            data = await this.requestManager.schedule(request, 1);
        } catch (error) {
            console.log(`searchRequest failed with error: ${error}`);
            return createPagedResults({
                results: getServerUnavailableMangaTiles(),
            });
        }
        let $ = this.cheerio.load(data.data);

        if (advanced) {
            for (let item of $(".item").toArray()) {
                var img = $("img", item).attr("data-original")!;
                if (img === undefined) {
                    img = $("img", item).attr("src")!;
                }
                tiles.push(
                    createMangaTile({
                        id: $("a", item)
                            .attr("href")
                            ?.replace(`${DOMAIN}/truyen-tranh/`, "")!,
                        title: createIconText({ text: $("h3 > a", item).text() }),
                        image: "http:" + img,
                    })
                );
            }
        } else {
            for (let item of $("li").toArray()) {
                tiles.push(
                    createMangaTile({
                        id: $("a", item)
                            .attr("href")
                            ?.replace(`${DOMAIN}/truyen-tranh/`, "")!,
                        title: createIconText({ text: $("a > h3", item).text() }),
                        image: "http:" + $("a > img", item).attr("src")!,
                    })
                );
            }
        }

        if (tiles.length == 0) {
            return createPagedResults({
                results: getServerUnavailableMangaTiles(),
            });
        }

        metadata = tiles.length === 0 ? undefined : { page: page + 1 };

        return createPagedResults({
            results: tiles,
            metadata: metadata,
        });
    }

    override async getViewMoreItems(
        homepageSectionId: string,
        metadata: any
    ): Promise<PagedResults> {
        const page: number = metadata?.page ?? 1;

        switch (homepageSectionId) {
            case "new_added":
                break;
            default:
                throw new Error("Làm gì có page này?!");
        }

        const request = createRequestObject({
            url: `${DOMAIN}/tim-truyen-nang-cao`,
            param: `?page=${page}`,
            method: "GET",
        });

        const data = await this.requestManager.schedule(request, 1);
        const $ = this.cheerio.load(data.data);
        const tiles: MangaTile[] = [];

        for (let manga of $("div.item", "div.row").toArray()) {
            const title = $("figure.clearfix > figcaption > h3 > a", manga)
                .first()
                .text();
            const id = $("figure.clearfix > div.image > a", manga)
                .attr("href")
                ?.split("/")
                .pop();
            const image = $("figure.clearfix > div.image > a > img", manga)
                .first()
                .attr("data-original");
            const subtitle = $(
                "figure.clearfix > figcaption > ul > li.chapter:nth-of-type(1) > a",
                manga
            )
                .last()
                .text()
                .trim();
            if (!id || !title) continue;
            tiles.push(
                createMangaTile({
                    id: id,
                    image: !image ? "https://i.imgur.com/GYUxEX8.png" : "http:" + image,
                    title: createIconText({ text: title }),
                    subtitleText: createIconText({ text: subtitle }),
                })
            );
        }

        metadata = tiles.length === 0 ? undefined : { page: page + 1 };

        return createPagedResults({
            results: tiles,
            metadata: metadata,
        });
    }

    parseNewUpdatedSection($: any): MangaTile[] {
        let newUpdatedItems: MangaTile[] = [];

        for (let manga of $("div.item", "div.row").toArray().splice(0, 10)) {
            const title = $("figure.clearfix > figcaption > h3 > a", manga)
                .first()
                .text();
            const id = $("figure.clearfix > div.image > a", manga)
                .attr("href")
                ?.split("/")
                .pop();
            const image = $("figure.clearfix > div.image > a > img", manga)
                .first()
                .attr("data-original");
            const subtitle = $(
                "figure.clearfix > figcaption > ul > li.chapter:nth-of-type(1) > a",
                manga
            )
                .last()
                .text()
                .trim();
            if (!id || !title) continue;
            newUpdatedItems.push(
                createMangaTile({
                    id: id,
                    image: !image ? "https://i.imgur.com/GYUxEX8.png" : "http:" + image,
                    title: createIconText({ text: title }),
                    subtitleText: createIconText({ text: subtitle }),
                })
            );
        }

        return newUpdatedItems;
    }

    override async getSearchTags(): Promise<TagSection[]> {
        const tagSections: TagSection[] = [
            createTagSection({
                id: "0",
                label: "Thể loại",
                tags: tags.map((tag) =>
                    createTag({
                        id: tag.id,
                        label: tag.label,
                    })
                ),
            }),
        ];

        // var tags: Tag[] = [];
        // const request = createRequestObject({
        //     url: `${DOMAIN}/tim-truyen-nang-cao`,
        //     method: "GET",
        // });
        // const data = await this.requestManager.schedule(request, 1)
        // const $ = this.cheerio.load(data.data)
        // for (const item of $('.row > .col-md-3.col-sm-4.col-xs-6.mrb10').toArray()) {
        //     tags.push(createTag({
        //         id: $('span', item).attr('data-id'),
        //         label: $('.genre-item', item).text().replace('\n\n', '')
        //     }))
        // }
        // tagSections[0]!.tags = tags;

        return tagSections;
    }
}

export function getServerUnavailableMangaTiles(): MangaTile[] {
    // This tile is used as a placeholder when the server is unavailable
    return [
        createMangaTile({
            id: "placeholder-id",
            title: createIconText({ text: "Server" }),
            image: "",
            subtitleText: createIconText({ text: "unavailable" }),
        }),
    ];
}
