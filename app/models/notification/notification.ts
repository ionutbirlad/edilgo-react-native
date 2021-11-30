import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const NotificationModel = types
  .model("Notification")
  .props({
    id: types.string,
    sender: types.string,
    description: types.string,
    timestamp: types.frozen(),
    unread: types.boolean,
    offer: types.optional(types.string, '-'),
    hasNextPage: types.boolean,
    endCursor: types.string,
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

type NotificationType = Instance<typeof NotificationModel>
export interface Notification extends NotificationType {}
type NotificationSnapshotType = SnapshotOut<typeof NotificationModel>
export interface NotificationSnapshot extends NotificationSnapshotType {}
export const createNotificationDefaultModel = () => types.optional(NotificationModel, {})
