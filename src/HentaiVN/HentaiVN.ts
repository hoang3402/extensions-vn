import {
    ContentRating,
    SourceInfo
} from '@paperback/types'
import {
    getExportVersion,
    Main
} from '../Main'

const HOST = 'HentaiVN'

export const HentaiVNInfo: SourceInfo = {
    description: '',
    icon: 'icon.jpg',
    websiteBaseURL: '',
    version: getExportVersion('0.0.1'),
    name: 'HentaiVN',
    language: 'vi',
    author: 'Hoang3409',
    contentRating: ContentRating.ADULT
}

export class HentaiVN extends Main {
    Host = HOST
}