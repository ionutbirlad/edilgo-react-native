/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import React from "react"
import { useColorScheme } from "react-native"
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import {
  WelcomeScreen,
  DemoScreen,
  DemoListScreen,
  LoginScreen,
  RegisterScreen,
  DashboardScreen,
  HomeScreen,
  ProfileScreen,
  ProjectsScreen,
  SingleRequestsScreen,
  ProjectScreen,
  ProjectRequestsScreen,
  ProjectTableScreen,
  SingleRequestScreen,
  SingleRequestTableScreen,
  LoadingScreen
} from "../screens"
import { navigationRef } from "./navigation-utilities"

import { DrawerNavigator } from './drawer/drawer-navigator'

import { useStores } from "../models"

import { observer } from "mobx-react-lite"

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 */
export type NavigatorParamList = {
  welcome: undefined
  demo: undefined
  demoList: undefined
  login: undefined
  register: undefined
  dashboard: undefined
  home: undefined
  profile: undefined
  allProjects: undefined
  allSingleRequests: undefined
  project: undefined
  projectRequests: undefined
  projectTable: undefined
  singleRequest: undefined
  singleRequestTable: undefined
  loading: undefined
}

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createNativeStackNavigator<NavigatorParamList>()

export const AppStack = ({route}: any) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerBackTitle: 'Indietro',
      }}
      initialRouteName="dashboard"
    >
      <Stack.Screen name="welcome" component={WelcomeScreen} />
      <Stack.Screen name="demo" component={DemoScreen} />
      <Stack.Screen name="demoList" component={DemoListScreen} />
      <Stack.Screen name="dashboard" options={{ title: 'Dashboard' }} component={DashboardScreen} />
      <Stack.Screen name="home" options={{ title: 'Home' }} component={HomeScreen} />
      <Stack.Screen name="profile" options={{ title: 'Profilo' }} component={ProfileScreen} />
      <Stack.Screen name="allProjects" options={{ title: 'Progetti' }} component={ProjectsScreen} />
      <Stack.Screen name="allSingleRequests" options={{ title: 'Richieste singole' }} component={SingleRequestsScreen} />
      <Stack.Screen name="project" options={{ title: 'Progetto' }} component={ProjectScreen} />
      <Stack.Screen name="projectRequests" options={{ title: 'Richieste progetto' }} component={ProjectRequestsScreen} />
      <Stack.Screen name="projectTable" options={{ title: 'Voci progetto' }} component={ProjectTableScreen} />
      <Stack.Screen name="singleRequest" options={{ title: 'Richiesta singola' }} component={SingleRequestScreen} />
      <Stack.Screen name="singleRequestTable" options={{ title: 'Voci richiesta singola' }} component={SingleRequestTableScreen} />
    </Stack.Navigator>
  )
}

export const AuthStack = () => {

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="login"
    >
      <Stack.Screen name="login" component={LoginScreen} />
      <Stack.Screen name="register" component={RegisterScreen} />
    </Stack.Navigator>
  )
}

export const LoadingStack = () => {

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="loading"
    >
      <Stack.Screen name="loading" component={LoadingScreen} />
    </Stack.Navigator>
  )
}

interface NavigationProps extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = observer((props: NavigationProps) => {
  const colorScheme = useColorScheme()
  const { authenticationStore } = useStores()
  
  return (
    <NavigationContainer
      ref={navigationRef}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
      {...props}
    >
      {authenticationStore.isAuthenticated ? <DrawerNavigator /> : <AuthStack />}
    </NavigationContainer>
  )
})

AppNavigator.displayName = "AppNavigator"

/**
 * A list of routes from which we're allowed to leave the app when
 * the user presses the back button on Android.
 *
 * Anything not on this list will be a standard `back` action in
 * react-navigation.
 *
 * `canExit` is used in ./app/app.tsx in the `useBackButtonHandler` hook.
 */
const exitRoutes = ["welcome"]
export const canExit = (routeName: string) => exitRoutes.includes(routeName)
