import React,{ useState } from "react"
import { useFocusEffect } from '@react-navigation/native'
import { useStores } from "../../models"
import { observer } from "mobx-react-lite"
import { ViewStyle, Dimensions, StyleSheet } from "react-native"
import { Screen, GradientBackground } from "../../components"
import { color } from "../../theme"
import {
  Box,
  Heading,
  AspectRatio,
  Text,
  Center,
  HStack,
  Stack,
  NativeBaseProvider,
  Divider,
  WarningTwoIcon,
  HamburgerIcon,
  Pressable,
  VStack,
  Button
} from 'native-base'
import { SwipeListView } from 'react-native-swipe-list-view'

const FULL: ViewStyle = { 
  flex: 1,
  backgroundColor: color.palette.white,
}
const { width: screenWidth } = Dimensions.get('window')

export const ProjectsScreen = observer(function ProjectsScreen({navigation}: any) {
  const [refreshing, setRefreshing] = useState(false)
  // Pull in one of our MST stores
  const { projectStore } = useStores()
  const { projects } = projectStore
  const { loaderStore } = useStores()

  const [projectsList, setProjectsList] = useState<any>()

  useFocusEffect(
    React.useCallback(() => {
      getProjects()
    }, [])
  )

  const getProjects = async () => {
    await setRefreshing(true)
    await projectStore.getProjects()
    .then(() => {
      let filteredProjects = projects.filter(p => p.isSingleRequest === false)
      setProjectsList(filteredProjects)
    })
    await setRefreshing(false)
  }

  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  }

  const deleteRow = (rowMap, rowKey) => {
    closeRow(rowMap, rowKey)
    const newData = [...projectsList]
    const prevIndex = projectsList.findIndex((item) => item.key === rowKey)
    newData.splice(prevIndex, 1)
    setProjectsList(newData)
  }

  const onRowDidOpen = (rowKey) => {
    console.log('This row opened', rowKey)
  }

  const goToProject = (projectId: string) => {
    navigation.navigate('project', { projectId })
  }

  const renderItem = ({ item, index }) => (
    <Box overflow="hidden" width="100%" shadow={1} _light={{ backgroundColor: 'gray.50' }}
      _dark={{ backgroundColor: 'gray.700' }}>
      <Box>
        <AspectRatio ratio={16 / 9} style={{backgroundColor: '#213970'}}>
          <Center>
            <Box>
              <Text fontSize="50" color='white'>
                Progetto
              </Text>
            </Box>
          </Center>
        </AspectRatio>
        <Center bg="violet.500" _text={{ color: 'white', fontWeight: '700', fontSize: 'xs' }}
          position="absolute" bottom={0} px="3" py="1.5">
          Progetto
        </Center>
      </Box>
      <Stack p="4" space={3}>
        <Stack space={2}>
          <Heading size="md" ml="-1">
            {item.name}
          </Heading>
          <Text fontSize="xs" _light={{ color: 'gray.500' }} _dark={{ color: 'violet.300' }} fontWeight="500"
            ml="-0.5" mt="-1">
            {item.address}
          </Text>
        </Stack>
        <Text fontWeight="400" fontSize="12">
          Richieste create:
          {item.createdRequests}
        </Text>
        <Text fontWeight="400" fontSize="12">
          Richieste pubblicate:
          {item.sentRequests}
        </Text>
        <Text fontWeight="400" fontSize="12">
          Offerte ricevute:
          {item.receivedOffers}
        </Text>
        <Divider />
        <HStack alignItems="center" space={4} justifyContent="flex-end">
          <Button onPress={() => goToProject(item.id)} style={{backgroundColor: '#e64b11'}}>
            <Text color="white">Vedi progetto</Text>
          </Button>
        </HStack>
      </Stack>
    </Box>
  )

  const renderHiddenItem = (data, rowMap) => (
    <HStack flex="1" pl="2">
      <Pressable
        w="70"
        ml="auto"
        // cursor="pointer"
        bg="coolGray.200"
        justifyContent="center"
        onPress={() => closeRow(rowMap, data.item.key)}
        _pressed={{
          opacity: 0.5,
        }}>
        <VStack alignItems="center" space={2}>
        <HamburgerIcon color="black" size="xs"/>
          <Text fontSize="xs" fontWeight="medium" color="coolGray.800">
            More
          </Text>
        </VStack>
      </Pressable>
      <Pressable
        w="70"
        // cursor="pointer"
        bg="red.500"
        justifyContent="center"
        onPress={() => deleteRow(rowMap, data.item.key)}
        _pressed={{
          opacity: 0.5,
        }}>
        <VStack alignItems="center" space={2}>
          <WarningTwoIcon color="white" size="xs"/>
          <Text color="white" fontSize="xs" fontWeight="medium">
            Delete
          </Text>
        </VStack>
      </Pressable>
    </HStack>
  )

  return (
    <Screen style={FULL} preset="fixed" unsafe={true}>
      <NativeBaseProvider>
        <Box bg="white" safeArea flex="1">
          <SwipeListView
            data={projectsList}
            renderItem={renderItem}
            renderHiddenItem={renderHiddenItem}
            rightOpenValue={-130}
            previewRowKey={'0'}
            previewOpenValue={-40}
            previewOpenDelay={3000}
            onRowDidOpen={onRowDidOpen}
            keyExtractor={(item, index) => index.toString()}
          />
        </Box>
      </NativeBaseProvider>
    </Screen>
  )
})

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: '#FFF'
  },
})