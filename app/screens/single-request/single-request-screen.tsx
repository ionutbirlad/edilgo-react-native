import React, { useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, StyleSheet } from "react-native"
import { Screen, GradientBackground } from "../../components"
import { color } from "../../theme"
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
} from 'native-base'
import {
  Provider as PaperProvider,
  Button,
  Headline,
  Caption,
  Subheading,
  Paragraph
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

export const SingleRequestScreen = observer(function SingleRequestScreen({navigation, route}: any) {
  const [refreshing, setRefreshing] = useState(false)
  const { projectContentStore } = useStores()
  const { projectContent } = projectContentStore
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

  const goToTable = () => navigation.navigate('singleRequestTable', {
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
          <Box style={[ROWVPADDING, ROWHPADDING]}>
            <HStack>
              <Box style={{marginRight: 15, flexDirection:'row', alignItems:'center'}}>
                <Icon name="wall" size={26} color="black" />
              </Box>
              <Box>
                <Paragraph>Categoria</Paragraph>
                <Caption>
                  {JSON.parse(JSON.stringify(projectContent[0].requests[0].node.category.name))}
                </Caption>
              </Box>
            </HStack>
          </Box>
          <Box style={[ROWVPADDING, ROWHPADDING]}>
            <HStack>
              <Box style={{marginRight: 15, flexDirection:'row', alignItems:'center'}}>
                <Icon name="clock-end" size={26} color="black" />
              </Box>
              <Box>
                <Paragraph>Scadenza</Paragraph>
                <Caption>
                  {JSON.parse(JSON.stringify(projectContent[0].requests[0].node.deadline))}
                </Caption>
              </Box>
            </HStack>
          </Box>
          <Box style={[ROWVPADDING, ROWHPADDING]}>
            <HStack>
              <Box style={{marginRight: 15, flexDirection:'row', alignItems:'center'}}>
                <Icon name="currency-eur" size={26} color="black" />
              </Box>
              <Box>
                <Paragraph>Fatturato richiesto</Paragraph>
                <Caption>
                  {JSON.parse(JSON.stringify(projectContent[0].requests[0].node.filterRevenue))}
                </Caption>
              </Box>
            </HStack>
          </Box>
          <Box style={[ROWVPADDING, ROWHPADDING]}>
            <HStack>
              <Box style={{marginRight: 15, flexDirection:'row', alignItems:'center'}}>
                <Icon name="map-marker-distance" size={26} color="black" />
              </Box>
              <Box>
                <Paragraph>Distanza massima cantiere</Paragraph>
                <Caption>
                  {
                    JSON.parse(JSON.stringify(projectContent[0].requests[0].node.filterDistance)) === 32767 ?
                      'Distanza massima':
                      JSON.parse(JSON.stringify(projectContent[0].requests[0].node.filterDistance))
                  }
                </Caption>
              </Box>
            </HStack>
            <Divider />
          </Box>
          <Box style={[ROWVPADDING, ROWHPADDING]}>
            <Subheading style={{color: 'black', textAlign: 'center'}}>Stato richiesta</Subheading>
            <Caption style={{marginBottom: 10, textAlign: 'center'}}>STATO RICHIESTA QUI</Caption>
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
          <Box style={[ROWVPADDING, ROWHPADDING]}>
            <Subheading style={{color: 'black', textAlign: 'center'}}>Voci</Subheading>
              <Box style={{alignItems: "center"}}>
                <Button style={styles.button} onPress={goToTable}>
                  <Text style={{color: 'white'}}>
                    Vedi computo
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
                ALLEGATI QUI
              </Text>
            </Box>
            <Actionsheet.Item>Allegato 1</Actionsheet.Item>
            <Actionsheet.Item>Allegato 2</Actionsheet.Item>
            <Actionsheet.Item>Allegato 3</Actionsheet.Item>
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
