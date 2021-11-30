import React, { useState } from "react"
import { useFocusEffect } from '@react-navigation/native'
import { observer } from "mobx-react-lite"
import { ViewStyle, StyleSheet, Dimensions, TextStyle } from "react-native"
import { Screen, GradientBackground, Text } from "../../components"
import { color, typography } from "../../theme"
import { useStores } from "../../models"
import {
  Box,
  Heading,
  AspectRatio,
  Image,
  Center,
  HStack,
  Stack,
  NativeBaseProvider,
  Avatar,
  ScrollView,
  Divider,
  ArrowForwardIcon,
  Spacer,
  VStack,
} from 'native-base'
import Carousel from 'react-native-snap-carousel'
import Icon from 'react-native-vector-icons/FontAwesome'

const randomAvatar = require("./random_avatar.png")

export const DashboardScreen = observer(function DashboardScreen({navigation}: any) {
  /*
    LOGIC
  **/
  // Are we refreshing the data
  const [refreshing, setRefreshing] = useState(false)
  const [revenueOptions, setRevenueOptions] = useState([
    {
      id: "0",
      name: "",
    },
    {
      id: "1",
      name: "fino a €500k",
    },
    {
      id: "2",
      name: "€500k - €2M",
    },
    {
      id: "3",
      name: "€2M - €10M",
    },
    {
      id: "4",
      name: "€10M - €20M",
    },
    {
      id: "5",
      name: "più di €20M",
    },
  ])
  const [employeeOptions, setEmployeeOptions] = useState([
    {
      id: "0",
      name: "",
    },
    {
      id: "1",
      name: "1-5",
    },
    {
      id: "2",
      name: "6-20",
    },
    {
      id: "3",
      name: "21-50",
    },
    {
      id: "4",
      name: "superiore a 50",
    },
  ])
  const [carouselIndex, setCarouselIndex] = useState(0)
  
  // Pull in one of our MST stores
  const { userStore } = useStores()
  const { user } = userStore
  const { businessDataStore } = useStores()
  const { businessData } = businessDataStore
  const { businessStatsStore } = useStores()
  const { businessStats } = businessStatsStore
  const { notificationStore } = useStores()
  const { notifications } = notificationStore
  
  useFocusEffect(
    React.useCallback(() => {
      async function makeApiCalls() {
        await getBusinessData()
        await getBusinessStats()
        await getNotifications()
      }
      makeApiCalls()
    }, [])
  )

  const getBusinessData = () => {
    setRefreshing(true)
    businessDataStore.getBusinessData({
      email: 'fonzini@fonzini.it',
    })
    setRefreshing(false)
  }
  const getBusinessStats = () => {
    setRefreshing(true)
    businessStatsStore.getBusinessStats({
      email: 'fonzini@fonzini.it',
    })
    setRefreshing(false)
  }
  const getNotifications = () => {
    setRefreshing(true)
    notificationStore.getNotifications()
    setRefreshing(false)
  }

  const { width: screenWidth } = Dimensions.get('window')
  const SLIDER_WIDTH = Dimensions.get('window').width
  const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7)
  const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 3 / 4)
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
            <Heading size="md" ml="-1">
              {item.project_name}
            </Heading>
            <Text
              style={TEXT}
            >
              {item.category}
            </Text>
          </Stack>
          <HStack>
            <Text
              style={TEXT}
              tx="dashboardScreen.card.budget"
            />
            <Text
              style={TEXT}
            >
              {item.budget}
            </Text>
          </HStack>
          <HStack>
            <Text
              style={TEXT}
              tx="dashboardScreen.card.expiration"
            />
            <Text
              style={TEXT}
            >
              {item.deadline}
            </Text>
          </HStack>
        </Stack>
      </Box>
    )
  }
  
  const goToProfile = () => navigation.navigate("profile")

  /*
    TEMPLATE
  **/
  return (
    <Screen style={FULL} preset="scroll" unsafe={true}>
      <NativeBaseProvider>
        <ScrollView _contentContainerStyle={{
          px: "5px",
          mb: "4",
          minW: "72",
        }}>
          <GradientBackground colors={["#fff", "#e64b11" ]} />
          <NativeBaseProvider>
            <Box rounded="lg" overflow="hidden" width="100%" shadow={1} _light={{ backgroundColor: 'gray.50' }}
              _dark={{ backgroundColor: 'gray.700' }}>
              <Box>
                <AspectRatio ratio={21 / 9}>
                  <Image source={{
                    uri:
                      'https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg',
                  }} alt="image" />
                </AspectRatio>
                <Center bg="#223970" _text={{ color: 'white', fontWeight: '700', fontSize: 'xs' }} position="absolute"
                  bottom={0} px="3" py="1.5">
                  <Text
                    style={WHITETEXT}
                  >
                    {user[0].businessName}
                  </Text>
                </Center>
              </Box>
              <Stack p="4" space={3}>
                <Stack space={1}>
                  <Text tx="dashboardScreen.revenue" style={[HEADING, {fontWeight: '500'}]} />
                  <Text
                    style={SUBHEADING}
                  >
                    {revenueOptions.find(r => r.id === businessData[0].revenueInt.toString()).name}
                  </Text>
                  <Text tx="dashboardScreen.empNum" style={[HEADING, {fontWeight: '500'}]} />
                  <Text
                    style={SUBHEADING}
                  >
                    {employeeOptions.find(e => e.id === businessData[0].employeesInt.toString()).name}
                  </Text>
                </Stack>
                <HStack alignItems="center" space={4} justifyContent="space-between">
                  <HStack alignItems="center">
                    <Text
                      style={PRIMARYTEXT}
                      tx="dashboardScreen.navigateToProfile"
                      onPress={goToProfile}
                    />
                    <ArrowForwardIcon style={{color: "#e64b11"}} size="4" />
                  </HStack>
                </HStack>
              </Stack>
            </Box>
          </NativeBaseProvider>
          <NativeBaseProvider>
            <Box bg='white' p="5" mt='4' rounded="xl" _text={{
            fontSize: 'md',
            fontWeight: 'medium',
            color: 'black',
            textAlign: 'center',
          }}>
            <HStack space={3} alignItems="center" justifyContent="space-between">
            <Box>
                <Text
                  style={HEADING}
                  tx="dashboardScreen.reqSent"
                />
                <Text
                  style={SUBHEADING}
                >
                  {businessStats[0].requestsSent}
                </Text>
              </Box>
              <Box>
                <Avatar bg="#fff">
                  <Icon name="rocket" size={30} color="#223970" />
                </Avatar>
              </Box>
            </HStack>
            </Box>
            <Box bg='white' p="5" mt='4' rounded="xl" _text={{
              fontSize: 'md',
              fontWeight: 'medium',
              color: 'black',
              textAlign: 'center',
            }}>
              <HStack space={3} alignItems="center" justifyContent="space-between">
               <Box>
                  <Text
                    style={HEADING}
                    tx="dashboardScreen.ongoingProjects"
                  />
                  <Text
                    style={SUBHEADING}
                  >
                    {businessStats[0].currentProjects}
                  </Text>
                </Box>
                <Box>
                  <Avatar bg="#fff">
                    <Icon name="spinner" size={30} color="#223970" />
                  </Avatar>
                </Box>
              </HStack>
            </Box>
            <Box bg='white' p="5" mt='4' rounded="xl" _text={{
              fontSize: 'md',
              fontWeight: 'medium',
              color: 'black',
              textAlign: 'center',
            }}>
              <HStack space={3} alignItems="center" justifyContent="space-between">
                <Box>
                  <Text
                    style={HEADING}
                    tx="dashboardScreen.activeOffers"
                  />
                  <Text
                    style={SUBHEADING}
                  >
                    {businessStats[0].activeOffers}
                  </Text>
                </Box>
                <Box>
                  <Avatar bg="#fff">
                    <Icon name="gear" size={30} color="#223970" />
                  </Avatar>
                </Box>
              </HStack>
            </Box>
            <Box overflow="hidden" height="500" bg='white' p="5" mt='4' rounded="xl" _text={{
              fontSize: 'md',
              fontWeight: 'medium',
              color: 'black',
              textAlign: 'center',
            }}>
              <Stack space={3} >
                <Text
                  style={[HEADING, {textAlign: 'center', fontWeight: 'bold'}]}
                  tx="dashboardScreen.notifications"
                />
                {
                  Array.from({ length: 4 }, (_, i) => (
                    <Box
                      borderBottomWidth="1"
                      _dark={{
                        borderColor: "gray.600",
                      }}
                      borderColor="coolGray.200"
                      py="2"
                      key={notifications[i].id}
                    >
                      <HStack space={3} justifyContent="space-between">
                        <Avatar
                          size="48px"
                          source={{
                            uri: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
                          }}
                        />
                        <VStack>
                          <Text style={TEXT}>
                            {notifications[i].sender}
                          </Text>
                          <Text style={TEXT}>
                            {notifications[i].description}
                          </Text>
                        </VStack>
                        <Spacer />
                        <Text style={TEXT}>
                          {notifications[i].timestamp}
                        </Text>
                      </HStack>
                    </Box>
                  ))
                }
              </Stack>
            </Box>
            <Box bg='white' p="5" mt='4' rounded="xl" _text={{
              fontSize: 'md',
              fontWeight: 'medium',
              color: 'black',
              textAlign: 'center',
            }}>
              <Stack space={3} alignItems="center">
                <Text
                  style={[HEADING, { fontWeight: 'bold' }]}
                  tx="dashboardScreen.collaborators"
                />
                <Divider />
                <HStack style={{width: '100%'}} space={3} alignItems="center" justifyContent="space-between">
                  <Box _text={{
                    textAlign: 'left'
                  }}>
                  <Avatar
                    bg="amber.500"
                    source={randomAvatar}
                  >
                    AK
                  </Avatar>
                  </Box>
                  <Box>Luca Pellegrini</Box>
                  <Box>Responsabile acquisti</Box>
                </HStack>
                <Divider />
                <HStack style={{width: '100%'}} space={3} alignItems="center" justifyContent="space-between">
                  <Box _text={{
                    textAlign: 'left'
                  }}>
                  <Avatar
                    bg="amber.500"
                    source={randomAvatar}
                  >
                    AK
                  </Avatar>
                  </Box>
                  <Box>Antonio Perolari</Box>
                  <Box>In attesa di conferma</Box>
                </HStack>
                <Divider />
                <HStack style={{width: '100%'}} space={3} alignItems="center" justifyContent="space-between">
                  <Box _text={{
                    textAlign: 'left'
                  }}>
                  <Avatar
                    bg="amber.500"
                    source={randomAvatar}
                  >
                    AK
                  </Avatar>
                  </Box>
                  <Box _text={{
                    textAlign: 'left'
                  }}>Gianluca Girardi</Box>
                  <Box _text={{
                    textAlign: 'left'
                  }}>Amministratore</Box>
                </HStack>
                <Divider />
              </Stack>
            </Box>
            <Box bg='white' p="5" mt='4' rounded="xl" _text={{
              fontSize: 'md',
              fontWeight: 'medium',
              color: 'black',
              textAlign: 'center',
            }}>
              <Stack space={3} alignItems="center">
                <Text
                  style={[HEADING, { fontWeight: 'bold' }]}
                  tx="dashboardScreen.suppliers"
                />
                <Divider />
                <HStack style={{width: '100%'}} space={3} alignItems="center" justifyContent="space-between">
                  <Box>Fornitore srl</Box>
                  <Box>a sociale</Box>
                </HStack>
                <Divider />
                <HStack style={{width: '100%'}} space={3} alignItems="center" justifyContent="space-between">
                  <Box>b sociale</Box>
                  <Box>...</Box>
                </HStack>
                <Divider />
              </Stack>
            </Box>
            <Box bg='white' p="5" mt='4' rounded="xl" _text={{
              fontSize: 'md',
              fontWeight: 'medium',
              color: 'black',
              textAlign: 'center',
              width: '100%'
            }}>
              <Stack space={3}>
                <Text
                  style={[HEADING, { fontWeight: 'bold', textAlign: 'center' }]}
                  tx="dashboardScreen.latestReq"
                />
                <Carousel
                  layout={"stack"}
                  data={businessStats[0].latestRequests}
                  sliderWidth={screenWidth}
                  sliderHeight={screenWidth}
                  itemWidth={screenWidth - 30}
                  renderItem={_renderItem}
                  onSnapToItem = { index => setCarouselIndex(index) } />
              </Stack>
            </Box>
          </NativeBaseProvider>
        </ScrollView>
      </NativeBaseProvider>
    </Screen>
  )
})

/*
  STYLE
**/
const FULL: ViewStyle = { 
  flex: 1,
  backgroundColor: color.palette.white,
}
const TEXT: TextStyle = {
  color: color.palette.black,
  fontFamily: typography.primary,
}
const WHITETEXT: TextStyle = {
  ...TEXT,
  color: color.whiteText,
}
const PRIMARYTEXT: TextStyle = {
  ...TEXT,
  color: color.primary,
}
const HEADING: TextStyle = {
  ...TEXT,
  fontSize: 20
}
const SUBHEADING: TextStyle = {
  ...TEXT,
  fontSize: 14,
  marginTop: 5
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  text: { margin: 6 },
  carouselContainer: {
    marginTop: 50
  },
  itemContainer: {
    width: 35,
    height: 23,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'dodgerblue'
  },
  itemLabel: {
    color: 'white',
    fontSize: 24
  },
  counter: {
    marginTop: 25,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center'
  }
})
