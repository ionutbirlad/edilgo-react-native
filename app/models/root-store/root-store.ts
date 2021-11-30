import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { LoaderStoreModel } from "../loader-store/loader-store"
import { CharacterStoreModel } from "../character-store/character-store"
import { AuthenticationStoreModel } from "../authentication-store/authentication-store"
import { UserStoreModel } from "../user-store/user-store"
import { BusinessDataStoreModel } from "../business-data-store/business-data-store"
import { BusinessStatsStoreModel } from "../business-stats-store/business-stats-store"
import { ProjectStoreModel, ProjectStore } from "../project-store/project-store"
import { ProjectContentStoreModel } from "../project-content-store/project-content-store"
import { NotificationStoreModel, NotificationStore } from "../notification-store/notification-store"

/**
 * A RootStore model.
 */
// prettier-ignore
export const RootStoreModel = types.model("RootStore").props({
  loaderStore: types.optional(LoaderStoreModel, {} as any),
  characterStore: types.optional(CharacterStoreModel, {} as any),
  // userStore: types.optional(UserStoreModel, {} as UserStore),
  userStore: types.optional(UserStoreModel, {} as any),
  businessDataStore: types.optional(BusinessDataStoreModel, {} as any),
  businessStatsStore: types.optional(BusinessStatsStoreModel, {} as any),
  authenticationStore: types.optional(AuthenticationStoreModel, {} as any),
  projectStore: types.optional(ProjectStoreModel, {} as ProjectStore),
  projectContentStore: types.optional(ProjectContentStoreModel, {} as any),
  notificationStore: types.optional(NotificationStoreModel, {} as NotificationStore),
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
