import React from "react"
import { AppStack } from '../app-navigator'
import { createDrawerNavigator } from '@react-navigation/drawer'
import DrawerContent from './DrawerContent'
import { observer } from "mobx-react-lite"
import { useStores } from "../../models"

const Drawer = createDrawerNavigator()

export const DrawerNavigator = observer(() => {
  const { authenticationStore } = useStores()

  return <Drawer.Navigator
      drawerContent={props => DrawerContent({props: props, authStore: authenticationStore})}
      initialRouteName="dashboard"
      screenOptions={{
        // headerShown: false
        headerStatusBarHeight: 30,
      }}
      >
      <Drawer.Screen name=' ' component={AppStack} />
  </Drawer.Navigator>
})
