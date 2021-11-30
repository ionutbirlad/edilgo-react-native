import { Instance, SnapshotOut, types, flow } from "mobx-state-tree"
import { withEnvironment } from '../extensions/with-environment'
import { withRootStore } from '../extensions/with-root-store'
import { BusinessDataSnapshot, BusinessDataModel, BusinessData } from "../../models/business-data/business-data"
import { GetBusinessDataResult } from "../../services/api/api.types"
import RNSInfo from "react-native-sensitive-info"

/**
 * Model description here for TypeScript hints.
 */
export const BusinessDataStoreModel = types
  .model("BusinessDataStore")
  .props({
    businessData: types.optional(types.array(BusinessDataModel), []),
  })
  .extend(withEnvironment)
  .extend(withRootStore)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({
    saveBusinessData: (businessDataSnapshot: BusinessDataSnapshot) => {
      const businessDataModel: BusinessData = BusinessDataModel.create(businessDataSnapshot) // create model instances from the plain objects
      self.businessData.replace([businessDataModel])
    },
  }))
  .actions(self => ({
    getBusinessData: flow(function*(payload) {
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

        const result: GetBusinessDataResult = yield self.environment.api.fetchBusinessData(payload)
        if (result.kind === "ok") {
          self.saveBusinessData(result.businessData)
        }
        self.rootStore.loaderStore.setStatus('done')
      } catch (e) {
        self.rootStore.loaderStore.setStatus('error')
        __DEV__ && console.tron.log(e)
      }
    }),
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

type BusinessDataStoreType = Instance<typeof BusinessDataStoreModel>
export interface BusinessDataStore extends BusinessDataStoreType {}
type BusinessDataStoreSnapshotType = SnapshotOut<typeof BusinessDataStoreModel>
export interface BusinessDataStoreSnapshot extends BusinessDataStoreSnapshotType {}
export const createBusinessDataStoreDefaultModel = () => types.optional(BusinessDataStoreModel, {})
