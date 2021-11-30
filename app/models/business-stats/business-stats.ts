import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const BusinessStatsModel = types
  .model("BusinessStats")
  .props({
    activeOffers: types.maybe(types.number),
    currentProjects: types.maybe(types.number),
    edilgoSavings: types.maybe(types.number),
    // latestRequests: types.maybe(types.array(types.map(types.union(types.number, types.string,types.string, types.boolean, types.string, types.string)))),
    latestRequests: types.maybe(types.array(types.frozen())),
    requestsSent: types.maybe(types.number)
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

type BusinessStatsType = Instance<typeof BusinessStatsModel>
export interface BusinessStats extends BusinessStatsType {}
type BusinessStatsSnapshotType = SnapshotOut<typeof BusinessStatsModel>
export interface BusinessStatsSnapshot extends BusinessStatsSnapshotType {}
export const createBusinessStatsDefaultModel = () => types.optional(BusinessStatsModel, {})
