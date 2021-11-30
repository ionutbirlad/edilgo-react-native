import { Instance, SnapshotOut, types, flow } from "mobx-state-tree"
import { withStatus } from '../extensions/with-status'

/**
 * Model description here for TypeScript hints.
 */
export const LoaderStoreModel = types
  .model("LoaderStore")
  .props({})
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .extend(withStatus)

type LoaderStoreType = Instance<typeof LoaderStoreModel>
export interface LoaderStore extends LoaderStoreType {}
type LoaderStoreSnapshotType = SnapshotOut<typeof LoaderStoreModel>
export interface LoaderStoreSnapshot extends LoaderStoreSnapshotType {}
export const createLoaderStoreDefaultModel = () => types.optional(LoaderStoreModel, {})
