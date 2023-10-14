import {
    Chapter,
    ChapterDetails,
    ChapterProviding,
    HomePageSectionsProviding,
    HomeSection,
    MangaProviding,
    PagedResults,
    Request,
    RequestManager,
    Response,
    SearchRequest,
    SearchResultsProviding,
    SourceManga,
    PartialSourceManga,
    TagSection,
    Tag
} from '@paperback/types'
import { convertTime } from './utils/time'

export const DOMAIN = 'https://hoang3409.link/api/'
export const TelegramEndpoint = 'https://api.telegram.org/'
export const TelegramApi = '6458222681:AAEy9Q-qHskCvymzy3JYWxu-uM1jdC16cdk'

const BASE_VERSION = '1.5.1'
export const getExportVersion = (EXTENSION_VERSION: string): string => {
    return BASE_VERSION.split('.').map((x, index) => Number(x) + Number(EXTENSION_VERSION.split('.')[index])).join('.')
}

export abstract class Main implements SearchResultsProviding, MangaProviding, ChapterProviding, HomePageSectionsProviding {
    constructor(public cheerio: CheerioAPI) {
    }

    requestsPerSecond = 5
    requestTimeout = 20_000

    requestManager: RequestManager = App.createRequestManager({
        requestsPerSecond: this.requestsPerSecond,
        requestTimeout: this.requestTimeout,
        interceptor: {
            interceptRequest: async (request: Request): Promise<Request> => {

                request.headers = {
                    ...(request.headers ?? {}),
                    ...{
                        'referer': this.HostDomain
                    }
                }

                return request
            },
            interceptResponse: async (response: Response): Promise<Response> => {
                return response
            }
        }
    })

    // Host
    abstract Host: string
    abstract Tags: any
    abstract SearchWithGenres: boolean
    abstract SearchWithNotGenres: boolean
    abstract SearchWithTitleAndGenre: boolean
    abstract UseId: boolean
    abstract HostDomain: string


    stateManager = App.createSourceStateManager()

    async getHomePageSections(sectionCallback: (section: HomeSection) => void): Promise<void> {
        const sections = []
        sections.push(App.createHomeSection({
            id: 'new',
            title: 'Mới thêm',
            containsMoreItems: true,
            type: ''
        }))

        const promises: Promise<void>[] = []

        for (const section of sections) {
            // Let the app load empty tagSections
            sectionCallback(section)
            let apiPath: string, params: string
            switch (section.id) {
                default:
                    apiPath = `${DOMAIN}AnimeMoi`
                    params = `?host=${this.Host}&page=1`
                    break
            }
            const request = App.createRequest({
                url: apiPath,
                param: params,
                method: 'GET'
            })
            // Get the section data
            const response = await this.requestManager.schedule(request, 1)
            const result = typeof response.data === 'string' ? JSON.parse(response.data) : response.data
            const items = []
            for (const item of result.mangas) {
                items.push(App.createPartialSourceManga({
                    title: item.titles[0],
                    image: item.cover,
                    mangaId: this.UseId ? item.id.toString() : item.url,
                    subtitle: undefined
                }))
            }
            section.items = items
            sectionCallback(section)
        }

        await Promise.all(promises)
    }

    async getViewMoreItems(homepageSectionId: string, metadata: any): Promise<PagedResults> {
        const page: number = metadata?.page ?? 1
        const request = App.createRequest({
            url: `${DOMAIN}AnimeMoi`,
            param: `?host=${this.Host}&page=${page}`,
            method: 'GET'
        })
        const data = await this.requestManager.schedule(request, 1)
        const result = typeof data.data === 'string' ? JSON.parse(data.data) : data.data
        const items: PartialSourceManga[] = []
        for (const item of result.mangas) {
            items.push(App.createPartialSourceManga({
                title: item.titles[0],
                image: item.cover,
                mangaId: this.UseId ? item.id.toString() : item.url,
                subtitle: undefined
            }))
        }
        // If no series were returned we are on the last page
        metadata = items.length === 0 ? undefined : { page: page + 1 }
        return App.createPagedResults({
            results: items,
            metadata: metadata
        })
    }

    async getMangaDetails(mangaId: string): Promise<SourceManga> {
        const request = App.createRequest({
            url: `${DOMAIN}AnimeMoi/Manga?idComic=${mangaId}&host=${this.Host}`,
            method: 'GET'
        })

        const response = await this.requestManager.schedule(request, 1)
        const data = typeof response.data === 'string' ? JSON.parse(response.data) : response.data
        const titles: string[] = []
        const tags: Tag[] = []
        for (const item of data.titles) {
            titles.push(item)
        }
        if (data.genres) {
            for (const item of data.genres) {
                const foundGenre = this.Tags.find((genre: any) => genre.Id === item.toString())
                if (foundGenre) {
                    tags.push(App.createTag({
                        id: foundGenre.Id,
                        label: foundGenre.Name
                    }))
                }
            }
        }

        return App.createSourceManga({
            id: mangaId,
            mangaInfo: App.createMangaInfo({
                desc: data.description || 'Đang cập nhật',
                image: data.cover,
                status: data.status == 2 ? 'Đang cập nhật' : 'Xong',
                titles: titles,
                author: data.author ?? 'Đang cập nhật',
                artist: undefined,
                tags: [App.createTagSection({ label: 'genres', tags: tags, id: '0' })]
            })
        })
    }

