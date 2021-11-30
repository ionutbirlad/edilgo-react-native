"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.LoginScreen = void 0;
var react_1 = require("react");
var react_native_1 = require("react-native");
var mobx_react_lite_1 = require("mobx-react-lite");
var components_1 = require("../../components");
var theme_1 = require("../../theme");
var native_base_1 = require("native-base");
var edilgoLogo = require("./edilgo-logo.png");
var FULL = { flex: 1 };
var CONTAINER = {
    backgroundColor: theme_1.color.transparent
};
var FORMCONTAINER = {
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    backgroundColor: 'white',
    height: 650
};
var TEXT = {
    color: theme_1.color.palette.white,
    fontFamily: theme_1.typography.primary
};
var BOLD = { fontWeight: "bold" };
var HEADER = {
    paddingTop: theme_1.spacing[3],
    paddingBottom: theme_1.spacing[4] + theme_1.spacing[1],
    paddingHorizontal: 0
};
var HEADER_TITLE = __assign(__assign(__assign({}, TEXT), BOLD), { fontSize: 12, lineHeight: 15, textAlign: "center", letterSpacing: 1.5 });
var TITLE_WRAPPER = __assign(__assign({}, TEXT), { textAlign: "center" });
var TITLE = __assign(__assign(__assign({}, TEXT), BOLD), { fontSize: 28, lineHeight: 38, textAlign: "center" });
var ALMOST = __assign(__assign(__assign({}, TEXT), BOLD), { fontSize: 26, fontStyle: "italic" });
var EDILGO = {
    alignSelf: "center",
    marginVertical: theme_1.spacing[5],
    maxWidth: "100%",
    width: 250,
    height: 100
};
var CONTENT = __assign(__assign({}, TEXT), { color: "#BAB6C8", fontSize: 15, lineHeight: 22, marginBottom: theme_1.spacing[5] });
var CONTINUE = {
    paddingVertical: theme_1.spacing[4],
    paddingHorizontal: theme_1.spacing[4],
    backgroundColor: theme_1.color.palette.deepPurple
};
var CONTINUE_TEXT = __assign(__assign(__assign({}, TEXT), BOLD), { fontSize: 13, letterSpacing: 2 });
var FOOTER = { backgroundColor: "#20162D" };
var FOOTER_CONTENT = {
    paddingVertical: theme_1.spacing[4],
    paddingHorizontal: theme_1.spacing[4]
};
exports.LoginScreen = mobx_react_lite_1.observer(function (_a) {
    var navigation = _a.navigation;
    var _b = react_1.useState('bbb'), email = _b[0], setEmail = _b[1];
    var _c = react_1.useState('aaa'), password = _c[0], setPassword = _c[1];
    // const nextScreen = () => navigation.navigate("demo")
    var goToDashboard = function () { return navigation.navigate("dashboard"); };
    return (react_1["default"].createElement(react_native_1.View, { testID: "LoginScreen", style: FULL },
        react_1["default"].createElement(components_1.GradientBackground, { colors: ["#42244390", "#e64b11"] }),
        react_1["default"].createElement(components_1.Screen, { style: CONTAINER, preset: "scroll", backgroundColor: theme_1.color.transparent },
            react_1["default"].createElement(components_1.AutoImage, { source: edilgoLogo, style: EDILGO }),
            react_1["default"].createElement(native_base_1.NativeBaseProvider, null,
                react_1["default"].createElement(react_native_1.View, { style: FORMCONTAINER },
                    react_1["default"].createElement(native_base_1.Box, { safeArea: true, flex: 1, p: "2", py: "8", w: "90%", mx: "auto" },
                        react_1["default"].createElement(native_base_1.Text, null, email),
                        react_1["default"].createElement(native_base_1.Text, null, password),
                        react_1["default"].createElement(native_base_1.Heading, { size: "lg", fontWeight: "600", color: "black" }, "Benvenuto"),
                        react_1["default"].createElement(native_base_1.Heading, { mt: "1", color: "black", fontWeight: "medium", size: "xs" }, "Accedi per poter continuare!"),
                        react_1["default"].createElement(native_base_1.VStack, { space: 3, mt: "5" },
                            react_1["default"].createElement(native_base_1.FormControl, null,
                                react_1["default"].createElement(native_base_1.FormControl.Label, { _text: {
                                        color: 'black',
                                        fontSize: 'xs',
                                        fontWeight: 500
                                    } }, "Email"),
                                react_1["default"].createElement(native_base_1.Input, null)),
                            react_1["default"].createElement(native_base_1.FormControl, null,
                                react_1["default"].createElement(native_base_1.FormControl.Label, { _text: {
                                        color: 'black',
                                        fontSize: 'xs',
                                        fontWeight: 500
                                    } }, "Password"),
                                react_1["default"].createElement(native_base_1.Input, { type: "password" }),
                                react_1["default"].createElement(native_base_1.Link, { _text: { fontSize: 'xs', fontWeight: '500', color: 'indigo.500' }, alignSelf: "flex-end", mt: "1" }, "Forget Password?")),
                            react_1["default"].createElement(native_base_1.Button, { mt: "2", colorScheme: "indigo", _text: { color: 'white' } }, "Accedi"),
                            react_1["default"].createElement(native_base_1.HStack, { mt: "6", justifyContent: "center" },
                                react_1["default"].createElement(native_base_1.Text, { fontSize: "sm", color: "black", fontWeight: 400 },
                                    "Sono un nuovo utente.",
                                    ' '),
                                react_1["default"].createElement(native_base_1.Link, { _text: {
                                        color: 'indigo.500',
                                        fontWeight: 'medium',
                                        fontSize: 'sm'
                                    }, href: "#", onPress: goToDashboard }, "Registrati")))))))));
});
