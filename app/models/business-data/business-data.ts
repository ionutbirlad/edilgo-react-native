import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const BusinessDataModel = types
  .model("BusinessData")
  .props({
    id: types.string,
    firstName: types.string,
    lastName: types.string,
    companyRole: types.string,
    phone: types.string,
    email: types.string,
    categories: types.array(types.map(types.string)),
    profilePicture: types.string,
    settings: types.map(types.boolean),
    builderAccessPermissions: types.maybeNull(types.string),
    supplierAccessPermissions: types.maybeNull(types.string),
    businessId: types.string,
    edilgoVerified: types.boolean,
    pec: types.string,
    businessPicture: types.string,
    offerResponseRate: types.number,
    addresses: types.maybeNull(types.array(types.map(types.map(types.string)))),
    hqAddress: types.map(types.string),
    legalAddress: types.map(types.string),
    badges: types.maybeNull(types.array(types.map(types.map(types.string)))),
    businessName: types.string,
    vatNumber: types.string,
    revenueInt: types.number,
    employeesInt: types.number,
    businessPhone: types.maybeNull(types.string),
    website: types.string,
    bio: types.string,
    durc: types.map(types.string),
    noDurcNeeded: types.boolean,
    licensed: types.maybe(types.string),
    cam: types.maybe(types.boolean),
    epd: types.maybeNull(types.string),
    dop: types.maybe(types.boolean),
    iso9001: types.map(types.string),
    iso14001: types.map(types.string),
    ohsas18001: types.map(types.string),
    soa: types.map(types.string),
    whitelist: types.boolean,
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

type BusinessDataType = Instance<typeof BusinessDataModel>
export interface BusinessData extends BusinessDataType {}
type BusinessDataSnapshotType = SnapshotOut<typeof BusinessDataModel>
export interface BusinessDataSnapshot extends BusinessDataSnapshotType {}
export const createBusinessDataDefaultModel = () => types.optional(BusinessDataModel, {})
