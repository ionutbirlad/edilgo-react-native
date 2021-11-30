import React, { useState, useRef } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, StyleSheet, FlatList, View, TextStyle, ImageStyle, SafeAreaView } from "react-native"
import { Screen, GradientBackground, AutoImage as Image, } from "../../components"
import { color, spacing } from "../../theme"
import {
  Box,
  AspectRatio,
  Text,
  HStack,
  NativeBaseProvider,
  ScrollView,
  Divider,
  Actionsheet,
  useDisclose,
  Avatar
} from 'native-base'
import {
  Provider as PaperProvider,
  Button,
  Headline,
  Caption,
  Subheading,
} from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useFocusEffect } from '@react-navigation/native'
import { useStores } from "../../models"
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'

type RegionType = {
  latitude: Number,
  longitude: Number,
  latitudeDelta: Number,
  longitudeDelta: Number,
}

export const ProjectScreen = observer(function ProjectScreen({navigation, route}: any) {
  const [refreshing, setRefreshing] = useState(false)
  const { projectContentStore } = useStores()
  const { projectContent } = projectContentStore
  const [visible, setVisible] = React.useState(false)
  const [projectInfo, setProjectInfo] = React.useState<any>()
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
      await setProjectInfo(parsedInfo)
    })
    await setRefreshing(false)
  }

  const goToTable = () => navigation.navigate('singleRequestTable', {
    projectId: route.params.projectId
  })
  const goToRequests = () => navigation.navigate('projectRequests', {
    projectId: route.params.projectId
  })

  const { isOpen, onOpen, onClose } = useDisclose()

  const mapStyle = []

  return (
    <Screen style={ROOT} preset="fixed" unsafe={true}>
      <GradientBackground colors={["#fff", "#fff" ]} />
      <NativeBaseProvider>
      <AspectRatio ratio={18 / 9}>
      <MapView
        // provider={PROVIDER_GOOGLE}
        customMapStyle={mapStyle}
        style={styles.map}
        region={{
          latitude: Number(JSON.parse(JSON.stringify(projectContent[0].projectInfo)).latitude),
          longitude: Number(JSON.parse(JSON.stringify(projectContent[0].projectInfo)).longitude),
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        // onRegionChange={(region) => setRegion(region)}
      >
        <Marker
          coordinate={{
            latitude: Number(JSON.parse(JSON.stringify(projectContent[0].projectInfo)).latitude),
            longitude: Number(JSON.parse(JSON.stringify(projectContent[0].projectInfo)).longitude) 
          }}
          title='Posto'
          description='Il tuo posto'
        />
      </MapView>
        </AspectRatio>
        <ScrollView>
          <Box style={[ROWVPADDINGFIRST, ROWHPADDING]}>
            <Headline style={{color: 'black'}}>{JSON.parse(JSON.stringify(projectContent[0].projectInfo)).name}</Headline>
            <HStack>
              <Box style={{marginRight: 5, flexDirection:'row', alignItems:'center'}}>
                <Icon name="google-maps" size={15} color="black" />
              </Box>
              <Box style={{flexDirection:'row', alignItems:'center'}}>
                <Caption>{`${JSON.parse(JSON.stringify(projectContent[0].projectInfo)).address}, ${JSON.parse(JSON.stringify(projectContent[0].projectInfo)).city} (${JSON.parse(JSON.stringify(projectContent[0].projectInfo)).province})`}</Caption>
              </Box>
            </HStack>
            <Divider />
          </Box>
          <Box style={[ROWVPADDING, ROWHPADDING]}>
            <Subheading style={{color: 'black'}}>Descrizione</Subheading>
            <Caption style={{marginBottom: 10}}>{JSON.parse(JSON.stringify(projectContent[0].projectInfo)).description}</Caption>
            <Divider />
          </Box>
          <Box style={[ROWVPADDING, ROWHPADDING, {alignItems: "center"}]}>
            <Subheading style={{color: 'black', textAlign: 'center'}}>Richieste</Subheading>
            <Button style={[styles.button, {marginBottom: 15}]} onPress={goToRequests}>
              <Text style={{color: 'white'}}>
                Vai alle richieste
              </Text>
            </Button>
            <Divider />
          </Box>
          <Box style={[ROWVPADDING, ROWHPADDING]}>
            <Subheading style={{color: 'black', textAlign: 'center'}}>Allegati</Subheading>
            <Box style={{alignItems: "center"}}>
              <Button style={styles.button} onPress={onOpen}>
                <Text style={{color: 'white'}}>
                  Vedi allegati
                </Text>
              </Button>
            </Box>
          </Box>
        </ScrollView>
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
                Allegati
              </Text>
            </Box>
            {/* <FlatList
              contentContainerStyle={FLAT_LIST}
              data={[...projectInfo.attachmentsSet]}
              keyExtractor={(item) => String(item.node.id)}
              renderItem={({ item, index }) => (
                <View>
                  <Actionsheet.Item>
                    {projectInfo.attachmentsSet[index].node.name}
                  </Actionsheet.Item>
                </View>
              )}
            /> */}
            {/* {
              Array.from({ length: 4 }, (_, i) => (
                <Actionsheet.Item key={JSON.parse(JSON.stringify(projectContent[0].projectInfo)).attachmentsSet[i].node.id}>
                  <Text style={{color: color.primary}}>
                    {JSON.parse(JSON.stringify(projectContent[0].projectInfo)).attachmentsSet[i].node.name}
                  </Text>
                </Actionsheet.Item>
              ))
            } */}
            <Actionsheet.Item>
              <Text style={{color: color.primary}}>Allegato 1</Text>
            </Actionsheet.Item>
            <Actionsheet.Item>
              <Text style={{color: color.primary}}>Allegato 2</Text>
            </Actionsheet.Item>
            <Actionsheet.Item>
              <Text style={{color: color.primary}}>Allegato 3</Text>
            </Actionsheet.Item>
          </Actionsheet.Content>
        </Actionsheet>
      </NativeBaseProvider>
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
  paddingHorizontal: spacing[4],
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
