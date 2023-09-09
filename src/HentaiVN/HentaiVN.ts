import {
    BadgeColor,
    ChapterDetails,
    ContentRating,
    SourceInfo,
    SourceIntents
} from '@paperback/types'
import {
    getExportVersion,
    Main
} from '../Main'

const HOST = 'HentaiVN'
import tags from './tags.json'

export const HentaiVNInfo: SourceInfo = {
    description: '',
    icon: 'icon.png',
    websiteBaseURL: '',
    version: getExportVersion('0.0.4'),
    name: 'HentaiVN',
    language: 'vi',
    author: 'Hoang3409',
    contentRating: ContentRating.ADULT,
    sourceTags: [
        {
            text: '18+',
            type: BadgeColor.RED
        }
    ],
    intents: SourceIntents.HOMEPAGE_SECTIONS | SourceIntents.MANGA_CHAPTERS
}

const Domain = 'hentaivn.tv'

export class HentaiVN extends Main {
    Host = HOST
    Tags = tags

    HostDomain = `https://${Domain}.tv/`
    UseId = true
    
    SearchWithGenres = true
    SearchWithNotGenres = false
    SearchWithTitleAndGenre = true

    override async getChapterDetails(mangaId: string, chapterId: string): Promise<ChapterDetails> {
        const data = await super.getChapterDetails(mangaId, chapterId)
        for (let img in data) {
            img = img.replace('hhentai.net', Domain)
        }
        return data
    }
}