import React, { FC } from "react"
import { View, ViewStyle, TextStyle, ImageStyle, SafeAreaView } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import {
  Header,
  Screen,
  GradientBackground,
  AutoImage as Image,
} from "../../components"
import { color, spacing, typography } from "../../theme"
import { NavigatorParamList } from "../../navigators"
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import {
  NativeBaseProvider,
  Box,
  Text,
  Heading,
  VStack,
  FormControl,
  Input,
  Link,
  Button,
  Icon,
  IconButton,
  HStack,
  Divider,
} from 'native-base';

const edilgoLogo = require("./edilgo-logo.png")

const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
  paddingHorizontal: spacing[4],
}
const TEXT: TextStyle = {
  color: color.palette.white,
  fontFamily: typography.primary,
}
const BOLD: TextStyle = { fontWeight: "bold" }
const HEADER: TextStyle = {
  paddingTop: spacing[3],
  paddingBottom: spacing[4] + spacing[1],
  paddingHorizontal: 0,
}
const HEADER_TITLE: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 12,
  lineHeight: 15,
  textAlign: "center",
  letterSpacing: 1.5,
}
const TITLE_WRAPPER: TextStyle = {
  ...TEXT,
  textAlign: "center",
}
const TITLE: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 28,
  lineHeight: 38,
  textAlign: "center",
}
const ALMOST: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 26,
  fontStyle: "italic",
}
const EDILGO: ImageStyle = {
  alignSelf: "center",
  marginVertical: spacing[5],
  maxWidth: "100%",
  width: 250,
  height: 100,
}
const CONTENT: TextStyle = {
  ...TEXT,
  color: "#BAB6C8",
  fontSize: 15,
  lineHeight: 22,
  marginBottom: spacing[5],
}
const CONTINUE: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
  backgroundColor: color.palette.deepPurple,
}
const CONTINUE_TEXT: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 13,
  letterSpacing: 2,
}
const FOOTER: ViewStyle = { backgroundColor: "#20162D" }
const FOOTER_CONTENT: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
}

export const RegisterScreen: FC<StackScreenProps<NavigatorParamList, "register">> = observer(
  ({ navigation }) => {
    const nextScreen = () => navigation.navigate("demo")
    const goToLogin = () => navigation.navigate("login")

    return (
      <View testID="RegisterScreen" style={FULL}>
        <GradientBackground colors={["#42244390", "#e64b11"]} />
        <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
        <Image source={edilgoLogo} style={EDILGO} />
        <NativeBaseProvider>
          <Box safeArea flex={1} p="2" py="8" w="90%" mx="auto">
            <Heading size="lg" fontWeight="600" color="white">
              Benvenuto
            </Heading>
            <Heading mt="1" color="white" fontWeight="medium" size="xs">
              Accedi per poter continuare!
            </Heading>

            <VStack space={3} mt="5">
              <FormControl>
                <FormControl.Label
                  _text={{
                    color: 'white',
                    fontSize: 'xs',
                    fontWeight: 500,
                  }}>
                  Email
                </FormControl.Label>
                <Input />
              </FormControl>
              <FormControl>
                <FormControl.Label
                  _text={{
                    color: 'white',
                    fontSize: 'xs',
                    fontWeight: 500,
                  }}>
                  Password
                </FormControl.Label>
                <Input type="password" />
                <Link
                  _text={{ fontSize: 'xs', fontWeight: '500', color: 'indigo.500' }}
                  alignSelf="flex-end"
                  mt="1">
                  Forget Password?
                </Link>
              </FormControl>
              <Button mt="2" colorScheme="indigo" _text={{ color: 'white' }}>
              Registrati
              </Button>
              <HStack mt="6" justifyContent="center">
                <Text fontSize="sm" color="white" fontWeight={400}>
                  Sono un nuovo utente.{' '}
                </Text>
                <Link
                  _text={{
                    color: 'indigo.500',
                    fontWeight: 'medium',
                    fontSize: 'sm',
                  }}
                  href="#"
                  onPress={goToLogin}>
                  Registrati
                </Link>
              </HStack>
            </VStack>
          </Box>
        </NativeBaseProvider>
        </Screen>
        {/* <SafeAreaView style={FOOTER}>
          <View style={FOOTER_CONTENT}>
            <Button
              testID="next-screen-button"
              style={CONTINUE}
              textStyle={CONTINUE_TEXT}
              tx="loginScreen.continue"
              onPress={nextScreen}
            />
          </View>
        </SafeAreaView> */}
      </View>
    )
  },
)