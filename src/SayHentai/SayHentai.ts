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

const HOST = 'SayHentai'
const Domain = 'sayhentai.me'
import tags from './tags.json'

export const SayHentaiInfo: SourceInfo = {
    description: '',
    icon: 'icon.png',
    websiteBaseURL: '',
    version: getExportVersion('0.2.1'),
    name: 'SayHentai',
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

export class SayHentai extends Main {
    Host = HOST
    Tags = tags

    HostDomain = `https://${Domain}/`
    UseId = true

    SearchWithGenres = true
    SearchWithNotGenres = true
    SearchWithTitleAndGenre = true
}