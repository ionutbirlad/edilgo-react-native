import { Instance, SnapshotOut, types, flow } from "mobx-state-tree"
import { withEnvironment } from '../extensions/with-environment'
import { withRootStore } from '../extensions/with-root-store'
import { BusinessStatsSnapshot, BusinessStatsModel, BusinessStats } from "../../models/business-stats/business-stats"
import { GetBusinessStatsResult } from "../../services/api/api.types"
import RNSInfo from "react-native-sensitive-info"

/**
 * Model description here for TypeScript hints.
 */
export const BusinessStatsStoreModel = types
  .model("BusinessStatsStore")
  .props({
    businessStats: types.optional(types.array(BusinessStatsModel), []),
  })
  .extend(withEnvironment)
  .extend(withRootStore)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({
    saveBusinessStats: (businessStatsSnapshot: BusinessStatsSnapshot) => {
      const userModel: BusinessStats = BusinessStatsModel.create(businessStatsSnapshot) // create model instances from the plain objects
      self.businessStats.replace([userModel])
      // Object.assign(self.user, userModel)
    },
  }))
  .actions(self => ({
    getBusinessStats: flow(function*(payload) {
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

        const result: GetBusinessStatsResult = yield self.environment.api.fetchBusinessStats(payload)
        if (result.kind === "ok") {
          self.saveBusinessStats(result.businessStats)
        }
        self.rootStore.loaderStore.setStatus('done')
      } catch (e) {
        self.rootStore.loaderStore.setStatus('error')
        __DEV__ && console.tron.log(e)
      }
    }),
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

type BusinessStatsStoreType = Instance<typeof BusinessStatsStoreModel>
export interface BusinessStatsStore extends BusinessStatsStoreType {}
type BusinessStatsStoreSnapshotType = SnapshotOut<typeof BusinessStatsStoreModel>
export interface BusinessStatsStoreSnapshot extends BusinessStatsStoreSnapshotType {}
export const createBusinessStatsStoreDefaultModel = () => types.optional(BusinessStatsStoreModel, {})
