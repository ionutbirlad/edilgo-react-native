import { Instance, SnapshotOut, types, flow } from "mobx-state-tree"
import { withEnvironment } from '../extensions/with-environment'
import { UserSnapshot, UserModel, User } from "../../models/user/user"

/**
 * Model description here for TypeScript hints.
 */
export const UserStoreModel = types
  .model("UserStore")
  .props({
    // user: types.optional(types.map(UserModel), {}),
    user: types.optional(types.array(UserModel), []),
  })
  .extend(withEnvironment)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({
    saveUser: (userSnapshot: UserSnapshot) => {
      const userModel: User = UserModel.create(userSnapshot) // create model instances from the plain objects
      self.user.replace([userModel])
    },
  }))

type UserStoreType = Instance<typeof UserStoreModel>
export interface UserStore extends UserStoreType {}
type UserStoreSnapshotType = SnapshotOut<typeof UserStoreModel>
export interface UserStoreSnapshot extends UserStoreSnapshotType {}
export const createUserStoreDefaultModel = () => types.optional(UserStoreModel, {})