    async getChapters(mangaId: string): Promise<Chapter[]> {
        const request = App.createRequest({
            url: `${DOMAIN}AnimeMoi/Chapter`,
            param: `?idComic=${mangaId}&host=${this.Host}`,
            method: 'GET'
        })
        const response = await this.requestManager.schedule(request, 1)
        const data = typeof response.data === 'string' ? JSON.parse(response.data) : response.data
        const chapters: Chapter[] = []
        for (const item of data) {
            const time = convertTime(item.timeUpdate)
            time.setHours(time.getHours() + 7)
            chapters.push(App.createChapter({
                id: this.UseId ? item.id.toString() : item.url,
                chapNum: item.numChap ?? item.chapNumber,
                name: item.title,
                time: time
            }))
        }
        return chapters
    }

    async getChapterDetails(mangaId: string, chapterId: string): Promise<ChapterDetails> {
        const request = App.createRequest({
            url: `${DOMAIN}AnimeMoi/ChapterDetail`,
            param: `?idChapter=${chapterId}&host=${this.Host}`,
            method: 'GET'
        })
        const response = await this.requestManager.schedule(request, 1)
        const data = typeof response.data === 'string' ? JSON.parse(response.data) : response.data
        const imagePromises = data.map(async (image: string) => {
            let img: string = image.toString()
            if (img.startsWith('//')) {
                img = 'https:' + img
            }
            img = img.replace('http:', 'https:')
            if (!img.includes('http')) {
                return await this.getLinkImage(img)
            }
            return img
        })

        const images = await Promise.all(imagePromises)

        return App.createChapterDetails({
            id: chapterId,
            mangaId: mangaId,
            pages: images
        })
    }

    async getSearchResults(query: SearchRequest, metadata: any): Promise<PagedResults> {
        const page: number = metadata?.page ?? 1
        const postData: any = {
            query: '',
            page: page,
            genres: [],
            exclude: [],
            status: 0
        }
        if (query.title) {
            postData.query = encodeURIComponent(query.title)
        }
        if (query.includedTags[0]) {
            query.includedTags.forEach((genre) => {
                postData.genres.push(genre.id)
            })
        }
        if (query.excludedTags[0]) {
            query.excludedTags.forEach((genre) => {
                postData.exclude.push(genre.id)
            })
        }

        const request = App.createRequest({
            method: 'POST',
            url: `${DOMAIN}AnimeMoi/Search?host=${this.Host}`,
            data: postData,
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const response = await this.requestManager.schedule(request, 1)
        const result = typeof response.data === 'string' ? JSON.parse(response.data) : response.data
        const tiles: PartialSourceManga[] = []
        result.forEach((item: any) => {
            tiles.push(App.createPartialSourceManga({
                title: item.titles[0],
                image: item.cover,
                mangaId: this.UseId ? item.id.toString() : item.url,
                subtitle: undefined
            }))
        })

        metadata = tiles.length === 0 ? undefined : { page: page + 1 }
        return App.createPagedResults({
            results: tiles,
            metadata
        })
    }

    async getSearchTags(): Promise<TagSection[]> {
        const result: TagSection[] = []
        const tags = this.Tags.map((x: any) => App.createTag({
            id: x.Id.toString(),
            label: x.Name
        }))

        let label = 'Thể loại'
        if (this.SearchWithGenres) {
            label += ' - Có thể tìm kiếm với nhiều thể loại'
        } else {
            label += ' - Chỉ có thể tìm kiếm với 1 thể loại'
        }
        if (this.SearchWithTitleAndGenre) {
            label += '- Có thể tìm kiếm với tên truyện cùng với thể loại'
        } else {
            label += '- Không thể tìm kiếm cùng lúc tên truyện và thể loại'
        }

        result.push(App.createTagSection({
            id: '0',
            label: label,
            tags: tags
        }))

        return result
    }

    async getLinkImage(id: string): Promise<string> {
        const request = App.createRequest({
            url: `${TelegramEndpoint}bot${TelegramApi}/getFile?file_id=${id}`,
            method: 'GET'
        })
        const response = await this.requestManager.schedule(request, 0)
        const data = typeof response.data === 'string' ? JSON.parse(response.data) : response.data
        return `${TelegramEndpoint}file/bot${TelegramApi}/${data.result.file_path}`
    }
}
