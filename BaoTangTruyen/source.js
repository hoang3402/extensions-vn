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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaoTangTruyen = exports.BaoTangTruyenInfo = void 0;
const types_1 = require("@paperback/types");
const Main_1 = require("../Main");
const HOST = 'BaoTangTruyen';
const tags_json_1 = __importDefault(require("./tags.json"));
exports.BaoTangTruyenInfo = {
    description: '',
    icon: 'icon.png',
    websiteBaseURL: '',
    version: (0, Main_1.getExportVersion)('0.0.4'),
    name: 'BaoTangTruyen',
    language: 'vi',
    author: 'Hoang3409',
    contentRating: types_1.ContentRating.EVERYONE,
    sourceTags: [
        {
            text: '16+',
            type: types_1.BadgeColor.GREEN
        }
    ],
    intents: types_1.SourceIntents.HOMEPAGE_SECTIONS | types_1.SourceIntents.MANGA_CHAPTERS
};
class BaoTangTruyen extends Main_1.Main {
    constructor() {
        super(...arguments);
        this.Host = HOST;
        this.Tags = tags_json_1.default;
        this.UseId = true;
        this.SearchWithGenres = false;
        this.SearchWithNotGenres = false;
        this.SearchWithTitleAndGenre = false;
        this.HostDomain = 'https://baotangtruyen4.com/';
    }
}
exports.BaoTangTruyen = BaoTangTruyen;

},{"../Main":64,"./tags.json":63,"@paperback/types":61}],63:[function(require,module,exports){
module.exports=[
    {
        "Id": 0,
        "Name": "Tất cả",
        "Description": ""
    },
    {
        "Id": 1,
        "Name": "Action",
        "Description": "action"
    },
    {
        "Id": 2,
        "Name": "Anime",
        "Description": "anime"
    },
    {
        "Id": 3,
        "Name": "Mecha",
        "Description": "mecha"
    },
    {
        "Id": 4,
        "Name": "Sci-fi",
        "Description": "scifi"
    },
    {
        "Id": 5,
        "Name": "Shounen",
        "Description": "shounen"
    },
    {
        "Id": 6,
        "Name": "Cổ Đại",
        "Description": "co-dai"
    },
    {
        "Id": 7,
        "Name": "Comedy",
        "Description": "comedy"
    },
    {
        "Id": 8,
        "Name": "Manhua",
        "Description": "manhua"
    },
    {
        "Id": 9,
        "Name": "Ngôn Tình",
        "Description": "ngon-tinh"
    },
    {
        "Id": 10,
        "Name": "Romance",
        "Description": "romance"
    },
    {
        "Id": 11,
        "Name": "Truyện Màu",
        "Description": "truyen-mau"
    },
    {
        "Id": 12,
        "Name": "Drama",
        "Description": "drama"
    },
    {
        "Id": 13,
        "Name": "School Life",
        "Description": "school-life"
    },
    {
        "Id": 14,
        "Name": "Seinen",
        "Description": "seinen"
    },
    {
        "Id": 15,
        "Name": "Manhwa",
        "Description": "manhwa"
    },
    {
        "Id": 16,
        "Name": "Comic",
        "Description": "comic"
    },
    {
        "Id": 17,
        "Name": "Chuyển Sinh",
        "Description": "chuyen-sinh"
    },
    {
        "Id": 18,
        "Name": "Fantasy",
        "Description": "fantasy"
    },
    {
        "Id": 19,
        "Name": "Supernatural",
        "Description": "supernatural"
    },
    {
        "Id": 20,
        "Name": "Webtoon",
        "Description": "webtoon"
    },
    {
        "Id": 21,
        "Name": "Xuyên Không",
        "Description": "xuyen-khong"
    },
    {
        "Id": 22,
        "Name": "Shoujo",
        "Description": "shoujo"
    },
    {
        "Id": 23,
        "Name": "Sports",
        "Description": "sports"
    },
    {
        "Id": 24,
        "Name": "Manga",
        "Description": "manga"
    },
    {
        "Id": 25,
        "Name": "Smut",
        "Description": "smut"
    },
    {
        "Id": 26,
        "Name": "Historical",
        "Description": "historical"
    },
    {
        "Id": 27,
        "Name": "Adventure",
        "Description": "adventure"
    },
    {
        "Id": 28,
        "Name": "Slice of Life",
        "Description": "slice-of-life"
    },
    {
        "Id": 29,
        "Name": "Tragedy",
        "Description": "tragedy"
    },
    {
        "Id": 30,
        "Name": "Mystery",
        "Description": "mystery"
    },
    {
        "Id": 31,
        "Name": "Horror",
        "Description": "horror"
    },
    {
        "Id": 32,
        "Name": "Martial Arts",
        "Description": "martial-arts"
    },
    {
        "Id": 33,
        "Name": "Shoujo Ai",
        "Description": "shoujo-ai"
    },
    {
        "Id": 34,
        "Name": "Việt Nam",
        "Description": "viet-nam"
    },
    {
        "Id": 35,
        "Name": "Đam Mỹ",
        "Description": "dam-my"
    },
    {
        "Id": 36,
        "Name": "Shounen Ai",
        "Description": "shounen-ai"
    },
    {
        "Id": 37,
        "Name": "Soft Yuri",
        "Description": "soft-yuri"
    },
    {
        "Id": 38,
        "Name": "Yuri",
        "Description": "yuri"
    },
    {
        "Id": 39,
        "Name": "Gender Bender",
        "Description": "gender-bender"
    },
    {
        "Id": 40,
        "Name": "Yaoi",
        "Description": "yaoi"
    },
    {
        "Id": 41,
        "Name": "Psychological",
        "Description": "psychological"
    },
    {
        "Id": 42,
        "Name": "Doujinshi",
        "Description": "doujinshi"
    },
    {
        "Id": 43,
        "Name": "Soft Yaoi",
        "Description": "soft-yaoi"
    },
    {
        "Id": 44,
        "Name": "Josei",
        "Description": "josei"
    },
    {
        "Id": 45,
        "Name": "Thiếu Nhi",
        "Description": "thieu-nhi"
    },
    {
        "Id": 46,
        "Name": "Truyện scan",
        "Description": "truyen-scan"
    },
    {
        "Id": 47,
        "Name": "Cooking",
        "Description": "cooking"
    },
    {
        "Id": 48,
        "Name": "Trinh Thám",
        "Description": "trinh-tham"
    },
    {
        "Id": 49,
        "Name": "Tất cả"
    },
    {
        "Id": 50,
        "Name": "Action",
        "Description": "action"
    },
    {
        "Id": 51,
        "Name": "Anime",
        "Description": "anime"
    },
    {
        "Id": 52,
        "Name": "Mecha",
        "Description": "mecha"
    },
    {
        "Id": 53,
        "Name": "Sci-fi",
        "Description": "scifi"
    },
    {
        "Id": 54,
        "Name": "Shounen",
        "Description": "shounen"
    },
    {
        "Id": 55,
        "Name": "Cổ Đại",
        "Description": "co-dai"
    },
    {
        "Id": 56,
        "Name": "Comedy",
        "Description": "comedy"
    },
    {
        "Id": 57,
        "Name": "Manhua",
        "Description": "manhua"
    },
    {
        "Id": 58,
        "Name": "Ngôn Tình",
        "Description": "ngon-tinh"
    },
    {
        "Id": 59,
        "Name": "Romance",
        "Description": "romance"
    },
    {
        "Id": 60,
        "Name": "Truyện Màu",
        "Description": "truyen-mau"
    },
    {
        "Id": 61,
        "Name": "Drama",
        "Description": "drama"
    },
    {
        "Id": 62,
        "Name": "School Life",
        "Description": "school-life"
    },
    {
        "Id": 63,
        "Name": "Seinen",
        "Description": "seinen"
    },
    {
        "Id": 64,
        "Name": "Manhwa",
        "Description": "manhwa"
    },
    {
        "Id": 65,
        "Name": "Comic",
        "Description": "comic"
    },
    {
        "Id": 66,
        "Name": "Chuyển Sinh",
        "Description": "chuyen-sinh"
    },
    {
        "Id": 67,
        "Name": "Fantasy",
        "Description": "fantasy"
    },
    {
        "Id": 68,
        "Name": "Supernatural",
        "Description": "supernatural"
    },
    {
        "Id": 69,
        "Name": "Webtoon",
        "Description": "webtoon"
    },
    {
        "Id": 70,
        "Name": "Xuyên Không",
        "Description": "xuyen-khong"
    },
    {
        "Id": 71,
        "Name": "Shoujo",
        "Description": "shoujo"
    },
    {
        "Id": 72,
        "Name": "Sports",
        "Description": "sports"
    },
    {
        "Id": 73,
        "Name": "Manga",
        "Description": "manga"
    },
    {
        "Id": 74,
        "Name": "Smut",
        "Description": "smut"
    },
    {
        "Id": 75,
        "Name": "Historical",
        "Description": "historical"
    },
    {
        "Id": 76,
        "Name": "Adventure",
        "Description": "adventure"
    },
    {
        "Id": 77,
        "Name": "Slice of Life",
        "Description": "slice-of-life"
    },
    {
        "Id": 78,
        "Name": "Tragedy",
        "Description": "tragedy"
    },
    {
        "Id": 79,
        "Name": "Mystery",
        "Description": "mystery"
    },
    {
        "Id": 80,
        "Name": "Horror",
        "Description": "horror"
    },
    {
        "Id": 81,
        "Name": "Martial Arts",
        "Description": "martial-arts"
    },
    {
        "Id": 82,
        "Name": "Shoujo Ai",
        "Description": "shoujo-ai"
    },
    {
        "Id": 83,
        "Name": "Việt Nam",
        "Description": "viet-nam"
    },
    {
        "Id": 84,
        "Name": "Đam Mỹ",
        "Description": "dam-my"
    },
    {
        "Id": 85,
        "Name": "Shounen Ai",
        "Description": "shounen-ai"
    },
    {
        "Id": 86,
        "Name": "Soft Yuri",
        "Description": "soft-yuri"
    },
    {
        "Id": 87,
        "Name": "Yuri",
        "Description": "yuri"
    },
    {
        "Id": 88,
        "Name": "Gender Bender",
        "Description": "gender-bender"
    },
    {
        "Id": 89,
        "Name": "Yaoi",
        "Description": "yaoi"
    },
    {
        "Id": 90,
        "Name": "Psychological",
        "Description": "psychological"
    },
    {
        "Id": 91,
        "Name": "Doujinshi",
        "Description": "doujinshi"
    },
    {
        "Id": 92,
        "Name": "Soft Yaoi",
        "Description": "soft-yaoi"
    },
    {
        "Id": 93,
        "Name": "Josei",
        "Description": "josei"
    },
    {
        "Id": 94,
        "Name": "Thiếu Nhi",
        "Description": "thieu-nhi"
    },
    {
        "Id": 95,
        "Name": "Truyện scan",
        "Description": "truyen-scan"
    },
    {
        "Id": 96,
        "Name": "Cooking",
        "Description": "cooking"
    },
    {
        "Id": 97,
        "Name": "Trinh Thám",
        "Description": "trinh-tham"
    }
]

},{}],64:[function(require,module,exports){
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

},{"./utils/time":65}],65:[function(require,module,exports){
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

},{}]},{},[62])(62)
});
