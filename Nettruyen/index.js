(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Sources = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadgeColor = void 0;
var BadgeColor;
(function (BadgeColor) {
    BadgeColor["BLUE"] = "default";
    BadgeColor["GREEN"] = "success";
    BadgeColor["GREY"] = "info";
    BadgeColor["YELLOW"] = "warning";
    BadgeColor["RED"] = "danger";
})(BadgeColor = exports.BadgeColor || (exports.BadgeColor = {}));

},{}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeSectionType = void 0;
var HomeSectionType;
(function (HomeSectionType) {
    HomeSectionType["singleRowNormal"] = "singleRowNormal";
    HomeSectionType["singleRowLarge"] = "singleRowLarge";
    HomeSectionType["doubleRow"] = "doubleRow";
    HomeSectionType["featured"] = "featured";
})(HomeSectionType = exports.HomeSectionType || (exports.HomeSectionType = {}));

},{}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],5:[function(require,module,exports){
"use strict";
/**
 * Request objects hold information for a particular source (see sources for example)
 * This allows us to to use a generic api to make the calls against any source
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.urlEncodeObject = exports.convertTime = exports.Source = void 0;
/**
* @deprecated Use {@link PaperbackExtensionBase}
*/
class Source {
    constructor(cheerio) {
        this.cheerio = cheerio;
    }
    /**
     * @deprecated use {@link Source.getSearchResults getSearchResults} instead
     */
    searchRequest(query, metadata) {
        return this.getSearchResults(query, metadata);
    }
    /**
     * @deprecated use {@link Source.getSearchTags} instead
     */
    async getTags() {
        // @ts-ignore
        return this.getSearchTags?.();
    }
}
exports.Source = Source;
// Many sites use '[x] time ago' - Figured it would be good to handle these cases in general
function convertTime(timeAgo) {
    let time;
    let trimmed = Number((/\d*/.exec(timeAgo) ?? [])[0]);
    trimmed = (trimmed == 0 && timeAgo.includes('a')) ? 1 : trimmed;
    if (timeAgo.includes('minutes')) {
        time = new Date(Date.now() - trimmed * 60000);
    }
    else if (timeAgo.includes('hours')) {
        time = new Date(Date.now() - trimmed * 3600000);
    }
    else if (timeAgo.includes('days')) {
        time = new Date(Date.now() - trimmed * 86400000);
    }
    else if (timeAgo.includes('year') || timeAgo.includes('years')) {
        time = new Date(Date.now() - trimmed * 31556952000);
    }
    else {
        time = new Date(Date.now());
    }
    return time;
}
exports.convertTime = convertTime;
/**
 * When a function requires a POST body, it always should be defined as a JsonObject
 * and then passed through this function to ensure that it's encoded properly.
 * @param obj
 */
function urlEncodeObject(obj) {
    let ret = {};
    for (const entry of Object.entries(obj)) {
        ret[encodeURIComponent(entry[0])] = encodeURIComponent(entry[1]);
    }
    return ret;
}
exports.urlEncodeObject = urlEncodeObject;

},{}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentRating = exports.SourceIntents = void 0;
var SourceIntents;
(function (SourceIntents) {
    SourceIntents[SourceIntents["MANGA_CHAPTERS"] = 1] = "MANGA_CHAPTERS";
    SourceIntents[SourceIntents["MANGA_TRACKING"] = 2] = "MANGA_TRACKING";
    SourceIntents[SourceIntents["HOMEPAGE_SECTIONS"] = 4] = "HOMEPAGE_SECTIONS";
    SourceIntents[SourceIntents["COLLECTION_MANAGEMENT"] = 8] = "COLLECTION_MANAGEMENT";
    SourceIntents[SourceIntents["CLOUDFLARE_BYPASS_REQUIRED"] = 16] = "CLOUDFLARE_BYPASS_REQUIRED";
    SourceIntents[SourceIntents["SETTINGS_UI"] = 32] = "SETTINGS_UI";
})(SourceIntents = exports.SourceIntents || (exports.SourceIntents = {}));
/**
 * A content rating to be attributed to each source.
 */
var ContentRating;
(function (ContentRating) {
    ContentRating["EVERYONE"] = "EVERYONE";
    ContentRating["MATURE"] = "MATURE";
    ContentRating["ADULT"] = "ADULT";
})(ContentRating = exports.ContentRating || (exports.ContentRating = {}));

},{}],7:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./Source"), exports);
__exportStar(require("./ByteArray"), exports);
__exportStar(require("./Badge"), exports);
__exportStar(require("./interfaces"), exports);
__exportStar(require("./SourceInfo"), exports);
__exportStar(require("./HomeSectionType"), exports);
__exportStar(require("./PaperbackExtensionBase"), exports);

},{"./Badge":1,"./ByteArray":2,"./HomeSectionType":3,"./PaperbackExtensionBase":4,"./Source":5,"./SourceInfo":6,"./interfaces":15}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],10:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],11:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],12:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],13:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],14:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],15:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./ChapterProviding"), exports);
__exportStar(require("./CloudflareBypassRequestProviding"), exports);
__exportStar(require("./HomePageSectionsProviding"), exports);
__exportStar(require("./MangaProgressProviding"), exports);
__exportStar(require("./MangaProviding"), exports);
__exportStar(require("./RequestManagerProviding"), exports);
__exportStar(require("./SearchResultsProviding"), exports);

},{"./ChapterProviding":8,"./CloudflareBypassRequestProviding":9,"./HomePageSectionsProviding":10,"./MangaProgressProviding":11,"./MangaProviding":12,"./RequestManagerProviding":13,"./SearchResultsProviding":14}],16:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],17:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],18:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],19:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],20:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],21:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],22:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],23:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],24:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],25:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],26:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],27:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],28:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],29:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],30:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],31:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],32:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],33:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],34:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],35:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],36:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],37:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],38:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],39:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],40:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],41:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],42:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],43:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],44:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],45:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],46:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],47:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],48:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],49:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],50:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],51:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],52:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],53:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],54:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],55:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],56:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],57:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],58:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],59:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],60:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./DynamicUI/Exports/DUIBinding"), exports);
__exportStar(require("./DynamicUI/Exports/DUIForm"), exports);
__exportStar(require("./DynamicUI/Exports/DUIFormRow"), exports);
__exportStar(require("./DynamicUI/Exports/DUISection"), exports);
__exportStar(require("./DynamicUI/Rows/Exports/DUIButton"), exports);
__exportStar(require("./DynamicUI/Rows/Exports/DUIHeader"), exports);
__exportStar(require("./DynamicUI/Rows/Exports/DUIInputField"), exports);
__exportStar(require("./DynamicUI/Rows/Exports/DUILabel"), exports);
__exportStar(require("./DynamicUI/Rows/Exports/DUILink"), exports);
__exportStar(require("./DynamicUI/Rows/Exports/DUIMultilineLabel"), exports);
__exportStar(require("./DynamicUI/Rows/Exports/DUINavigationButton"), exports);
__exportStar(require("./DynamicUI/Rows/Exports/DUIOAuthButton"), exports);
__exportStar(require("./DynamicUI/Rows/Exports/DUISecureInputField"), exports);
__exportStar(require("./DynamicUI/Rows/Exports/DUISelect"), exports);
__exportStar(require("./DynamicUI/Rows/Exports/DUIStepper"), exports);
__exportStar(require("./DynamicUI/Rows/Exports/DUISwitch"), exports);
__exportStar(require("./Exports/ChapterDetails"), exports);
__exportStar(require("./Exports/Chapter"), exports);
__exportStar(require("./Exports/Cookie"), exports);
__exportStar(require("./Exports/HomeSection"), exports);
__exportStar(require("./Exports/IconText"), exports);
__exportStar(require("./Exports/MangaInfo"), exports);
__exportStar(require("./Exports/MangaProgress"), exports);
__exportStar(require("./Exports/PartialSourceManga"), exports);
__exportStar(require("./Exports/MangaUpdates"), exports);
__exportStar(require("./Exports/PBCanvas"), exports);
__exportStar(require("./Exports/PBImage"), exports);
__exportStar(require("./Exports/PagedResults"), exports);
__exportStar(require("./Exports/RawData"), exports);
__exportStar(require("./Exports/Request"), exports);
__exportStar(require("./Exports/SourceInterceptor"), exports);
__exportStar(require("./Exports/RequestManager"), exports);
__exportStar(require("./Exports/Response"), exports);
__exportStar(require("./Exports/SearchField"), exports);
__exportStar(require("./Exports/SearchRequest"), exports);
__exportStar(require("./Exports/SourceCookieStore"), exports);
__exportStar(require("./Exports/SourceManga"), exports);
__exportStar(require("./Exports/SecureStateManager"), exports);
__exportStar(require("./Exports/SourceStateManager"), exports);
__exportStar(require("./Exports/Tag"), exports);
__exportStar(require("./Exports/TagSection"), exports);
__exportStar(require("./Exports/TrackedMangaChapterReadAction"), exports);
__exportStar(require("./Exports/TrackerActionQueue"), exports);

},{"./DynamicUI/Exports/DUIBinding":17,"./DynamicUI/Exports/DUIForm":18,"./DynamicUI/Exports/DUIFormRow":19,"./DynamicUI/Exports/DUISection":20,"./DynamicUI/Rows/Exports/DUIButton":21,"./DynamicUI/Rows/Exports/DUIHeader":22,"./DynamicUI/Rows/Exports/DUIInputField":23,"./DynamicUI/Rows/Exports/DUILabel":24,"./DynamicUI/Rows/Exports/DUILink":25,"./DynamicUI/Rows/Exports/DUIMultilineLabel":26,"./DynamicUI/Rows/Exports/DUINavigationButton":27,"./DynamicUI/Rows/Exports/DUIOAuthButton":28,"./DynamicUI/Rows/Exports/DUISecureInputField":29,"./DynamicUI/Rows/Exports/DUISelect":30,"./DynamicUI/Rows/Exports/DUIStepper":31,"./DynamicUI/Rows/Exports/DUISwitch":32,"./Exports/Chapter":33,"./Exports/ChapterDetails":34,"./Exports/Cookie":35,"./Exports/HomeSection":36,"./Exports/IconText":37,"./Exports/MangaInfo":38,"./Exports/MangaProgress":39,"./Exports/MangaUpdates":40,"./Exports/PBCanvas":41,"./Exports/PBImage":42,"./Exports/PagedResults":43,"./Exports/PartialSourceManga":44,"./Exports/RawData":45,"./Exports/Request":46,"./Exports/RequestManager":47,"./Exports/Response":48,"./Exports/SearchField":49,"./Exports/SearchRequest":50,"./Exports/SecureStateManager":51,"./Exports/SourceCookieStore":52,"./Exports/SourceInterceptor":53,"./Exports/SourceManga":54,"./Exports/SourceStateManager":55,"./Exports/Tag":56,"./Exports/TagSection":57,"./Exports/TrackedMangaChapterReadAction":58,"./Exports/TrackerActionQueue":59}],61:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./generated/_exports"), exports);
__exportStar(require("./base/index"), exports);
__exportStar(require("./compat/DyamicUI"), exports);

},{"./base/index":7,"./compat/DyamicUI":16,"./generated/_exports":60}],62:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Main = exports.getExportVersion = exports.TelegramApi = exports.TelegramEndpoint = exports.DOMAIN = void 0;
const time_1 = require("./utils/time");
exports.DOMAIN = 'https://hoang3409.link/api/';
exports.TelegramEndpoint = 'https://api.telegram.org/';
exports.TelegramApi = '6690512898:AAFvzwcfQ1axac2bDrTpRZDU4p3gFh_Gh1A';
const BASE_VERSION = '1.4.2';
const getExportVersion = (EXTENSION_VERSION) => {
    return BASE_VERSION.split('.').map((x, index) => Number(x) + Number(EXTENSION_VERSION.split('.')[index])).join('.');
};
exports.getExportVersion = getExportVersion;
class Main {
    constructor(cheerio) {
        this.cheerio = cheerio;
        this.requestsPerSecond = 5;
        this.requestTimeout = 20000;
        this.requestManager = App.createRequestManager({
            requestsPerSecond: this.requestsPerSecond,
            requestTimeout: this.requestTimeout,
            interceptor: {
                interceptRequest: async (request) => {
                    request.headers = {
                        ...(request.headers ?? {}),
                        ...{
                            'referer': this.HostDomain
                        }
                    };
                    return request;
                },
                interceptResponse: async (response) => {
                    return response;
                }
            }
        });
        this.stateManager = App.createSourceStateManager();
    }
    async getHomePageSections(sectionCallback) {
        const sections = [];
        sections.push(App.createHomeSection({
            id: 'new',
            title: 'Mới thêm',
            containsMoreItems: true,
            type: ''
        }));
        const promises = [];
        for (const section of sections) {
            // Let the app load empty tagSections
            sectionCallback(section);
            let apiPath, params;
            switch (section.id) {
                default:
                    apiPath = `${exports.DOMAIN}AnimeMoi`;
                    params = `?host=${this.Host}&page=1`;
                    break;
            }
            const request = App.createRequest({
                url: apiPath,
                param: params,
                method: 'GET'
            });
            // Get the section data
            const response = await this.requestManager.schedule(request, 1);
            const result = typeof response.data === 'string' ? JSON.parse(response.data) : response.data;
            const items = [];
            for (const item of result.mangas) {
                items.push(App.createPartialSourceManga({
                    title: item.titles[0],
                    image: item.cover,
                    mangaId: this.UseId ? item.id.toString() : item.url,
                    subtitle: undefined
                }));
            }
            section.items = items;
            sectionCallback(section);
        }
        await Promise.all(promises);
    }
    async getViewMoreItems(homepageSectionId, metadata) {
        const page = metadata?.page ?? 1;
        const request = App.createRequest({
            url: `${exports.DOMAIN}AnimeMoi`,
            param: `?host=${this.Host}&page=${page}`,
            method: 'GET'
        });
        const data = await this.requestManager.schedule(request, 1);
        const result = typeof data.data === 'string' ? JSON.parse(data.data) : data.data;
        const items = [];
        for (const item of result.mangas) {
            items.push(App.createPartialSourceManga({
                title: item.titles[0],
                image: item.cover,
                mangaId: this.UseId ? item.id.toString() : item.url,
                subtitle: undefined
            }));
        }
        // If no series were returned we are on the last page
        metadata = items.length === 0 ? undefined : { page: page + 1 };
        return App.createPagedResults({
            results: items,
            metadata: metadata
        });
    }
    async getMangaDetails(mangaId) {
        const request = App.createRequest({
            url: `${exports.DOMAIN}AnimeMoi/Manga?idComic=${mangaId}`,
            method: 'GET'
        });
        const response = await this.requestManager.schedule(request, 1);
        const data = typeof response.data === 'string' ? JSON.parse(response.data) : response.data;
        const titles = [];
        const tags = [];
        for (const item of data.titles) {
            titles.push(item);
        }
        if (data.genres) {
            for (const item of data.genres) {
                const foundGenre = this.Tags.find((genre) => genre.Id === item.toString());
                if (foundGenre) {
                    tags.push(App.createTag({
                        id: foundGenre.Id,
                        label: foundGenre.Name
                    }));
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
        });
    }
    async getChapters(mangaId) {
        const request = App.createRequest({
            url: `${exports.DOMAIN}AnimeMoi/Chapter`,
            param: `?idComic=${mangaId}`,
            method: 'GET'
        });
        const response = await this.requestManager.schedule(request, 1);
        const data = typeof response.data === 'string' ? JSON.parse(response.data) : response.data;
        const chapters = [];
        for (const item of data) {
            const time = (0, time_1.convertTime)(item.timeUpdate);
            time.setHours(time.getHours() + 7);
            chapters.push(App.createChapter({
                id: this.UseId ? item.id.toString() : item.url,
                chapNum: item.numChap ?? item.chapNumber,
                name: item.title,
                time: time
            }));
        }
        return chapters;
    }
    async getChapterDetails(mangaId, chapterId) {
        const request = App.createRequest({
            url: `${exports.DOMAIN}AnimeMoi/ChapterDetail`,
            param: `?idChapter=${chapterId}`,
            method: 'GET'
        });
        const response = await this.requestManager.schedule(request, 1);
        const data = typeof response.data === 'string' ? JSON.parse(response.data) : response.data;
        const imagePromises = data.map(async (image) => {
            let img = image.toString();
            if (img.startsWith('//')) {
                img = 'https:' + img;
            }
            img = img.replace('http:', 'https:');
            if (!img.includes('http')) {
                return await this.getLinkImage(img);
            }
            return img;
        });
        const images = await Promise.all(imagePromises);
        return App.createChapterDetails({
            id: chapterId,
            mangaId: mangaId,
            pages: images
        });
    }
    async getSearchResults(query, metadata) {
        const page = metadata?.page ?? 1;
        const postData = {
            query: '',
            page: page,
            genres: [],
            exclude: [],
            status: 0
        };
        if (query.title) {
            postData.query = encodeURIComponent(query.title);
        }
        if (query.includedTags[0]) {
            query.includedTags.forEach((genre) => {
                postData.genres.push(genre.id);
            });
        }
        if (query.excludedTags[0]) {
            query.excludedTags.forEach((genre) => {
                postData.exclude.push(genre.id);
            });
        }
        const request = App.createRequest({
            method: 'POST',
            url: `${exports.DOMAIN}AnimeMoi/Search?host=${this.Host}`,
            data: postData,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const response = await this.requestManager.schedule(request, 1);
        const result = typeof response.data === 'string' ? JSON.parse(response.data) : response.data;
        const tiles = [];
        result.forEach((item) => {
            tiles.push(App.createPartialSourceManga({
                title: item.titles[0],
                image: item.cover,
                mangaId: this.UseId ? item.id.toString() : item.url,
                subtitle: undefined
            }));
        });
        metadata = tiles.length === 0 ? undefined : { page: page + 1 };
        return App.createPagedResults({
            results: tiles,
            metadata
        });
    }
    async getSearchTags() {
        const result = [];
        const tags = this.Tags.map((x) => App.createTag({
            id: x.Id.toString(),
            label: x.Name
        }));
        let label = 'Thể loại';
        if (this.SearchWithGenres) {
            label += ' - Có thể tìm kiếm với nhiều thể loại';
        }
        else {
            label += ' - Chỉ có thể tìm kiếm với 1 thể loại';
        }
        if (this.SearchWithTitleAndGenre) {
            label += '- Có thể tìm kiếm với tên truyện cùng với thể loại';
        }
        else {
            label += '- Không thể tìm kiếm cùng lúc tên truyện và thể loại';
        }
        result.push(App.createTagSection({
            id: '0',
            label: label,
            tags: tags
        }));
        return result;
    }
    async getLinkImage(id) {
        const request = App.createRequest({
            url: `${exports.TelegramEndpoint}bot${exports.TelegramApi}/getFile?file_id=${id}`,
            method: 'GET'
        });
        const response = await this.requestManager.schedule(request, 0);
        const data = typeof response.data === 'string' ? JSON.parse(response.data) : response.data;
        return `${exports.TelegramEndpoint}file/bot${exports.TelegramApi}/${data.result.file_path}`;
    }
}
exports.Main = Main;

},{"./utils/time":66}],63:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Nettruyen = exports.NettruyenInfo = void 0;
const types_1 = require("@paperback/types");
const Main_1 = require("../Main");
const NettruyenAuth_1 = require("./NettruyenAuth");
const tags_json_1 = __importDefault(require("./tags.json"));
const HOST = 'NetTruyen';
const Domain = 'www.nettruyenus.com';
exports.NettruyenInfo = {
    description: '',
    icon: 'icon.jpg',
    websiteBaseURL: '',
    version: (0, Main_1.getExportVersion)('0.3.6'),
    name: 'Nettruyen',
    language: 'vi',
    author: 'Hoang3409',
    contentRating: types_1.ContentRating.EVERYONE,
    sourceTags: [
        {
            text: '16+',
            type: types_1.BadgeColor.GREEN
        }
    ],
    intents: types_1.SourceIntents.HOMEPAGE_SECTIONS | types_1.SourceIntents.MANGA_CHAPTERS | types_1.SourceIntents.MANGA_TRACKING | types_1.SourceIntents.SETTINGS_UI
};
class Nettruyen extends Main_1.Main {
    constructor() {
        super(...arguments);
        this.Host = HOST;
        this.Tags = tags_json_1.default;
        this.HostDomain = `https://${Domain}/`;
        this.UseId = true;
        this.SearchWithGenres = true;
        this.SearchWithNotGenres = true;
        this.SearchWithTitleAndGenre = true;
        this.requestManager = App.createRequestManager({
            requestsPerSecond: this.requestsPerSecond,
            requestTimeout: this.requestTimeout,
            interceptor: {
                interceptRequest: async (request) => {
                    request.headers = {
                        ...(request.headers ?? {}),
                        ...{
                            'referer': this.HostDomain
                        },
                        ...(await (0, NettruyenAuth_1.getSessionToken)(this.stateManager) != null ? {
                            'authorization': `Bearer ${await (0, NettruyenAuth_1.getSessionToken)(this.stateManager)}`
                        } : {})
                    };
                    return request;
                },
                interceptResponse: async (response) => {
                    return response;
                }
            }
        });
    }
    async getSourceMenu() {
        return App.createDUISection({
            id: 'sourceMenu',
            isHidden: false,
            rows: async () => {
                const [credentials] = await Promise.all([
                    (0, NettruyenAuth_1.getUserCredentials)(this.stateManager)
                ]);
                if (credentials?.email) {
                    return [
                        App.createDUILabel({
                            id: 'userInfo',
                            label: 'Logged as',
                            value: credentials.email
                        }),
                        App.createDUILabel({
                            id: 'loginTime',
                            label: 'Session started: ',
                            value: await (0, NettruyenAuth_1.getLoginTime)(this.stateManager)
                        }),
                        App.createDUIButton({
                            id: 'refresh',
                            label: 'Refresh session',
                            onTap: async () => this.refreshSession()
                        }),
                        App.createDUIButton({
                            id: 'logout',
                            label: 'Logout',
                            onTap: async () => this.logout()
                        })
                    ];
                }
                return [
                    App.createDUINavigationButton({
                        id: 'loginButton',
                        label: 'Login',
                        form: App.createDUIForm({
                            sections: async () => [
                                App.createDUISection({
                                    id: 'usernameSection',
                                    header: 'Email',
                                    footer: 'Enter your email',
                                    isHidden: false,
                                    rows: async () => [
                                        App.createDUIInputField({
                                            id: 'email',
                                            placeholder: 'Email',
                                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                            //@ts-ignore also accepts a raw value, not just a DUIBinding
                                            value: '',
                                            maskInput: false
                                        })
                                    ]
                                }),
                                App.createDUISection({
                                    id: 'passwordSection',
                                    header: 'Password',
                                    footer: 'Enter your password',
                                    isHidden: false,
                                    rows: async () => [
                                        App.createDUIInputField({
                                            id: 'password',
                                            placeholder: 'Password',
                                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                            //@ts-ignore also accepts a raw value, not just a DUIBinding
                                            value: '',
                                            maskInput: true
                                        })
                                    ]
                                })
                            ],
                            onSubmit: (values) => this.login(values)
                        })
                    })
                ];
            }
        });
    }
    async login(credentials) {
        const logPrefix = '[login]';
        console.log(`${logPrefix} starts`);
        if (!(0, NettruyenAuth_1.validateCredentials)(credentials)) {
            console.error(`${logPrefix} login called with invalid credentials: ${JSON.stringify(credentials)}`);
            throw new Error('Cần bấm vào ô input khác thì mới cập nhật giá trị!!');
        }
        try {
            const request = App.createRequest({
                method: 'POST',
                url: `${Main_1.DOMAIN}Auth/Login?email=${credentials.email}&password=${credentials.password}`
            });
            const result = await this.requestManager.schedule(request, 1);
            const json = typeof result.data === 'string' ? JSON.parse(result.data) : result.data;
            if (json.error) {
                throw new Error(json.error.message);
            }
            const sessionToken = json;
            await Promise.all([
                (0, NettruyenAuth_1.setUserCredentials)(this.stateManager, credentials),
                (0, NettruyenAuth_1.setSessionToken)(this.stateManager, sessionToken),
                (0, NettruyenAuth_1.setLoginTime)(this.stateManager)
            ]);
            console.log(`${logPrefix} complete`);
        }
        catch (e) {
            console.log(`${logPrefix} failed to log in`);
            console.log(e);
            throw new Error(e.message);
        }
    }
    async logout() {
        await Promise.all([(0, NettruyenAuth_1.clearUserCredentials)(this.stateManager), (0, NettruyenAuth_1.clearSessionToken)(this.stateManager)]);
    }
    async refreshSession() {
        const logPrefix = '[refreshSession]';
        console.log(`${logPrefix} starts`);
        const credentials = await (0, NettruyenAuth_1.getUserCredentials)(this.stateManager);
        if (!credentials) {
            console.log(`${logPrefix} no credentials available, unable to refresh`);
            throw new Error('Could not find login credentials!');
        }
        const refreshToken = await (0, NettruyenAuth_1.getSessionRefreshToken)(this.stateManager);
        if (!refreshToken) {
            console.log(`${logPrefix} no refresh token available, unable to refresh`);
            throw new Error('Could not find refresh token!');
        }
        const response = await this.requestManager.schedule(App.createRequest({
            url: `${Main_1.DOMAIN}Auth/RefreshToken?token=${refreshToken}`,
            method: 'POST'
        }), 0);
        const json = typeof response.data === 'string' ? JSON.parse(response.data) : response.data;
        if (json.error) {
            throw new Error(json.error.message);
        }
        await (0, NettruyenAuth_1.setSessionToken)(this.stateManager, json);
        await (0, NettruyenAuth_1.setLoginTime)(this.stateManager);
        console.log(`${logPrefix} complete`);
    }
    async getMangaProgress(mangaId) {
        const logPrefix = '[getMangaProgress]';
        console.log(`${logPrefix} starts`);
        try {
            console.log(`${logPrefix} loading id=${mangaId}`);
            const request = await this.requestManager.schedule(App.createRequest({
                url: `${Main_1.DOMAIN}Service/GetProcess?idComic=${mangaId}`,
                method: 'GET'
            }), 1);
            const result = typeof request.data === 'string' ? JSON.parse(request.data) : request.data;
            if (!result || result.length < 1)
                return undefined;
            const progress = App.createMangaProgress({
                mangaId: mangaId,
                lastReadChapterNumber: result[0].currentChapterNumber ?? 0
            });
            console.log(`${logPrefix} complete`);
            return progress;
        }
        catch (ex) {
            console.log(`${logPrefix} error`);
            console.log(ex);
            throw ex;
        }
    }
    async getMangaProgressManagementForm(mangaId) {
        return App.createDUIForm({
            sections: async () => {
                const [credentials, processInfo] = await Promise.all([
                    (0, NettruyenAuth_1.getUserCredentials)(this.stateManager),
                    this.getMangaProgress(mangaId)
                ]);
                const [response] = await Promise.all([
                    this.requestManager.schedule(App.createRequest({
                        url: `${Main_1.DOMAIN}AnimeMoi/Manga?host=${this.Host}&url=${mangaId}`,
                        method: 'GET'
                    }), 1)
                ]);
                const data = typeof response.data === 'string' ? JSON.parse(response.data) : response.data;
                if (credentials == null) {
                    return [
                        App.createDUISection({
                            id: 'notLoggedInSection',
                            isHidden: false,
                            rows: async () => [
                                App.createDUILabel({
                                    id: 'notLoggedIn',
                                    label: 'Not Logged In'
                                })
                            ]
                        })
                    ];
                }
                return [
                    App.createDUISection({
                        id: 'userInfo',
                        isHidden: false,
                        rows: async () => [
                            App.createDUIHeader({
                                id: 'header',
                                imageUrl: '',
                                title: credentials.email ?? 'Chưa đăng nhập',
                                subtitle: ''
                            })
                        ]
                    }),
                    App.createDUISection({
                        id: 'information',
                        header: 'Information',
                        isHidden: false,
                        rows: async () => [
                            App.createDUILabel({
                                id: 'mediaId',
                                label: 'Id',
                                value: data.id?.toString()
                            }),
                            App.createDUILabel({
                                id: 'mangaTitle',
                                label: 'Tên',
                                value: data.titles[0] ?? 'N/A'
                            }),
                            App.createDUILabel({
                                id: 'mangaProcess',
                                label: 'Đang đọc',
                                value: processInfo === undefined ? '0' : processInfo.lastReadChapterNumber.toString()
                            }),
                            App.createDUILabel({
                                id: 'mangaStatus',
                                value: data.status == 2 ? 'Đang cập nhật' : 'Xong',
                                label: 'Trạng thái'
                            }),
                            App.createDUILabel({
                                id: 'lastTimeUpdate',
                                value: new Date(data.lastTimeUpdate).toTimeString(),
                                label: 'Cập nhật'
                            })
                        ]
                    })
                ];
            }
        });
    }
    async processChapterReadActionQueue(actionQueue) {
        await this.refreshSession();
        const chapterReadActions = await actionQueue.queuedChapterReadActions();
        for (const readAction of chapterReadActions) {
            console.log(`readAction.mangaId: ${readAction.mangaId} | ${readAction.sourceChapterId}`);
            try {
                const _response = await this.requestManager.schedule(App.createRequest({
                    url: `${Main_1.DOMAIN}Service/SaveProcess?idComic=${readAction.mangaId}&idChapter=${readAction.sourceChapterId}`,
                    method: 'GET'
                }), 1);
                const data = typeof _response.data === 'string' ? JSON.parse(_response.data) : _response.data;
                if (data.message === 'Success') {
                    console.log(`Save success ${readAction.mangaId}`);
                }
            }
            catch (error) {
                console.log(error);
                console.log(`Save failed ${readAction.mangaId}`);
                await actionQueue.retryChapterReadAction(readAction);
            }
        }
    }
}
exports.Nettruyen = Nettruyen;

},{"../Main":62,"./NettruyenAuth":64,"./tags.json":65,"@paperback/types":61}],64:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setLoginTime = exports.getLoginTime = exports.clearSessionToken = exports.setSessionToken = exports.getSessionRefreshToken = exports.getSessionToken = exports.clearUserCredentials = exports.setUserCredentials = exports.getUserCredentials = exports.validateCredentials = exports.STATE_TIME_LOGIN = exports.STATE_CREDENTIALS = exports.STATE_REFRESH_SESSION = exports.STATE_SESSION = void 0;
exports.STATE_SESSION = 'token';
exports.STATE_REFRESH_SESSION = 'refresh token';
exports.STATE_CREDENTIALS = 'credentials';
exports.STATE_TIME_LOGIN = 'time';
function validateCredentials(credentials) {
    return (credentials != null &&
        typeof credentials === 'object' &&
        credentials.password !== '' &&
        credentials.email !== '');
}
exports.validateCredentials = validateCredentials;
async function getUserCredentials(stateManager) {
    const credentialsString = await stateManager.keychain.retrieve(exports.STATE_CREDENTIALS);
    if (typeof credentialsString !== 'string') {
        return undefined;
    }
    const credentials = JSON.parse(credentialsString);
    if (!validateCredentials(credentials)) {
        console.log('store contains invalid credentials!');
        return undefined;
    }
    return credentials;
}
exports.getUserCredentials = getUserCredentials;
async function setUserCredentials(stateManager, credentials) {
    if (!validateCredentials(credentials)) {
        console.log(`tried to store invalid mu_credentials: ${JSON.stringify(credentials)}`);
        throw new Error('tried to store invalid mu_credentials');
    }
    await stateManager.keychain.store(exports.STATE_CREDENTIALS, JSON.stringify(credentials));
}
exports.setUserCredentials = setUserCredentials;
async function clearUserCredentials(stateManager) {
    await stateManager.keychain.store(exports.STATE_CREDENTIALS, undefined);
}
exports.clearUserCredentials = clearUserCredentials;
async function getSessionToken(stateManager) {
    const sessionToken = await stateManager.keychain.retrieve(exports.STATE_SESSION);
    return typeof sessionToken === 'string' ? sessionToken : undefined;
}
exports.getSessionToken = getSessionToken;
async function getSessionRefreshToken(stateManager) {
    const sessionToken = await stateManager.keychain.retrieve(exports.STATE_REFRESH_SESSION);
    return typeof sessionToken === 'string' ? sessionToken : undefined;
}
exports.getSessionRefreshToken = getSessionRefreshToken;
async function setSessionToken(stateManager, sessionToken) {
    if (!sessionToken.idToken || !sessionToken.refreshToken) {
        console.log(`tried to store invalid token: ${sessionToken}`);
        throw new Error('tried to store invalid token');
    }
    await stateManager.keychain.store(exports.STATE_SESSION, sessionToken.idToken);
    await stateManager.keychain.store(exports.STATE_REFRESH_SESSION, sessionToken.refreshToken);
}
exports.setSessionToken = setSessionToken;
async function clearSessionToken(stateManager) {
    await stateManager.keychain.store(exports.STATE_SESSION, undefined);
    await stateManager.keychain.store(exports.STATE_REFRESH_SESSION, undefined);
}
exports.clearSessionToken = clearSessionToken;
async function getLoginTime(stateManager) {
    const sessionToken = await stateManager.keychain.retrieve(exports.STATE_TIME_LOGIN);
    return typeof sessionToken === 'string' ? sessionToken : undefined;
}
exports.getLoginTime = getLoginTime;
async function setLoginTime(stateManager) {
    const currentTime = new Date();
    await stateManager.keychain.store(exports.STATE_TIME_LOGIN, currentTime.toTimeString());
}
exports.setLoginTime = setLoginTime;

},{}],65:[function(require,module,exports){
module.exports=[
    {
        "Id": "1",
        "Name": "Action",
        "Description": "Thể loại này thường có nội dung về đánh nhau, bạo lực, hỗn loạn, với diễn biến nhanh"
    },
    {
        "Id": "2",
        "Name": "Adult",
        "Description": "Thể loại Adult đề cập đến vấn đề nhạy cảm, chỉ dành cho tuổi 17+"
    },
    {
        "Id": "3",
        "Name": "Adventure",
        "Description": "Thể loại phiêu lưu, mạo hiểm, thường là hành trình của các nhân vật"
    },
    {
        "Id": "4",
        "Name": "Anime",
        "Description": "Truyện đã được chuyển thể thành film Anime"
    },
    {
        "Id": "5",
        "Name": "Chuyển Sinh",
        "Description": "Thể loại này là những câu chuyện về người ở một thế giới này xuyên đến một thế giới khác, có thể là thế giới mang phong cách trung cổ với kiếm sĩ và ma thuật, hay thế giới trong game, hoặc có thể là bạn chết ở nơi này và được chuyển sinh đến nơi khác"
    },
    {
        "Id": "6",
        "Name": "Comedy",
        "Description": "Thể loại có nội dung trong sáng và cảm động, thường có các tình tiết gây cười, các xung đột nhẹ nhàng"
    },
    {
        "Id": "7",
        "Name": "Comic",
        "Description": "Truyện tranh Châu Âu và Châu Mĩ"
    },
    {
        "Id": "8",
        "Name": "Cooking",
        "Description": "Thể loại có nội dung về nấu ăn, ẩm thực"
    },
    {
        "Id": "9",
        "Name": "Cổ Đại",
        "Description": "Truyện có nội dung xảy ra ở thời cổ đại phong kiến."
    },
    {
        "Id": "10",
        "Name": "Doujinshi",
        "Description": "Thể loại truyện phóng tác do fan hay có thể cả những Mangaka khác với tác giả truyện gốc. Tác giả vẽ Doujinshi thường dựa trên những nhân vật gốc để viết ra những câu chuyện theo sở thích của mình"
    },
    {
        "Id": "11",
        "Name": "Drama",
        "Description": "Thể loại mang đến cho người xem những cảm xúc khác nhau: buồn bã, căng thẳng thậm chí là bi phẫn"
    },
    {
        "Id": "12",
        "Name": "Đam Mỹ",
        "Description": "Truyện tình cảm giữa nam và nam."
    },
    {
        "Id": "13",
        "Name": "Ecchi",
        "Description": "Thường có những tình huống nhạy cảm nhằm lôi cuốn người xem"
    },
    {
        "Id": "14",
        "Name": "Fantasy",
        "Description": "Thể loại xuất phát từ trí tưởng tượng phong phú, từ pháp thuật đến thế giới trong mơ thậm chí là những câu chuyện thần tiên"
    },
    {
        "Id": "15",
        "Name": "Gender Bender",
        "Description": "Là một thể loại trong đó giới tính của nhân vật bị lẫn lộn: nam hoá thành nữ, nữ hóa thành nam..."
    },
    {
        "Id": "16",
        "Name": "Harem",
        "Description": "Thể loại truyện tình cảm, lãng mạn mà trong đó, nhiều nhân vật nữ thích một nam nhân vật chính"
    },
    {
        "Id": "17",
        "Name": "Lịch sử",
        "Description": "Thể loại liên quan đến lịch sử"
    },
    {
        "Id": "18",
        "Name": "Horror",
        "Description": "Horror là: rùng rợn, nghe cái tên là bạn đã hiểu thể loại này có nội dung thế nào. Nó làm cho bạn kinh hãi, khiếp sợ, ghê tởm, run rẩy, có thể gây sock - một thể loại không dành cho người yếu tim"
    },
    {
        "Id": "19",
        "Name": "Josei",
        "Description": "Thể loại của manga hay anime được sáng tác chủ yếu bởi phụ nữ cho những độc giả nữ từ 18 đến 30. Josei manga có thể miêu tả những lãng mạn thực tế , nhưng trái ngược với hầu hết các kiểu lãng mạn lí tưởng của Shoujo manga với cốt truyện rõ ràng, chín chắn"
    },
    {
        "Id": "20",
        "Name": "Live action",
        "Description": "Truyện đã được chuyển thể thành phim"
    },
    {
        "Id": "21",
        "Name": "Manga",
        "Description": "Truyện tranh của Nhật Bản"
    },
    {
        "Id": "22",
        "Name": "Manhua",
        "Description": "Truyện tranh của Trung Quốc"
    },
    {
        "Id": "23",
        "Name": "Manhwa",
        "Description": "Truyện tranh Hàn Quốc, đọc từ trái sang phải"
    },
    {
        "Id": "24",
        "Name": "Martial Arts",
        "Description": "Giống với tên gọi, bất cứ gì liên quan đến võ thuật trong truyện từ các trận đánh nhau, tự vệ đến các môn võ thuật như akido, karate, judo hay taekwondo, kendo, các cách né tránh"
    },
    {
        "Id": "25",
        "Name": "Mature",
        "Description": "Thể loại dành cho lứa tuổi 17+ bao gồm các pha bạo lực, máu me, chém giết, tình dục ở mức độ vừa"
    },
    {
        "Id": "26",
        "Name": "Mecha",
        "Description": "Mecha, còn được biết đến dưới cái tên meka hay mechs, là thể loại nói tới những cỗ máy biết đi (thường là do phi công cầm lái)"
    },
    {
        "Id": "27",
        "Name": "Mystery",
        "Description": "Thể loại thường xuất hiện những điều bí ấn không thể lí giải được và sau đó là những nỗ lực của nhân vật chính nhằm tìm ra câu trả lời thỏa đáng"
    },
    {
        "Id": "28",
        "Name": "Ngôn Tình",
        "Description": "Truyện thuộc kiểu lãng mạn, kể về những sự kiện vui buồn trong tình yêu của nhân vật chính."
    },
    {
        "Id": "29",
        "Name": "One shot",
        "Description": "Những truyện ngắn, thường là 1 chapter"
    },
    {
        "Id": "30",
        "Name": "Psychological",
        "Description": "Thể loại liên quan đến những vấn đề về tâm lý của nhân vật ( tâm thần bất ổn, điên cuồng ...)"
    },
    {
        "Id": "31",
        "Name": "Romance",
        "Description": "Thường là những câu chuyện về tình yêu, tình cảm lãng mạn. Ớ đây chúng ta sẽ lấy ví dụ như tình yêu giữa một người con trai và con gái, bên cạnh đó đặc điểm thể loại này là kích thích trí tưởng tượng của bạn về tình yêu"
    },
    {
        "Id": "32",
        "Name": "School Life",
        "Description": "Trong thể loại này, ngữ cảnh diễn biến câu chuyện chủ yếu ở trường học"
    },
    {
        "Id": "33",
        "Name": "Sci-fi",
        "Description": "Bao gồm những chuyện khoa học viễn tưởng, đa phần chúng xoay quanh nhiều hiện tượng mà liên quan tới khoa học, công nghệ, tuy vậy thường thì những câu chuyện đó không gắn bó chặt chẽ với các thành tựu khoa học hiện thời, mà là do con người tưởng tượng ra"
    },
    {
        "Id": "34",
        "Name": "Seinen",
        "Description": "Thể loại của manga thường nhằm vào những đối tượng nam 18 đến 30 tuổi, nhưng người xem có thể lớn tuổi hơn, với một vài bộ truyện nhắm đến các doanh nhân nam quá 40. Thể loại này có nhiều phong cách riêng biệt , nhưng thể loại này có những nét riêng biệt, thường được phân vào những phong cách nghệ thuật rộng hơn và phong phú hơn về chủ đề, có các loại từ mới mẻ tiên tiến đến khiêu dâm"
    },
    {
        "Id": "35",
        "Name": "Shoujo",
        "Description": "Đối tượng hướng tới của thể loại này là phái nữ. Nội dung của những bộ manga này thường liên quan đến tình cảm lãng mạn, chú trọng đầu tư cho nhân vật (tính cách,...)"
    },
    {
        "Id": "36",
        "Name": "Shoujo Ai",
        "Description": "Thể loại quan hệ hoặc liên quan tới đồng tính nữ, thể hiện trong các mối quan hệ trên mức bình thường giữa các nhân vật nữ trong các manga, anime"
    },
    {
        "Id": "37",
        "Name": "Shounen",
        "Description": "Đối tượng hướng tới của thể loại này là phái nam. Nội dung của những bộ manga này thường liên quan đến đánh nhau và/hoặc bạo lực (ở mức bình thường, không thái quá)"
    },
    {
        "Id": "38",
        "Name": "Shounen Ai",
        "Description": "Thể loại có nội dung về tình yêu giữa những chàng trai trẻ, mang tính chất lãng mạn nhưng ko đề cập đến quan hệ tình dục"
    },
    {
        "Id": "39",
        "Name": "Slice of Life",
        "Description": "Nói về cuộc sống đời thường"
    },
    {
        "Id": "40",
        "Name": "Smut",
        "Description": "Những truyện có nội dung hơi nhạy cảm, đặc biệt là liên quan đến tình dục"
    },
    {
        "Id": "41",
        "Name": "Soft Yaoi",
        "Description": "Boy x Boy. Nặng hơn Shounen Ai tí."
    },
    {
        "Id": "42",
        "Name": "Soft Yuri",
        "Description": "Girl x Girl. Nặng hơn Shoujo Ai tí"
    },
    {
        "Id": "43",
        "Name": "Sports",
        "Description": "Đúng như tên gọi, những môn thể thao như bóng đá, bóng chày, bóng chuyền, đua xe, cầu lông,... là một phần của thể loại này"
    },
    {
        "Id": "44",
        "Name": "Supernatural",
        "Description": "Thể hiện những sức mạnh đáng kinh ngạc và không thể giải thích được, chúng thường đi kèm với những sự kiện trái ngược hoặc thách thức với những định luật vật lý"
    },
    {
        "Id": "45",
        "Name": "Tạp chí truyện tranh",
        "Description": "Tạp chí online về manga anime v.v.."
    },
    {
        "Id": "46",
        "Name": "Thiếu Nhi",
        "Description": "Truyện tranh dành cho lứa tuổi thiếu nhi"
    },
    {
        "Id": "47",
        "Name": "Tragedy",
        "Description": "Thể loại chứa đựng những sự kiện mà dẫn đến kết cục là những mất mát hay sự rủi ro to lớn"
    },
    {
        "Id": "48",
        "Name": "Trinh Thám",
        "Description": "Các truyện có nội dung về các vụ án, các thám tử cảnh sát điều tra..."
    },
    {
        "Id": "49",
        "Name": "Truyện Màu",
        "Description": "Tổng hợp truyện tranh màu, rõ, đẹp"
    },
    {
        "Id": "50",
        "Name": "Truyện scan",
        "Description": "Các truyện đã phát hành tại VN được scan đăng online"
    },
    {
        "Id": "51",
        "Name": "Việt Nam",
        "Description": "Truyện tranh Việt Nam"
    },
    {
        "Id": "52",
        "Name": "Webtoon",
        "Description": "Là truyện tranh được đăng dài kỳ trên internet của Hàn Quốc chứ không xuất bản theo cách thông thường"
    },
    {
        "Id": "53",
        "Name": "Xuyên Không",
        "Description": "Xuyên Không, Xuyên Việt là thể loại nhân vật chính vì một lý do nào đó mà bị đưa đến sinh sống ở một không gian hay một khoảng thời gian khác. Nhân vật chính có thể trực tiếp xuyên qua bằng thân xác mình hoặc sống lại bằng thân xác người khác."
    },
    {
        "Id": "54",
        "Name": "Yaoi",
        "Description": "Truyện tranh đồng tính nam có nói về quan hệ thể xác, chia 2 cấp Soft Yaoi và Hard Yaoi (Nhẹ và Nặng)"
    },
    {
        "Id": "55",
        "Name": "Yuri",
        "Description": "Truyện tranh đồng tính nữ có nói về quan hệ thể xác, cũng có 2 cấp Soft Yuri và Hard Yuri"
    },
    {
        "Id": "56",
        "Name": "16+",
        "Description": "Là thể loại có nhiều cảnh nóng, đề cập đến các vấn đề nhạy cảm giới tính hay các cảnh bạo lực máu me .... Nói chung là truyện có tác động xấu đến tâm sinh lý của những độc giả chưa đủ 16 tuổi"
    }
]

},{}],66:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertTime = void 0;
function convertTime(time) {
    if (time === '')
        return new Date();
    let date;
    // 2023-08-12T00:00:00
    if (time.includes('T') && time.includes('-')) {
        date = new Date(time);
        return date;
    }
    // 29/12/22
    if (time.split('/').length == 3) {
        date = time.split('/');
        date[2] = '20' + date[2];
        return new Date(Number.parseInt(date[2]), Number.parseInt(date[1]) - 1, Number.parseInt(date[0]));
    }
    // 11:44 05/02
    if (time.includes(':')) {
        date = new Date();
        const temp = time.split(' ');
        date.setHours(Number.parseInt(temp[0].split(':')[0]));
        date.setMinutes(Number.parseInt(temp[0].split(':')[1]));
        date.setDate(Number.parseInt(temp[1].split('/')[0]));
        date.setMonth(Number.parseInt(temp[1].split('/')[1]) - 1);
        return date;
    }
    // something "* trước"
    if (time.includes('trước')) {
        const T = Number.parseInt(time.split(' ')[0]);
        date = new Date();
        if (time.includes('giây')) {
            date.setSeconds(date.getSeconds() - T);
            return date;
        }
        if (time.includes('phút')) {
            date.setMinutes(date.getMinutes() - T);
            return date;
        }
        if (time.includes('giờ')) {
            date.setHours(date.getHours() - T);
            return date;
        }
        if (time.includes('ngày')) {
            date.setDate(date.getDate() - T);
            return date;
        }
        if (time.includes('tháng')) {
            date.setMonth(date.getMonth() - T);
            return date;
        }
        if (time.includes('năm')) {
            date.setFullYear(date.getFullYear() - T);
            return date;
        }
    }
    return new Date();
}
exports.convertTime = convertTime;

},{}]},{},[63])(63)
});
