import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const ProjectContentModel = types
  .model("ProjectContent")
  .props({
    projectInfo: types.map(types.frozen()),
    requests: types.array(types.frozen())
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

type ProjectContentType = Instance<typeof ProjectContentModel>
export interface ProjectContent extends ProjectContentType {}
type ProjectContentSnapshotType = SnapshotOut<typeof ProjectContentModel>
export interface ProjectContentSnapshot extends ProjectContentSnapshotType {}
export const createProjectContentDefaultModel = () => types.optional(ProjectContentModel, {})
