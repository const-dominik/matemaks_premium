// ==UserScript==
// @name         matemaks premium
// @description  access matemaks premium videos
// @author       https://github.com/const-dominik
// @match        https://www.matemaks.pl/*
// ==/UserScript==

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
(function () { return __awaiter(_this, void 0, void 0, function () {
    var getNthParent, sleep, reverseStr, makeYtButtons, getHtml, HTML, oldNodes, newNodes;
    var _this = this;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                getNthParent = function (element, n) {
                    var parent = element.parentElement;
                    if (parent) {
                        return n === 0 ? element : getNthParent(parent, n - 1);
                    }
                    return false;
                };
                sleep = function (ms) { return new Promise(function (resolve) { return setTimeout(resolve, ms); }); };
                reverseStr = function (str) { return str.split("").reverse().join(""); };
                makeYtButtons = function () {
                    var prems = Array.from(document.querySelectorAll("a.but.b_prem"));
                    prems.forEach(function (prem) {
                        var zadanie = getNthParent(prem, 2);
                        if (zadanie) {
                            var ytIdBackwards = zadanie.getAttribute("yt");
                            if (ytIdBackwards) {
                                var ytId = reverseStr(ytIdBackwards);
                                var ytHref = "https://www.youtube.com/watch?v=".concat(ytId);
                                prem.setAttribute("href", ytHref);
                                prem.setAttribute("target", "_blank");
                                prem.className = "but b_yt";
                                prem.textContent = "Obejrzyj na Youtubie";
                            }
                        }
                    });
                };
                getHtml = function () { return __awaiter(_this, void 0, void 0, function () {
                    var parser, request, data, document_1;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                parser = new DOMParser();
                                _a.label = 1;
                            case 1:
                                if (!true) return [3 /*break*/, 6];
                                return [4 /*yield*/, fetch(window.location.href)];
                            case 2:
                                request = _a.sent();
                                if (!(!request || !request.ok)) return [3 /*break*/, 4];
                                return [4 /*yield*/, sleep(100)];
                            case 3:
                                _a.sent();
                                return [3 /*break*/, 1];
                            case 4: return [4 /*yield*/, request.text()];
                            case 5:
                                data = _a.sent();
                                document_1 = parser.parseFromString(data, "text/html");
                                return [2 /*return*/, document_1];
                            case 6: return [2 /*return*/];
                        }
                    });
                }); };
                return [4 /*yield*/, getHtml()];
            case 1:
                HTML = _a.sent();
                oldNodes = document.querySelectorAll(".zadanie[yt]");
                newNodes = HTML.querySelectorAll(".zadanie[yt]");
                oldNodes.forEach(function (node, index) { return node.setAttribute("yt", newNodes[index].getAttribute("yt") || ""); });
                makeYtButtons();
                return [2 /*return*/];
        }
    });
}); })();
