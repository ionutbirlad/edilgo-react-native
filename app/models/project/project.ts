import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const ProjectModel = types
  .model("Project")
  .props({
    id: types.identifier,
    name: types.string,
    address: types.string,
    isSingleRequest: types.boolean,
    createdRequests: types.number,
    sentRequests: types.number,
    receivedOffers: types.number,
    status: types.string,
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

type ProjectType = Instance<typeof ProjectModel>
export interface Project extends ProjectType {}
type ProjectSnapshotType = SnapshotOut<typeof ProjectModel>
export interface ProjectSnapshot extends ProjectSnapshotType {}
export const createProjectDefaultModel = () => types.optional(ProjectModel, {})
