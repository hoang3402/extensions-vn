import {
    ContentRating,
    SourceInfo
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
    version: getExportVersion('0.0.2'),
    name: 'HentaiVN',
    language: 'vi',
    author: 'Hoang3409',
    contentRating: ContentRating.ADULT
}

export class HentaiVN extends Main {
    Host = HOST
    Tags = tags

    HostDomain = 'https://hentaivn.tv/'
    UseId = true
    
    SearchWithGenres = true
    SearchWithNotGenres = false
    SearchWithTitleAndGenre = true
}