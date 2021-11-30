import { Instance, SnapshotOut, types, flow } from "mobx-state-tree"
import { withEnvironment } from '../extensions/with-environment'
import { withRootStore } from '../extensions/with-root-store'
import { NotificationSnapshot, NotificationModel, Notification } from "../../models/notification/notification"
import { GetNotificationsResult } from "../../services/api/api.types"
import RNSInfo from "react-native-sensitive-info"

/**
 * Model description here for TypeScript hints.
 */
export const NotificationStoreModel = types
  .model("NotificationStore")
  .props({
    notifications: types.optional(types.array(NotificationModel), []),
  })
  .extend(withEnvironment)
  .extend(withRootStore)
  .views(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({
    saveNotifications: (notificationSnapshots: NotificationSnapshot[]) => {
      const notificationModels: Notification[] = notificationSnapshots.map(n => NotificationModel.create(n))
      self.notifications.replace(notificationModels) // Replace the existing data with the new data
    },
  }))
  .actions(self => ({
    getNotifications: flow(function*() {
      self.rootStore.loaderStore.setStatus('pending')
      try {
        /**
         * set auth header in apiSauce.
         */
        yield RNSInfo.getItem('edilgoToken', {
          keychainService: 'myKeychain'
        }).then(t => {
          self.environment.api.apisauce.setHeader('Authorization', `JWT ${t}`)
        })

        const result: GetNotificationsResult = yield self.environment.api.fetchNotifications({
          email: 'fonzini@fonzini.it'
        })

        if (result.kind === "ok") {
          self.saveNotifications(result.notifications)
        }
        self.rootStore.loaderStore.setStatus('done')
      } catch (e) {
        self.rootStore.loaderStore.setStatus('error')
        __DEV__ && console.tron.log(e)
      }
    }),
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

type NotificationStoreType = Instance<typeof NotificationStoreModel>
export interface NotificationStore extends NotificationStoreType {}
type NotificationStoreSnapshotType = SnapshotOut<typeof NotificationStoreModel>
export interface NotificationStoreSnapshot extends NotificationStoreSnapshotType {}
export const createNotificationStoreDefaultModel = () => types.optional(NotificationStoreModel, {})
