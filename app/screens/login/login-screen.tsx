import React, { FC, useLayoutEffect } from "react"
import { View, ViewStyle, ImageStyle, TextInput, StyleSheet } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import {
  Screen,
  GradientBackground,
  AutoImage as Image,
} from "../../components"
import { color, spacing } from "../../theme"
import { NavigatorParamList } from "../../navigators"
import {
  NativeBaseProvider,
  Box,
  Text,
  Heading,
  VStack,
  Button,
} from 'native-base'
import { useStores } from "../../models"
import { useForm, Controller } from "react-hook-form"
import Spinner from 'react-native-loading-spinner-overlay'

const edilgoLogo = require("./edilgo-logo.png")

const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
  // paddingHorizontal: spacing[4],
}
const FORMCONTAINER: ViewStyle = {
  borderTopLeftRadius: 50,
  borderTopRightRadius: 50,
  backgroundColor: 'white',
  height: 650,
}
const EDILGO: ImageStyle = {
  alignSelf: "center",
  marginVertical: spacing[5],
  maxWidth: "100%",
  width: 250,
  height: 100,
}

type FormData = {
  email: string,
  password: string
}

export const LoginScreen: FC<StackScreenProps<NavigatorParamList, "login">> = observer(() => {

  const { control, handleSubmit, formState: { errors } } = useForm<FormData>()
  const { authenticationStore } = useStores()
  
  useLayoutEffect(() => {
    return () => authenticationStore.resetStatus()
  }, [authenticationStore])

  const onLogin = async (data: FormData) => {
    await authenticationStore.login({
      email: data.email,
      password: data.password
    })
  }

  return (
    <View testID="LoginScreen" style={FULL}>
      <Spinner
        visible={authenticationStore.status === 'pending' ? true : false}
        textContent={'Caricamento...'}
        textStyle={styles.spinnerTextStyle}
        animation="fade"
        overlayColor="#213970"
        customIndicator={<Image source={edilgoLogo} style={EDILGO} />}
      />
      <GradientBackground colors={["#42244390", "#e64b11"]} />
      <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
      <Image source={edilgoLogo} style={EDILGO} />
      <NativeBaseProvider>
        <View style={FORMCONTAINER}>
          <Box safeArea flex={1} p="2" py="8" w="90%" mx="auto">
            <Heading size="lg" fontWeight="600" color="black">
              Benvenuto
            </Heading>
            <Heading mt="1" color="black" fontWeight="medium" size="xs">
              Accedi per poter continuare!
            </Heading>
            <VStack space={3} mt="5">
              <Controller
                control={control}
                rules={{
                required: true,
              }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={styles.input}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
                name="email"
                defaultValue="fonzini@fonzini.it"
              />
              {errors.email && <Text style={{color: 'red'}}>La mail e necesasria.</Text>}

              <Controller
                control={control}
                rules={{
                maxLength: 100,
                required: true,
              }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={styles.input}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
                name="password"
                defaultValue="fonzini2020"
              />
              {errors.password && <Text style={{color: 'red'}}>La password e necessaria.</Text>}
              <Button style={styles.button} onPress={handleSubmit(onLogin)}>
                <Text style={{color: 'white'}}>
                  Accedi
                </Text>
              </Button>
            </VStack>
          </Box>
        </View>
      </NativeBaseProvider>
      </Screen>
    </View>
  )

  }
)

const styles = StyleSheet.create({
  label: {
    color: 'black',
    margin: 20,
    marginLeft: 0,
  },
  button: {
    marginTop: 40,
    color: 'white',
    height: 40,
    backgroundColor: '#e64b11',
    borderRadius: 4,
  },
  input: {
    backgroundColor: 'white',
    borderColor: 'black',
    height: 40,
    padding: 10,
    borderRadius: 4,
    borderWidth: 1
  },
  spinnerTextStyle: {
    color: '#FFF'
  },
});