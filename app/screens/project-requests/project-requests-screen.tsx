import React, { useState, useRef } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, StyleSheet, FlatList, View, TextStyle, ImageStyle, TouchableOpacity } from "react-native"
import { Screen, GradientBackground, AutoImage as Image, } from "../../components"
import { color, spacing } from "../../theme"
import {
  Box,
  Text,
  NativeBaseProvider,
  Divider,
  Actionsheet,
  useDisclose,
  Avatar,
  Menu as NativeBaseMenu,
  Divider as NativeBaseDivider,
  Pressable,
} from 'native-base'
import {
  Provider as PaperProvider,
  Caption,
  Button,
  Menu,
  Divider as PaperDivider
} from 'react-native-paper'
import { useFocusEffect } from '@react-navigation/native'
import { useStores } from "../../models"

type RegionType = {
  latitude: Number,
  longitude: Number,
  latitudeDelta: Number,
  longitudeDelta: Number,
}

export const ProjectRequestsScreen = observer(function ProjectRequestsScreen({navigation, route}: any) {
  const [refreshing, setRefreshing] = useState(false)
  const { projectContentStore } = useStores()
  const { projectContent } = projectContentStore
  const [visible, setVisible] = React.useState('')
  const [singleRequestInfo, setSingleRequestInfo] = React.useState<any>()
  const [region, setRegion] = useState<RegionType>()

  useFocusEffect(
    React.useCallback(() => {
      getContent().then(() => {
        setRegion({
          latitude: Number(JSON.parse(JSON.stringify(projectContent[0].projectInfo)).latitude),
          longitude: Number(JSON.parse(JSON.stringify(projectContent[0].projectInfo)).latitude),
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        })
      })
    }, [])
  )

  const getContent = async () => {
    await setRefreshing(true)
    await projectContentStore.getProjectContent({ projectId: route.params.projectId })
    .then(async () => {
      let parsedInfo = await JSON.parse(JSON.stringify(projectContent[0].projectInfo))
      await setSingleRequestInfo(parsedInfo)
    })
    await setRefreshing(false)
  }

  const goToTable = (itemId) => navigation.navigate('projectTable', {
    projectId: route.params.projectId,
    requestId: itemId,
  })
  const openReqActions = (itemId) => {
    console.log(itemId)
  }

  const openMenu = (itemId) => setVisible(itemId)
  const closeMenu = () => setVisible('')

  const { isOpen, onOpen, onClose } = useDisclose()

  const mapStyle = []

  return (
    <Screen style={ROOT} preset="fixed" unsafe={true}>
      <GradientBackground colors={["#fff", "#fff" ]} />
      <PaperProvider>
        <NativeBaseProvider>
        <Box style={[ROWVPADDING]}>
          <Caption style={{textAlign: 'center'}}>
            <FlatList
              contentContainerStyle={FLAT_LIST}
              data={[...projectContent[0].requests]}
              keyExtractor={(item) => String(item.node.id)}
              renderItem={({ item }) => (
                <Menu
                  visible={visible === item.node.id}
                  onDismiss={closeMenu}
                  key={item.node.id}
                  anchor={
                    <View>
                      <TouchableOpacity onLongPress={() => openMenu(item.node.id)} onPress={() => goToTable(item.node.id)}>
                        <View style={LIST_CONTAINER}>
                          <Avatar
                            bg={color.primary}
                            style={IMAGE}
                          >
                            <Text style={{color: color.palette.white}}>
                              {item.node.category.name.slice(0, 1)}
                            </Text>
                          </Avatar>
                          <Text style={LIST_TEXT}>
                            {item.node.category.name} ({item.status})
                          </Text>
                        </View>
                      </TouchableOpacity>
                      <View style={{alignItems: 'center'}}>
                        <Divider style={{width: '90%'}} />
                      </View>
                    </View>
                  }>
                  <Menu.Item onPress={() => {}} title="Azione 1" />
                  <Menu.Item onPress={() => {}} title="Azione 2" />
                  <PaperDivider />
                  <Menu.Item onPress={() => {}} title="Azione 3" />
                </Menu>
              )}
            />
          </Caption>
          <Divider />
        </Box>
          <Actionsheet isOpen={isOpen} onClose={onClose}>
            <Actionsheet.Content>
              <Box w="100%" h={60} px={4} justifyContent="center">
                <Text
                  fontSize="16"
                  color="gray.500"
                  _dark={{
                    color: "gray.300",
                  }}
                >
                  ALLEGATI QUI
                </Text>
              </Box>
              <Actionsheet.Item>Allegato 1</Actionsheet.Item>
              <Actionsheet.Item>Allegato 2</Actionsheet.Item>
              <Actionsheet.Item>Allegato 3</Actionsheet.Item>
            </Actionsheet.Content>
          </Actionsheet>
        </NativeBaseProvider>
      </PaperProvider>
    </Screen>
  )
})


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', display: 'flex', flexDirection: 'row'},
  header: { height: 50, backgroundColor: '#537791' },
  text: { textAlign: 'center', fontWeight: '100' },
  dataWrapper: { marginTop: -1 },
  row: { height: 40, backgroundColor: '#E7E6E1' },
  button: {
    marginTop: 10,
    color: 'white',
    height: 40,
    backgroundColor: '#e64b11',
    borderRadius: 4,
    width: '40%'
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
})

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
  flex: 1,
}
const ROWHPADDING: ViewStyle = {
  paddingLeft: 15,
  paddingRight: 15
}
const ROWVPADDINGFIRST: ViewStyle = {
  paddingTop: 8,
  paddingBottom: 8
}
const ROWVPADDING: ViewStyle = {
  paddingBottom: 8
}
const FLAT_LIST: ViewStyle = {
  paddingHorizontal: spacing[1],
}
const LIST_CONTAINER: ViewStyle = {
  alignItems: "center",
  flexDirection: "row",
  padding: 10,
}
const IMAGE: ImageStyle = {
  borderRadius: 35,
  height: 65,
  width: 65,
}
const LIST_TEXT: TextStyle = {
  marginLeft: 10,
}
