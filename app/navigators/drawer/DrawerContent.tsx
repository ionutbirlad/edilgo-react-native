import React from 'react';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer'

const DrawerContent = (props) => {
    return <DrawerContentScrollView {...props.props}>
        {/* <DrawerItemList {...props.props} /> */}
        <DrawerItem label='Dashboard' onPress={() => props.props.navigation.navigate('dashboard')} />
        <DrawerItem label='Home' onPress={() => props.props.navigation.navigate('home')} />
        <DrawerItem label='Profilo' onPress={() => props.props.navigation.navigate('profile')} />
        <DrawerItem label='Progetti' onPress={() => props.props.navigation.navigate('allProjects')} />
        <DrawerItem label='Richieste singole' onPress={() => props.props.navigation.navigate('allSingleRequests')} />
        <DrawerItem label='Logout' onPress={() => props.authStore.reset()} />
        {/* <DrawerItem label='Progetto' onPress={() => props.navigation.navigate('project')} />
        <DrawerItem label='Richiesta singola' onPress={() => props.navigation.navigate('singleRequest')} /> */}
    </DrawerContentScrollView>
}

export default DrawerContent;