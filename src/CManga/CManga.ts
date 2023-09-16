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

const HOST = 'CManga'
import tags from './tags.json'

export const CMangaInfo: SourceInfo = {
    description: '',
    icon: 'icon.png',
    websiteBaseURL: '',
    version: getExportVersion('0.0.5'),
    name: 'CManga',
    language: 'vi',
    author: 'Hoang3409',
    contentRating: ContentRating.ADULT,
    sourceTags: [
        {
            text: '16+',
            type: BadgeColor.GREEN
        }
    ],
    intents: SourceIntents.HOMEPAGE_SECTIONS | SourceIntents.MANGA_CHAPTERS
}

export class CManga extends Main {
    Host = HOST
    Tags = tags

    UseId = false

    SearchWithGenres = true
    SearchWithNotGenres = false
    SearchWithTitleAndGenre = true
    HostDomain = 'https://cmangaaz.com/'
}
