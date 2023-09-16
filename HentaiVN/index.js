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
exports.HentaiVN = exports.HentaiVNInfo = void 0;
const types_1 = require("@paperback/types");
const Main_1 = require("../Main");
const HOST = 'HentaiVN';
const tags_json_1 = __importDefault(require("./tags.json"));
exports.HentaiVNInfo = {
    description: '',
    icon: 'icon.png',
    websiteBaseURL: '',
    version: (0, Main_1.getExportVersion)('0.0.4'),
    name: 'HentaiVN',
    language: 'vi',
    author: 'Hoang3409',
    contentRating: types_1.ContentRating.ADULT,
    sourceTags: [
        {
            text: '18+',
            type: types_1.BadgeColor.RED
        }
    ],
    intents: types_1.SourceIntents.HOMEPAGE_SECTIONS | types_1.SourceIntents.MANGA_CHAPTERS
};
const Domain = 'hentaivn.tv';
class HentaiVN extends Main_1.Main {
    constructor() {
        super(...arguments);
        this.Host = HOST;
        this.Tags = tags_json_1.default;
        this.HostDomain = `https://${Domain}.tv/`;
        this.UseId = true;
        this.SearchWithGenres = true;
        this.SearchWithNotGenres = false;
        this.SearchWithTitleAndGenre = true;
    }
    async getChapterDetails(mangaId, chapterId) {
        const data = await super.getChapterDetails(mangaId, chapterId);
        for (let img in data) {
            img = img.replace('hhentai.net', Domain);
        }
        return data;
    }
}
exports.HentaiVN = HentaiVN;

},{"../Main":64,"./tags.json":63,"@paperback/types":61}],63:[function(require,module,exports){
module.exports=[
    {
        "Id": "57",
        "Name": "3D Hentai",
        "Description": "Sống động như người thật"
    },
    {
        "Id": "58",
        "Name": "Action",
        "Description": "Thể loại này thường có nội dung về đánh nhau, bạo lực, hỗn loạn, với diễn biến nhanh."
    },
    {
        "Id": "59",
        "Name": "Adult",
        "Description": "Thể loại này thường bị che đi phần dưới một cách hoàn toàn, dù vẫn có hoạt động tình dục. Các cảnh tình dục cũng ít chi tiết khi so với những bộ Hentai thuần. Lí do là bởi để nó trở nên phổ biến rộng rãi hơn, thì việc che đi hoàn toàn là có lí do."
    },
    {
        "Id": "60",
        "Name": "Adventure",
        "Description": "Phiêu lưu mạo hiểm."
    },
    {
        "Id": "61",
        "Name": "Ahegao",
        "Description": "Gương mặt thể hiện lúc lên đỉnh; Hoặc thể hiện những gương mặt khả ố biển hiện là người dâm dục."
    },
    {
        "Id": "62",
        "Name": "Anal",
        "Description": "Làm tình ở lỗ hậu, kế bên âm đạo là chính là hậu môn."
    },
    {
        "Id": "63",
        "Name": "Angel",
        "Description": "Thiên Thần. Chủ yếu mô tả về các thiên thần có năng lực siêu nhiên."
    },
    {
        "Id": "64",
        "Name": "Ảnh động",
        "Description": "Ảnh động"
    },
    {
        "Id": "65",
        "Name": "Animal",
        "Description": "Động vật."
    },
    {
        "Id": "66",
        "Name": "Animal girl",
        "Description": "Gái thú"
    },
    {
        "Id": "67",
        "Name": "Áo Dài",
        "Description": "Áo dài truyền thống Việt Nam!!!"
    },
    {
        "Id": "68",
        "Name": "Apron",
        "Description": "Đề cập đến Tạp dề/Tạp đề mà khi nấu ăn người ta sẽ mang trước ngực. Điểm thú vị trong Hentai hầu hết các nhân vật nữ sẽ khỏa thân hoàn toàn và chỉ mặc mỗi tạp dề."
    },
    {
        "Id": "69",
        "Name": "Artist CG",
        "Description": "Tranh vẽ, hình vẽ có hoặc không có nội dung. Lưu ý truyện Artist CG không có lời thoại là bị cấm đăng!"
    },
    {
        "Id": "70",
        "Name": "Based Game",
        "Description": "Truyện được nhại lại từ game (Doujinshi)."
    },
    {
        "Id": "71",
        "Name": "BBM",
        "Description": "Mô tả một gã đàn ông béo."
    },
    {
        "Id": "72",
        "Name": "BBW",
        "Description": "Mô tả một người phụ nữ béo xinh đẹp."
    },
    {
        "Id": "73",
        "Name": "BDSM",
        "Description": "Thể loại bao gồm việc sử dụng những dụng cụ kích thích có tính tra tấn và có thể gồm những nhân vật bạo dâm"
    },
    {
        "Id": "74",
        "Name": "Bestiality",
        "Description": "Làm Tình Với Thú vật và Côn trùng."
    },
    {
        "Id": "75",
        "Name": "Big Ass",
        "Description": "Mông to."
    },
    {
        "Id": "76",
        "Name": "Big Boobs",
        "Description": "Miêu tả những nhân vật nữ với ngực lớn hơn bình thường"
    },
    {
        "Id": "77",
        "Name": "Big Penis",
        "Description": "Dương vật lớn."
    },
    {
        "Id": "78",
        "Name": "Blackmail",
        "Description": "Đe dọa, tống tiền, tống tình... đủ thứ trên đời để ép buộc nhân vật nữ phải quan hệ với mình."
    },
    {
        "Id": "79",
        "Name": "Bloomers",
        "Description": "Một loại đồng phục thể dục cực kì đặc biệt chỉ có ở Nhật Bản."
    },
    {
        "Id": "80",
        "Name": "BlowJobs",
        "Description": "Mút dương vật (Thổi kèn) bằng miệng."
    },
    {
        "Id": "81",
        "Name": "Body Swap",
        "Description": "Chuyển đổi cơ thể, thân xác."
    },
    {
        "Id": "82",
        "Name": "Bodysuit",
        "Description": "Bodysuit nguyên là những mẫu trang phục lót liền quần ôm sát vô cùng quyến rũ bởi chúng đã góp phần làm tôn vinh những đường cong của cơ thể người phụ nữ."
    },
    {
        "Id": "83",
        "Name": "Bondage",
        "Description": "Là một nhánh của BDSM, mô tả nhân vật bị trói buộc một cách khiêu gợi, hành hạ bạo dâm dạng trói."
    },
    {
        "Id": "84",
        "Name": "Breast Sucking",
        "Description": "Mút vếu."
    },
    {
        "Id": "85",
        "Name": "BreastJobs",
        "Description": "Dùng ngực để chà xát dương vật, để làm cho dương vật kích thích."
    },
    {
        "Id": "86",
        "Name": "Brocon",
        "Description": "Thích anh trai/em trai."
    },
    {
        "Id": "87",
        "Name": "Brother",
        "Description": "Anh trai. Cùng hoặc không cùng huyết thống."
    },
    {
        "Id": "88",
        "Name": "Business Suit",
        "Description": "Đồng phục nơi công sở của nữ."
    },
    {
        "Id": "89",
        "Name": "Catgirls",
        "Description": "Nhân vật lai giữa người và mèo: cô gái có thể có tai và đuôi mèo. Hoặc ám chỉ nhân vật nữ có gắn phụ kiện của mèo (móng vuốt, râu…)."
    },
    {
        "Id": "90",
        "Name": "Che ít",
        "Description": "Thể loại này Che ít các bộ phận nhạy cảm."
    },
    {
        "Id": "91",
        "Name": "Che nhiều",
        "Description": "Thể loại này Che nhiều các bộ phận nhạy cảm."
    },
    {
        "Id": "92",
        "Name": "Cheating",
        "Description": "Bị đe dọa tống tình, ngoại tình."
    },
    {
        "Id": "93",
        "Name": "Chikan",
        "Description": "Quấy rối tình dục nơi công cộng, chủ yếu xảy ra ở tàu điện ngầm."
    },
    {
        "Id": "94",
        "Name": "Chinese Dress",
        "Description": "Là trang phục Xường xám hay áo dài Thượng Hải, một loại trang phục truyền thống rất phổ biến tại Trung Quốc."
    },
    {
        "Id": "95",
        "Name": "Có che",
        "Description": "Thể loại này Có che các bộ phận nhạy cảm."
    },
    {
        "Id": "96",
        "Name": "Comedy",
        "Description": "Thường có các tình tiết gây cười, hài hước, các xung đột nhẹ nhàng."
    },
    {
        "Id": "97",
        "Name": "Comic",
        "Description": "Nét vẽ theo phong cách Comic của châu âu."
    },
    {
        "Id": "98",
        "Name": "Condom",
        "Description": "Bao cao su. Một thứ dùng để quan hệ tình dục trở nên an toàn hơn, tránh các bệnh cũng như tránh thai."
    },
    {
        "Id": "99",
        "Name": "Cosplay",
        "Description": "Nhân vật sẽ Cosplay."
    },
    {
        "Id": "100",
        "Name": "Cousin",
        "Description": "Anh/Chị/Em họ."
    },
    {
        "Id": "101",
        "Name": "Crotch Tattoo",
        "Description": "Được hiểu đơn giản là Hình xăm giữa háng. Một loại hình xăm thường thấy ở những con Quỷ và Vampire,.. Nhằm tạo sự kích thích khi nhìn vào."
    },
    {
        "Id": "102",
        "Name": "Cunnilingus",
        "Description": "Hành động chạm vào cơ quan sinh dục nữ bằng lưỡi và môi để tạo ra cảm giác thỏa mãn. Hay còn gọi là liếm/bú/mút âm đạo, vét máng."
    },
    {
        "Id": "103",
        "Name": "Dark Skin",
        "Description": "Da đen hoặc da rám nắng."
    },
    {
        "Id": "104",
        "Name": "Daughter",
        "Description": "Con gái trong gia đình. Là con riêng hoặc cùng huyết thống với người cha."
    },
    {
        "Id": "105",
        "Name": "Deepthroat",
        "Description": "Đút dương vật lút cán vào sâu trong miệng, đến tận cuống họng."
    },
    {
        "Id": "106",
        "Name": "Demon",
        "Description": "Chúa quỷ."
    },
    {
        "Id": "107",
        "Name": "DemonGirl",
        "Description": "Chúa quỷ là nhân vật nữ."
    },
    {
        "Id": "108",
        "Name": "Devil",
        "Description": "Quỷ nam."
    },
    {
        "Id": "109",
        "Name": "DevilGirl",
        "Description": "Gái quỷ. Trong đó có những nữ quỷ thông thường hoặc Succubus (Quỷ mộng tinh)."
    },
    {
        "Id": "110",
        "Name": "Dirty",
        "Description": "Bẩn bựa, nhìn vào họ thôi đã thấy kinh tởm rồi."
    },
    {
        "Id": "111",
        "Name": "Dirty Old Man",
        "Description": "Già bẩn bựa. Thể loại này ý chỉ những lão già đã xấu còn đóng vai ác, những hành động của các lão cũng đã nói lên điều đó trong thể loại này."
    },
    {
        "Id": "112",
        "Name": "DogGirl",
        "Description": "Mô tả cô gái mang đặc tính của một con chó."
    },
    {
        "Id": "113",
        "Name": "Double Penetration",
        "Description": "Hành vi tình dục trong đó cả hai thứ là âm đạo và hậu môn có thể bị chèn cùng một lúc."
    },
    {
        "Id": "114",
        "Name": "Doujinshi",
        "Description": "Thể loại truyện phóng tác do fan vẽ, hoàn toàn không liên quan với truyện gốc. Tác giả vẽ Doujinshi thường dựa trên những nhân vật gốc để viết ra những câu chuyện nhại lại theo sở thích của mình."
    },
    {
        "Id": "115",
        "Name": "Drama",
        "Description": "Mang đến cho người xem những cảm xúc khác nhau: buồn bã, căng thẳng thậm chí là bi phẫn."
    },
    {
        "Id": "116",
        "Name": "Drug",
        "Description": "Thuốc uống. Ví dụ như thuốc ngủ, thuốc mê..."
    },
    {
        "Id": "117",
        "Name": "Ecchi",
        "Description": "Thường có những tình huống nhạy cảm nhằm lôi cuốn người xem."
    },
    {
        "Id": "118",
        "Name": "Elder Sister",
        "Description": "Là chị gái, có hoặc không có cùng huyết thống."
    },
    {
        "Id": "119",
        "Name": "Elf",
        "Description": "Yêu tinh."
    },
    {
        "Id": "120",
        "Name": "Exhibitionism",
        "Description": "Lộ bộ phận nhạy cảm trước mặt người khác. Thường là do bị nhìn lén, rình trộm."
    },
    {
        "Id": "121",
        "Name": "Fantasy",
        "Description": "Thể loại xuất phát từ trí tưởng tượng phong phú, từ pháp thuật đến thế giới trong mơ thậm chí là những câu chuyện thần tiên."
    },
    {
        "Id": "122",
        "Name": "Father",
        "Description": "Người cha. Là cha ruột hoặc chỉ là cha dượng (Cùng mẹ khác cha)."
    },
    {
        "Id": "123",
        "Name": "Femdom",
        "Description": "Nhân vật nữ làm chủ đạo, thống trị trong khi làm tình."
    },
    {
        "Id": "124",
        "Name": "Fingering",
        "Description": "Việc chèn hoặc cọ xát ngón tay vào âm đạo hoặc hậu môn gây ra kích thích."
    },
    {
        "Id": "125",
        "Name": "Footjob",
        "Description": "Cô gái sóc hàng của người nam bằng chân."
    },
    {
        "Id": "126",
        "Name": "Foxgirls",
        "Description": "Mô tả cô gái mang đặc tính của một con cáo."
    },
    {
        "Id": "127",
        "Name": "Full Color",
        "Description": "Truyện full màu."
    },
    {
        "Id": "128",
        "Name": "Furry",
        "Description": "Những sinh vật giống người nhưng mang những nhân cách, đặc điểm và hình dáng của thú vật."
    },
    {
        "Id": "129",
        "Name": "Futanari",
        "Description": "Miêu tả những nhân vật nữ mang bộ phận sinh dục nam."
    },
    {
        "Id": "130",
        "Name": "GangBang",
        "Description": "Nhiều nam hãm hiếp một nữ (3 nam trở lên)."
    },
    {
        "Id": "131",
        "Name": "Garter Belts",
        "Description": "Garter belt hay còn gọi là dây thun bó chân, là món phụ kiện khá quen thuộc với mọi cô nàng. Garter belt có tác dụng gắn kết giữa quần trong và phần tất chân, giúp tất chân không bị tuột."
    },
    {
        "Id": "132",
        "Name": "Gender Bender",
        "Description": "Là một thể loại trong đó giới tính của nhân vật bị lẫn lộn: nam hoá thành nữ, nữ hóa thành nam..."
    },
    {
        "Id": "133",
        "Name": "Ghost",
        "Description": "Ma."
    },
    {
        "Id": "134",
        "Name": "Glasses",
        "Description": "Mắt kính."
    },
    {
        "Id": "135",
        "Name": "Gothic Lolita",
        "Description": "Còn được gọi là GothLoli, một loại trang phục bắt nguồn từ Nhật Bản, nhưng dựa trên thời Victoria và Edward, phổ biến rộng rãi ở Nhật và hiện đã có mặt ở khắp nơi trên thế giới."
    },
    {
        "Id": "136",
        "Name": "Group",
        "Description": "Làm tình theo nhóm, bao gồm nhiều nữ với một nam, hoặc đôi khi là nhiều cặp làm tình chung một địa điểm. Đôi khi là nhiều nam với một nữ."
    },
    {
        "Id": "137",
        "Name": "Guro",
        "Description": "Có những hình ảnh mang tính ghê rợn và bạo lực cao liên quan đến tình dục. Như mổ xẻ xác chết rồi làm tình với nó, thông não, vv..."
    },
    {
        "Id": "138",
        "Name": "Hairy",
        "Description": "Âm đạo của nhân vật nữ có nhiều lông."
    },
    {
        "Id": "139",
        "Name": "Handjob",
        "Description": "Các hành vi sử dụng một tay để kích thích dương vật của người khác."
    },
    {
        "Id": "140",
        "Name": "Harem",
        "Description": "Nhiều nhân vật nữ thích một nam chính. Thường là 2 người trở lên (Với điều kiện không phải tình tay ba)."
    },
    {
        "Id": "141",
        "Name": "HentaiVN",
        "Description": "Những truyện được đăng chính thức tại HentaiVN."
    },
    {
        "Id": "142",
        "Name": "Historical",
        "Description": "Truyện có thể loại này sẽ có bối cảnh nói về thời xa xưa, hoặc lịch sử."
    },
    {
        "Id": "143",
        "Name": "Horror",
        "Description": "Là một loại kinh dị thông thường. Tạo sự rùng rợn và ghê sợ khi xem chúng. Thể loại Horror không có cảnh mổ xẻ tình dục kinh tởm quá mức như Guro. Hầu hết chỉ là giết chóc đơn thuần, hoặc nội dung ma quỷ, máu me ở mức độ khiến chúng ta ghê sợ."
    },
    {
        "Id": "144",
        "Name": "Housewife",
        "Description": "Housewife là một thuật ngữ dùng để mô tả một phụ nữ đã lập gia đình không được làm việc bên ngoài của ngôi nhà, thay vào đó cô sẽ làm nội trợ trong khi chồng cô làm việc."
    },
    {
        "Id": "145",
        "Name": "Humiliation",
        "Description": "Làm xấu hổ, mang tính ép buộc hoặc đặt một nhân vật nào đó vào tình cảnh tiến thoái lưỡng nan không trốn tránh được."
    },
    {
        "Id": "146",
        "Name": "Idol",
        "Description": "Thần tượng. Nội dung truyện có liên quan đến các nữ idol trên sân khấu. Không phải chỉ là các nhân vật từ các game/anime idol, trừ khi họ thể hiện nó trong nội dung truyện."
    },
    {
        "Id": "147",
        "Name": "Imouto",
        "Description": "Là em gái, không nhất thiết phải là em gái cùng huyết thống."
    },
    {
        "Id": "148",
        "Name": "Incest",
        "Description": "Loạn luân, quan hệ với thành viên có cùng huyết thống."
    },
    {
        "Id": "149",
        "Name": "Insect (Côn Trùng)",
        "Description": "Côn trùng"
    },
    {
        "Id": "150",
        "Name": "Isekai",
        "Description": "Isekai được hiểu là Dị giới. Trong thể loại này nhân vật chính sẽ Xuyên không sang thế giới khác, hoặc trực tiếp Chuyển sinh (đầu thai) sang đây."
    },
    {
        "Id": "151",
        "Name": "Không che",
        "Description": "Thể loại này Không che các bộ phận nhạy cảm. Hoàn toàn Uncensored."
    },
    {
        "Id": "152",
        "Name": "Kimono",
        "Description": "Mặc một bộ đồ mang đặc tính Kimono."
    },
    {
        "Id": "153",
        "Name": "Kuudere",
        "Description": "Kiểu nhân vật bề ngoài cực kì lạnh lùng để che giấu cảm xúc bên trong. Chỉ mở lòng khi chinh phục được nàng."
    },
    {
        "Id": "154",
        "Name": "Lolicon",
        "Description": "Truyện xyz với bé gái hoặc mang hình dạng bé gái."
    },
    {
        "Id": "155",
        "Name": "Maids",
        "Description": "Trang phục hầu gái là rất phổ biến ở Nhật Bản và thường được mặc trong anime và manga."
    },
    {
        "Id": "156",
        "Name": "Manhua",
        "Description": "Truyện Trung quốc, đặc biệt là cổ trang. Tất cả truyện do người Trung vẽ đều thuộc tag Manhua, kể cả vẽ theo phong cách và bối cảnh Nhật Bản."
    },
    {
        "Id": "157",
        "Name": "Manhwa",
        "Description": "Truyện hàn quốc. Thể loại này đã bị cấm đăng vì lí do bản quyền!"
    },
    {
        "Id": "158",
        "Name": "Masturbation",
        "Description": "Tự sướng hay còn gọi là thủ dâm. Đây là hành động tự làm sướng bản thân (dương vật, âm đạo) mà không cần bất kỳ đối tác nào."
    },
    {
        "Id": "159",
        "Name": "Mature",
        "Description": "Bao gồm các pha bạo lực, máu me, chém giết, tình dục ở mức độ vừa."
    },
    {
        "Id": "160",
        "Name": "Miko",
        "Description": "Gái giữ đền, gái vu nữ."
    },
    {
        "Id": "161",
        "Name": "Milf",
        "Description": "Lái máy bay bà già."
    },
    {
        "Id": "162",
        "Name": "Mind Break",
        "Description": "Đánh mất bản thân, sa ngã vì dục vọng."
    },
    {
        "Id": "163",
        "Name": "Mind Control",
        "Description": "Bị điều khiển tâm trí như thuật thôi miên hay công cụ, ứng dụng hack não các kiểu..."
    },
    {
        "Id": "164",
        "Name": "Mizugi",
        "Description": "Đồ bơi đặc trưng tại trường học chỉ có ở Nhật Bản."
    },
    {
        "Id": "165",
        "Name": "Monster",
        "Description": "Con quái vật, loài động vật bị đột biến hoặc con người, sinh vật thần thoại, hay người ngoài hành tinh."
    },
    {
        "Id": "166",
        "Name": "Monstergirl",
        "Description": "Gái quái vật."
    },
    {
        "Id": "167",
        "Name": "Mother",
        "Description": "Mẹ/Má. Là mẹ ruột, cũng có thể là mẹ nuôi/mẹ kế."
    },
    {
        "Id": "168",
        "Name": "Nakadashi",
        "Description": "Tinh dịch tuôn ra nhiều đến mức tràn ra ngoài âm đạo."
    },
    {
        "Id": "169",
        "Name": "Netori",
        "Description": "Main đi NTR (Cắm sừng) người khác."
    },
    {
        "Id": "170",
        "Name": "Non-hen",
        "Description": "Là truyện bình thường không có các cảnh hở hang, không có bất kỳ yếu tố người lớn nào. Thể loại này đã bị cấm đăng bởi nội quy!"
    },
    {
        "Id": "171",
        "Name": "NTR",
        "Description": "Cướp bồ của Main, cắm sừng,.."
    },
    {
        "Id": "172",
        "Name": "Nun",
        "Description": "Là Sơ (Sister) trong nhà thờ. Hay còn được gọi là Nữ Tu."
    },
    {
        "Id": "173",
        "Name": "Nurse",
        "Description": "Y tá hoặc mặc trang phục y tá."
    },
    {
        "Id": "174",
        "Name": "Old Man",
        "Description": "Ở thể loại này bạn sẽ được thấy những ông già bình thường, không bẩn bựa tí nào."
    },
    {
        "Id": "175",
        "Name": "Oneshot",
        "Description": "Các truyện chỉ có 1 chap."
    },
    {
        "Id": "176",
        "Name": "Oral",
        "Description": "Quan hệ tình dục bằng đường miệng. Người chủ động là nhân vật nam."
    },
    {
        "Id": "177",
        "Name": "Osananajimi",
        "Description": "Bạn thời thơ ấu. Nội dung ở đây nói tới một người bạn thời thơ ấu của nam chính. Thường thì họ luôn có tình cảm với nam chính."
    },
    {
        "Id": "178",
        "Name": "Paizuri",
        "Description": "Quan hệ tình dục với ngực."
    },
    {
        "Id": "179",
        "Name": "Pantyhose",
        "Description": "Một dạng quần tất, thường là màu đen, dùng để mặc đè lên quần lót."
    },
    {
        "Id": "180",
        "Name": "Ponytail",
        "Description": "Trong Anime/Manga thì chúng ta thường thấy đây là kiểu tóc buộc một bên phải hoặc trái. Hoặc buộc phía sau: Kiểu tóc đuôi ngựa."
    },
    {
        "Id": "181",
        "Name": "Pregnant",
        "Description": "Có thai."
    },
    {
        "Id": "182",
        "Name": "Rape",
        "Description": "Hiếp dâm."
    },
    {
        "Id": "183",
        "Name": "Rimjob",
        "Description": "Liếm lỗ hậu, làm nhiều động tác bằng miệng khiến lỗ hậu cảm thấy sướng."
    },
    {
        "Id": "184",
        "Name": "Romance",
        "Description": "Thường là những câu chuyện về tình yêu. Ở đây chúng ta sẽ lấy ví dụ như tình yêu giữa một người con trai và con gái, bên cạnh đó đặc điểm thể loại này là kích thích trí tưởng tượng của bạn về tình yêu."
    },
    {
        "Id": "185",
        "Name": "Ryona",
        "Description": "Làm tổn thương cơ thể người khác (Như đấm, đá, hành hạ) mà không có sự đồng ý từ người đó, và người đó cũng không chống lại."
    },
    {
        "Id": "186",
        "Name": "Scat",
        "Description": "Shit - chất thải của con người sau mỗi bữa ăn. Tại thể loại này người ta sẽ làm tình với Shit, và các hoạt động tình dục liên quan đến nó. Hãy cân nhắc kĩ trước khi xem truyện có thể loại này. (Scat đã bị cấm kể từ 14/3/2019)."
    },
    {
        "Id": "187",
        "Name": "School Uniform",
        "Description": "Đồng phục trường học."
    },
    {
        "Id": "188",
        "Name": "SchoolGirl",
        "Description": "Gái có đồng phục nữ sinh, hoặc là nữ sinh dù mặc trang phục khác."
    },
    {
        "Id": "189",
        "Name": "Series",
        "Description": "Truyện có nhiều chap và nội dung liên quan đến nhau."
    },
    {
        "Id": "190",
        "Name": "Sex Toys",
        "Description": "Đồ chơi tình dục."
    },
    {
        "Id": "191",
        "Name": "Shimapan",
        "Description": "Quần lót có kẻ sọc như xanh, hồng, đỏ,.."
    },
    {
        "Id": "192",
        "Name": "Short Hentai",
        "Description": "Truyện ngắn. Dù là chung một bộ truyện, nhưng lại chứa các nội dung khác nhau."
    },
    {
        "Id": "193",
        "Name": "Shota",
        "Description": "Truyện về nhân vật nam ở tuổi vị thành niên hoặc mang dáng vóc của trẻ vị thành niên."
    },
    {
        "Id": "194",
        "Name": "Shoujo",
        "Description": "Không chỉ nam giới, thể loại này còn rất phù hợp cho nữ giới."
    },
    {
        "Id": "195",
        "Name": "Siscon",
        "Description": "Cuồng chị gái, yêu em gái. Vượt quá giới hạn của anh chị em."
    },
    {
        "Id": "196",
        "Name": "Sister",
        "Description": "Chị gái, em gái."
    },
    {
        "Id": "197",
        "Name": "Slave",
        "Description": "Nô lệ tình dục."
    },
    {
        "Id": "198",
        "Name": "Sleeping",
        "Description": "Làm tình với người đang ngủ say hoặc giả vờ ngủ."
    },
    {
        "Id": "199",
        "Name": "Small Boobs",
        "Description": "Ngực tương đối nhỏ hoặc ngực phẳng lì như cái sân bay."
    },
    {
        "Id": "200",
        "Name": "Son",
        "Description": "Là con trai trong gia đình. Có hoặc không có cùng huyết thống (con nuôi) (cha dượng, mẹ kế)."
    },
    {
        "Id": "201",
        "Name": "Sports",
        "Description": "Liên quan đến các môn thể thao, vận động thể thao."
    },
    {
        "Id": "202",
        "Name": "Stockings",
        "Description": "Là một loại vớ (tất) ngắn hoặc dài, thường là màu đen."
    },
    {
        "Id": "203",
        "Name": "Supernatural",
        "Description": "Thể hiện những sức mạnh đáng kinh ngạc và không thể giải thích được, chúng thường đi kèm với những sự kiện trái ngược hoặc thách thức với những định luật vật lý."
    },
    {
        "Id": "204",
        "Name": "Sweating",
        "Description": "Chảy mồ hôi rất nhiều. Trong cảnh làm tình thì chủ yếu là nhân vật nữ tuôn ra rất nhiều mồ hôi trông rất ướt át."
    },
    {
        "Id": "205",
        "Name": "Swimsuit",
        "Description": "Bao gồm tất cả các loại đồ bơi."
    },
    {
        "Id": "206",
        "Name": "Tall Girl",
        "Description": "Gái cao ráo, chân dài tới nách. Thường có chiều cao hơn nam chính."
    },
    {
        "Id": "207",
        "Name": "Teacher",
        "Description": "Giáo viên."
    },
    {
        "Id": "208",
        "Name": "Tentacles",
        "Description": "Sinh vật có xúc tua/xúc tu (thường là quái vật) hiếp dâm các cô gái bằng những chiếc vòi."
    },
    {
        "Id": "209",
        "Name": "Time Stop",
        "Description": "Ngưng thời gian."
    },
    {
        "Id": "210",
        "Name": "Tomboy",
        "Description": "Cô nàng với vẻ ngoài và tính cách giống với nam giới (thường là tóc ngắn)"
    },
    {
        "Id": "211",
        "Name": "Tracksuit",
        "Description": "Một loại quần áo quen thuộc dùng để mặc khi tập luyện thể thao."
    },
    {
        "Id": "212",
        "Name": "Transformation",
        "Description": "Nhân vật biến thân sang một hình thể khác."
    },
    {
        "Id": "213",
        "Name": "Trap",
        "Description": "Nhân vật nam ăn mặc giống nữ, hoặc có các tính cách giống nữ."
    },
    {
        "Id": "214",
        "Name": "Truyện Việt",
        "Description": "Truyện Việt Nam. Được vẽ bởi họa sĩ người Việt. Kể cả những truyện theo phong cách của nước khác, miễn rằng do người Việt vẽ thì đó là Truyện Việt."
    },
    {
        "Id": "215",
        "Name": "Tsundere",
        "Description": "Tính cách, ứng xử ngược lại với cảm xúc."
    },
    {
        "Id": "216",
        "Name": "Twins",
        "Description": "Song sinh. Có ngoại hình giống y hệt nhau."
    },
    {
        "Id": "217",
        "Name": "Twintails",
        "Description": "Tóc hai bím. Một ví dụ là nhân vật Hatsune Miku."
    },
    {
        "Id": "218",
        "Name": "Vampire",
        "Description": "Ma cà rồng"
    },
    {
        "Id": "219",
        "Name": "Vanilla",
        "Description": "Truyện có thể loại này câu chuyện chủ yếu xoay quanh nhân vật nam và nữ, và không có gì bất thường xảy ra như cướp, tập thể, tay ba,.. Thể loại Vanilla không nhất thiết phải là yêu nhau."
    },
    {
        "Id": "220",
        "Name": "Virgin",
        "Description": "Gái trinh. Lưu ý có những cô gái khi làm tình lần đầu không có máu trinh là vì đã mất trinh trước đó do tai nạn, hoặc do thủ dâm làm rách màng trinh."
    },
    {
        "Id": "221",
        "Name": "Webtoon",
        "Description": "Đây những truyện có cách đọc đặc biệt là kéo xuống đến hết. Không như các thể loại khác với cách đọc truyền thống và thường in ra sách, thì Webtoon chỉ phát hành trực tuyến - Đó cũng là lý do nó có cách đọc đặc biệt như vậy."
    },
    {
        "Id": "222",
        "Name": "X-ray",
        "Description": "X-Quang, rọi xuyên bên trong khi làm tình."
    },
    {
        "Id": "223",
        "Name": "Yandere",
        "Description": "Các cô gái dễ thương ngày nào của chúng ta sẵn sàng ra tay thủ tiêu tình địch, hay mù quáng hơn là hạ thủ người yêu để anh ấy mãi của riêng mình. Truyện thuộc thể loại không nhất thiết nhân vật nữ phải giết bạn tình, đôi khi chỉ là biểu hiện mà thôi."
    },
    {
        "Id": "224",
        "Name": "Yaoi",
        "Description": "Trai x Trai. Thể loại này còn được gọi là BL (Boy Love) hoặc Đam Mỹ."
    },
    {
        "Id": "225",
        "Name": "Yuri",
        "Description": "Trong Hentai thì thể loại này không chỉ dành riêng cho Nữ x Nữ, mà một số truyện còn có sự xuất hiện của nhân vật nam (Harem). Chúng ta sẽ thấy 2 nhân vật nữ làm tình với nhau cùng lúc hoặc không cùng lúc với nhân vật nam."
    },
    {
        "Id": "226",
        "Name": "Zombie",
        "Description": "Xác sống."
    }
]

},{}],64:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Main = exports.getExportVersion = exports.DOMAIN = void 0;
const time_1 = require("./utils/time");
exports.DOMAIN = 'https://hoang3409.link/api/';
const BASE_VERSION = '1.3.2';
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
                    apiPath = `${exports.DOMAIN}${this.Host}`;
                    params = '?page=1';
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
                    title: item.title[0].title,
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
            url: `${exports.DOMAIN}${this.Host}`,
            param: `?page=${page}`,
            method: 'GET'
        });
        const data = await this.requestManager.schedule(request, 1);
        const result = typeof data.data === 'string' ? JSON.parse(data.data) : data.data;
        const items = [];
        for (const item of result.mangas) {
            items.push(App.createPartialSourceManga({
                title: item.title[0].title,
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
        // mangaId like "gokusotsu-kraken-72204"
        const request = App.createRequest({
            url: `${exports.DOMAIN}${this.Host}/Manga?url=${mangaId}`,
            method: 'GET'
        });
        const response = await this.requestManager.schedule(request, 1);
        const data = typeof response.data === 'string' ? JSON.parse(response.data) : response.data;
        const titles = [];
        const tags = [];
        for (const item of data.title) {
            titles.push(item.title);
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
            url: `${exports.DOMAIN}${this.Host}/Chapter`,
            param: `?url=${mangaId}`,
            method: 'GET'
        });
        const response = await this.requestManager.schedule(request, 1);
        const data = typeof response.data === 'string' ? JSON.parse(response.data) : response.data;
        const chapters = [];
        for (const item of data) {
            chapters.push(App.createChapter({
                id: this.UseId ? item.id.toString() : item.url,
                chapNum: item.numChap ?? item.chapNumber,
                name: item.title,
                time: (0, time_1.convertTime)(item.timeUpdate)
            }));
        }
        return chapters;
    }
    async getChapterDetails(mangaId, chapterId) {
        const request = App.createRequest({
            url: `${exports.DOMAIN}${this.Host}/ChapterDetail`,
            param: `?url=${chapterId}`,
            method: 'GET'
        });
        const response = await this.requestManager.schedule(request, 1);
        const data = typeof response.data === 'string' ? JSON.parse(response.data) : response.data;
        const images = [];
        for (const image of data) {
            let img = '';
            image.toString().startsWith('//') ? img = `https:${image}` : img = image;
            img = img.replace('http:', 'https:');
            images.push(img);
        }
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
            url: `${exports.DOMAIN}${this.Host}/Search`,
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
                title: item.title[0].title,
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
        // other tags - paperback not acp dup tags
        // if (this.SearchWithNotGenres) {
        //     result.push(App.createTagSection({
        //         id: '1', 
        //         label: 'Thể loại - Có thể loại bỏ những thể loại bạn không mong muốn', 
        //         tags: tags
        //     }))
        // }
        return result;
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
