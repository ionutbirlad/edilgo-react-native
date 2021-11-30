import { Instance, SnapshotOut, types, flow } from "mobx-state-tree"
import { withEnvironment } from '../extensions/with-environment'
import { withRootStore } from '../extensions/with-root-store'
import { ProjectContentSnapshot, ProjectContentModel, ProjectContent } from "../../models/project-content/project-content"
import { GetProjectContentResult } from "../../services/api/api.types"
import RNSInfo from "react-native-sensitive-info"

/**
 * Model description here for TypeScript hints.
 */
export const ProjectContentStoreModel = types
  .model("ProjectContentStore")
  .props({
    projectContent: types.optional(types.array(ProjectContentModel), []),
  })
  .extend(withEnvironment)
  .extend(withRootStore)
  .views(self => ({
    get bomItemSet() {
      return JSON.parse(JSON.stringify(self.projectContent[0])).requests[0].node.bomitemSet.edges
    },
    specificBomItemSet(reqId) {
      return JSON.parse(JSON.stringify(self.projectContent[0])).requests.filter(r => r.node.id === reqId)[0].node.bomitemSet.edges
    },
    get requests() {
      return JSON.parse(JSON.stringify(self.projectContent[0].requests))
    },
  }))
  .actions(self => ({
    saveProjectContent: (projectContentSnapshot: ProjectContentSnapshot) => {
      const projectContentModel: ProjectContent = ProjectContentModel.create(projectContentSnapshot) // create model instances from the plain objects
      self.projectContent.replace([projectContentModel])
    },
  }))
  .actions(self => ({
    getProjectContent: flow(function*(payload) {
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

        const result: GetProjectContentResult = yield self.environment.api.fetchProjectContent(payload)
        if (result.kind === "ok") {
          self.saveProjectContent(result.projectContent)
        }
        self.rootStore.loaderStore.setStatus('done')
      } catch (error) {
        self.rootStore.loaderStore.setStatus('error')
        __DEV__ && console.tron.log(error)
      }
    }),
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
type ProjectContentStoreType = Instance<typeof ProjectContentStoreModel>
export interface ProjectContentStore extends ProjectContentStoreType {}
type ProjectContentStoreSnapshotType = SnapshotOut<typeof ProjectContentStoreModel>
export interface ProjectContentStoreSnapshot extends ProjectContentStoreSnapshotType {}
export const createProjectContentStoreDefaultModel = () => types.optional(ProjectContentStoreModel, {})
