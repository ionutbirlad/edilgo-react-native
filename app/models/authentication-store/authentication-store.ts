import { Instance, SnapshotOut, types, flow } from "mobx-state-tree"
import { withStatus } from '../extensions/with-status'
import { withRootStore } from '../extensions/with-root-store'
import { withEnvironment } from '../extensions/with-environment'
import { GetUserResult } from "../../services/api/api.types"

/**
 * Model description here for TypeScript hints.
 */
export const AuthenticationStoreModel = types
  .model("AuthenticationStore")
  .props({
    isAuthenticated: types.optional(types.boolean, false)
  })
  .extend(withEnvironment)
  .extend(withRootStore)
  .extend(withStatus)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    setAuthenticated(value: boolean) {
      self.isAuthenticated = value
    }
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({
    login: flow(function*(payload) {
      self.setStatus('pending')
      try {
        const result: GetUserResult = yield self.environment.api.fetchUser(payload)
        if (result.kind === "ok") {
          self.setStatus('done')
          self.setAuthenticated(true)
          self.rootStore.userStore.saveUser(result.user)
        }
      } catch (error) {
        __DEV__ && console.tron.log(error)
      }
    }),
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({
    reset: () => {
      self.isAuthenticated = false
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

type AuthenticationStoreType = Instance<typeof AuthenticationStoreModel>
export interface AuthenticationStore extends AuthenticationStoreType {}
type AuthenticationStoreSnapshotType = SnapshotOut<typeof AuthenticationStoreModel>
export interface AuthenticationStoreSnapshot extends AuthenticationStoreSnapshotType {}
export const createAuthenticationStoreDefaultModel = () => types.optional(AuthenticationStoreModel, {})
