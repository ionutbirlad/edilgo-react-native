import React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { Screen, Text } from "../../components"
import { color } from "../../theme"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
  flex: 1,
}

export const LoadingScreen = observer(function LoadingScreen() {

  return (
    <Screen style={ROOT} preset="scroll">
      <Text>
        CARICAMENTO...
      </Text>
    </Screen>
  )
})
