import React,{ useEffect, useState } from "react"
import { useFocusEffect } from '@react-navigation/native'
import { useStores } from "../../models"
import { observer } from "mobx-react-lite"
import { ViewStyle, Dimensions } from "react-native"
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
  ArrowForwardIcon,
  Flex
} from 'native-base'
import Carousel from 'react-native-snap-carousel'

const FULL: ViewStyle = { 
  flex: 1,
  backgroundColor: color.palette.white,
}
const { width: screenWidth } = Dimensions.get('window')

export const HomeScreen = observer(function HomeScreen({navigation}: any) {
  const [refreshing, setRefreshing] = useState(false)
  const [carouselIndex, setCarouselIndex] = useState(0)

  // Pull in one of our MST stores
  const { projectStore } = useStores()
  const { projects } = projectStore

  useFocusEffect(
    React.useCallback(() => {
      getProjects()
    }, [])
  )

  const getProjects = () => {
    setRefreshing(true)
    projectStore.getProjects()
    setRefreshing(false)
  }
  const _renderItem = ({ item, index }) => {
    return (
      <Box
        rounded="lg"
        overflow="hidden"
        width="72"
        shadow={1}
        _light={{ backgroundColor: 'gray.50' }}
        _dark={{ backgroundColor: 'gray.700' }}
      >
        <Box>
          <AspectRatio ratio={30 / 9}>
            <Image
              source={{
                uri:
                  'https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg',
              }}
              alt="image"
            />
          </AspectRatio>
        </Box>
        <Stack p="4" space={3}>
          <Stack space={2}>
            <Heading size="sm" ml="-1">
              {item.name}
            </Heading>
            <Text
              fontSize="xs"
              _light={{ color: 'violet.500' }}
              _dark={{ color: 'violet.300' }}
              fontWeight="500"
              ml="-0.5"
              mt="-1"
            >
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
        </Stack>
      </Box>
    )
  }
  const goToProjects = () => {
    navigation.navigate('allProjects')
  }
  const goToSingleRequests = () => {
    navigation.navigate('allSingleRequests')
  }
  const onlyProjects = projects.filter(p => p.isSingleRequest === false)
  const onlySingleRequests = projects.filter(p => p.isSingleRequest === true)

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen style={FULL} preset="scroll" unsafe={true}>
      <NativeBaseProvider>
        <ScrollView _contentContainerStyle={{
          minW: "72",
        }}>
          <GradientBackground colors={["#fff", "#e64b1190" ]} />
          <Center flex={1}>
            <Stack alignItems="center">
              <Box paddingY='3' width={screenWidth} display="flex" flexDirection="row" justifyContent="space-between">
                <Box w={screenWidth / 3}>
                  
                </Box>
                <Box w={screenWidth / 3}>
                  <Heading textAlign="center">Progetti</Heading>
                </Box>
                <Box w={screenWidth / 3} style={{justifyContent: 'center', paddingRight: 5}}>
                  <Text onPress={goToProjects} textAlign="right">{'vedi tutti >'}</Text>
                </Box>
              </Box>
              <Carousel
                layout={"stack"}
                data={onlyProjects.slice(0, 5)}
                sliderWidth={screenWidth}
                sliderHeight={screenWidth}
                itemWidth={screenWidth - 30}
                renderItem={_renderItem}
                onSnapToItem = { index => setCarouselIndex(index) } />
            </Stack>
          </Center>
          <Center flex={1}>
            <Stack alignItems="center">
              <Box paddingY='3' width={screenWidth} display="flex" flexDirection="row" justifyContent="space-between">
                <Box w="25%">
                  
                </Box>
                <Box w="50%">
                  <Heading textAlign="center">Richieste singole</Heading>
                </Box>
                <Box w="25%" style={{justifyContent: 'center', paddingRight: 5}}>
                  <Text onPress={goToSingleRequests} textAlign="right">{'vedi tutti >'}</Text>
                </Box>
              </Box>
              <Carousel
                layout={"stack"}
                data={onlySingleRequests.slice(0, 5)}
                sliderWidth={screenWidth}
                sliderHeight={screenWidth}
                itemWidth={screenWidth - 30}
                renderItem={_renderItem}
                onSnapToItem = { index => setCarouselIndex(index) } />
            </Stack>
          </Center>
          {/* <Center flex={1}>
            <Stack alignItems="center">
              <Heading textAlign="center" mb="3">
                Offerte
              </Heading>
              <Carousel
                layout={"stack"}
                data={projects}
                sliderWidth={screenWidth}
                sliderHeight={screenWidth}
                itemWidth={screenWidth - 30}
                renderItem={_renderItem}
                onSnapToItem = { index => setCarouselIndex(index) } />
            </Stack>
          </Center> */}
        </ScrollView>
      </NativeBaseProvider>
    </Screen>
  )
})
