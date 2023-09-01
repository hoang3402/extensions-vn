import {
    ContentRating,
    SourceInfo
} from '@paperback/types'
import {
    getExportVersion, 
    Main
} from '../Main'

const HOST = 'NetTruyen'
const Domain = 'www.nettruyenus.com'
import tags from './tags.json'

export const NettruyenInfo: SourceInfo = {
    description: '',
    icon: 'icon.jpg',
    websiteBaseURL: '',
    version: getExportVersion('0.2.3'),
    name: 'Nettruyen',
    language: 'vi',
    author: 'Hoang3409',
    contentRating: ContentRating.EVERYONE
}

export class Nettruyen extends Main {
    Host = HOST
    Tags = tags

    HostDomain = `https://${Domain}/`
    UseId = true

    SearchWithGenres = true
    SearchWithNotGenres = true
    SearchWithTitleAndGenre = true
}
