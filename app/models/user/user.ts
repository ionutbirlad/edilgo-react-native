import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { maybe } from "mobx-state-tree/dist/internal"

/**
 * Model description here for TypeScript hints.
 */
export const UserModel = types
  .model("User")
  .props({
    builderId: types.identifier,
    // supplierId: types.maybe(types.identifier),
    isBuilder: types.boolean,
    businessName: types.string,
    builderAccessPermissions: types.string,
    supplierAccessPermissions: types.string,
    isVerified: types.boolean,
    isBoss: types.boolean,
    isFirstLogin: types.boolean,
    activeServices: types.map(types.frozen()),
    modalStatus: types.map(types.frozen()),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

type UserType = Instance<typeof UserModel>
export interface User extends UserType {}
type UserSnapshotType = SnapshotOut<typeof UserModel>
export interface UserSnapshot extends UserSnapshotType {}
export const createUserDefaultModel = () => types.optional(UserModel, {})
