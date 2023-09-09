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

const HOST = 'Yurineko'
import tags from './tags.json'

export const YurinekoInfo: SourceInfo = {
    description: '',
    icon: 'icon.png',
    websiteBaseURL: '',
    version: getExportVersion('0.0.3'),
    name: 'Yurineko',
    language: 'vi',
    author: 'Hoang3409',
    contentRating: ContentRating.ADULT,
    sourceTags: [
        {
            text: '18+',
            type: BadgeColor.RED
        },
        {
            text: '16+',
            type: BadgeColor.GREEN
        }
    ],
    intents: SourceIntents.HOMEPAGE_SECTIONS | SourceIntents.MANGA_CHAPTERS
}

const Domain = 'yurineko.net'

export class Yurineko extends Main {
    Host = HOST
    Tags = tags

    HostDomain = `https://${Domain}/`
    UseId = true

    SearchWithGenres = true
    SearchWithNotGenres = false
    SearchWithTitleAndGenre = true
}