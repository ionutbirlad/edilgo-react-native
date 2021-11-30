"use strict";
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
exports.__esModule = true;
exports.SingleRequestTableScreen = void 0;
var react_1 = require("react");
var mobx_react_lite_1 = require("mobx-react-lite");
var react_native_1 = require("react-native");
var components_1 = require("../../components");
var native_base_1 = require("native-base");
var react_native_paper_1 = require("react-native-paper");
var native_1 = require("@react-navigation/native");
var models_1 = require("../../models");
var react_native_table_component_1 = require("react-native-table-component");
var theme_1 = require("../../theme");
var ROOT = {
    backgroundColor: theme_1.color.palette.black,
    flex: 1
};
var optionsPerPage = [2, 3, 4];
exports.SingleRequestTableScreen = mobx_react_lite_1.observer(function SingleRequestTableScreen(_a) {
    var _this = this;
    var route = _a.route;
    var _b = react_1["default"].useState(false), refreshing = _b[0], setRefreshing = _b[1];
    var _c = react_1["default"].useState(), singleRequestInfo = _c[0], setSingleRequestInfo = _c[1];
    var projectContentStore = models_1.useStores().projectContentStore;
    var projectContent = projectContentStore.projectContent;
    var _d = react_1["default"].useState(0), page = _d[0], setPage = _d[1];
    var _e = react_1["default"].useState(false), visible = _e[0], setVisible = _e[1];
    var _f = react_1["default"].useState(optionsPerPage[0]), itemsPerPage = _f[0], setItemsPerPage = _f[1];
    var _g = react_1["default"].useState(projectContent[0].requests[0].node.bomitemSet.edges), tableRows = _g[0], setTableRows = _g[1];
    var _h = react_1["default"].useState(route.params.projectId), projectId = _h[0], setProjectId = _h[1];
    var _j = react_1["default"].useState(['Codice', 'Descrizione', 'Parti', 'Lung.', 'Larg.', 'H/Peso', 'Um', 'Quantita', 'Budget U.', 'Budget']), tableHead = _j[0], setTableHead = _j[1];
    var _k = react_1["default"].useState([150, 300, 80, 80, 80, 80, 50, 80, 90, 100]), widthArr = _k[0], setWidthArr = _k[1];
    var _l = react_1["default"].useState([
        ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
        ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
        ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
        ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
        ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
        ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
        ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    ]), tableData = _l[0], setTableData = _l[1];
    native_1.useFocusEffect(react_1["default"].useCallback(function () {
        getContent().then(function () { return __awaiter(_this, void 0, void 0, function () {
            var arrangedBomItems;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, projectContentStore.bomItemSet.map(function (item) {
                            return [
                                item.node.code,
                                item.node.description,
                                item.node.parts,
                                item.node.length,
                                item.node.width,
                                item.node.heightOrWeight,
                                item.node.unitOfMeasurement,
                                item.node.quantity,
                                item.node.unitPrice,
                            ];
                        })];
                    case 1:
                        arrangedBomItems = _a.sent();
                        setTableData(arrangedBomItems);
                        console.log(projectContentStore.bomItemSet);
                        return [2 /*return*/];
                }
            });
        }); });
    }, []));
    native_1.useFocusEffect(react_1["default"].useCallback(function () {
        setPage(0);
    }, [itemsPerPage]));
    var getContent = function () { return __awaiter(_this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, setRefreshing(true)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, projectContentStore.getProjectContent({ projectId: route.params.projectId })
                            .then(function () { return __awaiter(_this, void 0, void 0, function () {
                            var parsedInfo;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, JSON.parse(JSON.stringify(projectContent[0].projectInfo))];
                                    case 1:
                                        parsedInfo = _a.sent();
                                        return [4 /*yield*/, setSingleRequestInfo(parsedInfo)];
                                    case 2:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); })];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, setRefreshing(false)];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    var _m = react_1["default"].useState(true), expanded = _m[0], setExpanded = _m[1];
    return (react_1["default"].createElement(components_1.Screen, { style: ROOT, preset: "fixed", unsafe: true },
        react_1["default"].createElement(components_1.GradientBackground, { colors: ["#fff", "#fff"] }),
        react_1["default"].createElement(native_base_1.NativeBaseProvider, null,
            react_1["default"].createElement(react_native_paper_1.Provider, null,
                react_1["default"].createElement(native_base_1.View, { style: styles.container },
                    react_1["default"].createElement(native_base_1.ScrollView, { horizontal: true },
                        react_1["default"].createElement(native_base_1.View, null,
                            react_1["default"].createElement(react_native_table_component_1.Table, { borderStyle: { borderWidth: 0.2, borderColor: theme_1.color.palette.white } },
                                react_1["default"].createElement(react_native_table_component_1.Row, { data: tableHead, widthArr: widthArr, style: styles.header, textStyle: styles.text })),
                            react_1["default"].createElement(native_base_1.ScrollView, { style: styles.dataWrapper },
                                react_1["default"].createElement(react_native_table_component_1.Table, { borderStyle: { borderWidth: 0.2, borderColor: theme_1.color.palette.lightGrey } }, tableData.map(function (rowData, index) { return (react_1["default"].createElement(react_native_table_component_1.Row, { key: index, data: rowData, widthArr: widthArr, style: [styles.row], textStyle: styles.text })); }))))))))));
});
var styles = react_native_1.StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff', display: 'flex', flexDirection: 'row' },
    header: { height: 50, backgroundColor: theme_1.color.primary },
    text: { textAlign: 'center', fontWeight: '100' },
    dataWrapper: { marginTop: -1 },
    row: { height: 40, backgroundColor: theme_1.color.palette.lighterGrey }
});
