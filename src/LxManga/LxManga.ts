import {
    BadgeColor,
    ContentRating,
    SourceInfo,
    SourceIntents
} from '@paperback/types'
import {
    getExportVersion,
    Main
} from '../Main'

const HOST = 'LxManga'
import tags from './tags.json'

export const LxMangaInfo: SourceInfo = {
    description: '',
    icon: 'icon.ico',
    websiteBaseURL: '',
    version: getExportVersion('0.0.2'),
    name: ' LxManga',
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

export class LxManga extends Main {
    Host = HOST
    Tags = tags

    UseId = false
    
    SearchWithGenres = true
    SearchWithNotGenres = true
    SearchWithTitleAndGenre = true
    HostDomain = 'https://lxmanga.net/'
}