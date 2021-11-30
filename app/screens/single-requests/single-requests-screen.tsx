import React,{ useEffect, useState } from "react"
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
  Image,
  Text,
  Center,
  HStack,
  Stack,
  NativeBaseProvider,
  Avatar,
  ScrollView,
  Divider,
  WarningTwoIcon,
  HamburgerIcon,
  Flex,
  FlatList,
  Pressable,
  IconButton,
  Icon,
  VStack,
  Spacer,
  Button
} from 'native-base'
import { SwipeListView } from 'react-native-swipe-list-view'

const FULL: ViewStyle = { 
  flex: 1,
  backgroundColor: color.palette.white,
}
const { width: screenWidth } = Dimensions.get('window')

export const SingleRequestsScreen = observer(function SingleRequestsScreen({navigation}: any) {
  const [refreshing, setRefreshing] = useState(false)
  const { projectStore } = useStores()
  const { projects } = projectStore
  const [singleRequestsList, setSingleRequestsList] = useState<any>()

  useFocusEffect(
    React.useCallback(() => {
      getSingleRequests()
    }, [])
  )

  const getSingleRequests = async () => {
    await setRefreshing(true)
    await projectStore.getProjects()
    .then(() => {
      let filteredSingleRequests = projects.filter(p => p.isSingleRequest === true)
      setSingleRequestsList(filteredSingleRequests)
    })
    await setRefreshing(false)
  }

  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const deleteRow = (rowMap, rowKey) => {
    closeRow(rowMap, rowKey);
    const newData = [...singleRequestsList];
    const prevIndex = singleRequestsList.findIndex((item) => item.key === rowKey);
    newData.splice(prevIndex, 1);
    setSingleRequestsList(newData);
  };

  const onRowDidOpen = (rowKey) => {
    console.log('This row opened', rowKey);
  };

  const goToSingleRequest = (projectId: string) => {
    navigation.navigate('singleRequest', { projectId: projectId })
  }

  const renderItem = ({ item, index }) => (
    <Box overflow="hidden" width="100%" shadow={1} _light={{ backgroundColor: 'gray.50' }}
      _dark={{ backgroundColor: 'gray.700' }}>
      <Box>
        <AspectRatio style={{backgroundColor: '#213970'}} ratio={16 / 9}>
          <Center>
            <Box>
              <Text fontSize="50" color='white'>
                Richiesta singola
              </Text>
            </Box>
          </Center>
        </AspectRatio>
        <Center bg="violet.500" _text={{ color: 'white', fontWeight: '700', fontSize: 'xs' }}
          position="absolute" bottom={0} px="3" py="1.5">
          Richiesta singola
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
          <Button onPress={() => goToSingleRequest(item.id)} style={{backgroundColor: '#e64b11'}}>
            <Text color="white">Vedi richiesta</Text>
          </Button>
        </HStack>
      </Stack>
    </Box>
  );

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
          {/* <Icon
            as={<Entypo name="dots-three-horizontal" />}
            size="xs"
            color="coolGray.800"
          /> */}
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
          {/* <Icon as={<MaterialIcons name="delete" />} color="white" size="xs" /> */}
          <WarningTwoIcon color="white" size="xs"/>
          <Text color="white" fontSize="xs" fontWeight="medium">
            Delete
          </Text>
        </VStack>
      </Pressable>
    </HStack>
  );

  return (
    <Screen style={FULL} preset="fixed" unsafe={true}>
      <NativeBaseProvider>
      <Box bg="white" safeArea flex="1">
        <SwipeListView
          data={singleRequestsList}
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
  
})
