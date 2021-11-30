// store-view.js
import * as React from 'react';
import { observer } from "mobx-react-lite"
import { useStores } from "../../models"
import { Screen } from ".."

export const StoreHelper = observer(function StoreHelper() {

  const { userStore } = useStores()
  return (
    <Screen preset="scroll">
    </Screen>
  )
})