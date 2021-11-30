import * as React from "react"
import { KeyboardAvoidingView, Platform, ScrollView, StatusBar, View, RefreshControl } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { ScreenProps } from "./screen.props"
import { isNonScrolling, offsets, presets } from "./screen.presets"
import Spinner from 'react-native-loading-spinner-overlay'
import { observer } from "mobx-react-lite"
import { useStores } from "../../models"

const isIos = Platform.OS === "ios"

const ScreenWithoutScrolling = observer(function ScreenWithoutScrolling(props: ScreenProps) {
  const { loaderStore } = useStores()
  const insets = useSafeAreaInsets()
  const preset = presets.fixed
  const style = props.style || {}
  const backgroundStyle = props.backgroundColor ? { backgroundColor: props.backgroundColor } : {}
  const insetStyle = { paddingTop: props.unsafe ? 0 : insets.top }
  
  return (
    <KeyboardAvoidingView
      style={[preset.outer, backgroundStyle]}
      behavior={isIos ? "padding" : undefined}
      keyboardVerticalOffset={offsets[props.keyboardOffset || "none"]}
    >
      <StatusBar barStyle={props.statusBar || "light-content"} />
      <View style={[preset.inner, style, insetStyle]}>
        {/* <Spinner
          visible={loaderStore.status === 'pending' ? true : false}
          // textContent={'Caricamento...'}
          textStyle={{color: '#FFF'}}
          animation="fade"
          overlayColor="#213970"
        /> */}
        {props.children}
      </View>
    </KeyboardAvoidingView>
  )
})

const ScreenWithScrolling = observer(function ScreenWithScrolling(props: ScreenProps) {
  const { loaderStore } = useStores()
  const insets = useSafeAreaInsets()
  const preset = presets.scroll
  const style = props.style || {}
  const backgroundStyle = props.backgroundColor ? { backgroundColor: props.backgroundColor } : {}
  const insetStyle = { paddingTop: props.unsafe ? 0 : insets.top }

  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout))
  }
  const [refreshing, setRefreshing] = React.useState(false)
  const onRefresh = React.useCallback(() => {
    setRefreshing(true)
    wait(2000).then(async () => setRefreshing(false))
  }, [])

  return (
    <KeyboardAvoidingView
      style={[preset.outer, backgroundStyle]}
      behavior={isIos ? "padding" : undefined}
      keyboardVerticalOffset={offsets[props.keyboardOffset || "none"]}
    >
      <StatusBar barStyle={props.statusBar || "light-content"} />
      <View style={[preset.outer, backgroundStyle, insetStyle]}>
        <ScrollView
          style={[preset.outer, backgroundStyle]}
          contentContainerStyle={[preset.inner, style]}
          keyboardShouldPersistTaps={props.keyboardShouldPersistTaps || "handled"}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
        >
          {/* <Spinner
            visible={loaderStore.status === 'pending' ? true : false}
            // textContent={'Caricamento...'}
            textStyle={{color: '#FFF'}}
            animation="fade"
            overlayColor="#213970"
          /> */}
          {props.children}
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  )
})

/**
 * The starting component on every screen in the app.
 *
 * @param props The screen props
 */
export function Screen(props: ScreenProps) {
  if (isNonScrolling(props.preset)) {
    return <ScreenWithoutScrolling {...props} />
  } else {
    return <ScreenWithScrolling {...props} />
  }
}
