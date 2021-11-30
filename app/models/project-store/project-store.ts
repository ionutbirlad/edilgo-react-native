import { Instance, SnapshotOut, types, flow } from "mobx-state-tree"
import { withEnvironment } from '../extensions/with-environment'
import { withRootStore } from '../extensions/with-root-store'
import { ProjectSnapshot, ProjectModel, Project } from "../../models/project/project"
import { GetProjectsResult } from "../../services/api/api.types"
import RNSInfo from "react-native-sensitive-info"

/**
 * Model description here for TypeScript hints.
 */
export const ProjectStoreModel = types
  .model("ProjectStore")
  .props({
    projects: types.optional(types.array(ProjectModel), []),
  })
  .extend(withEnvironment)
  .extend(withRootStore)
  .views(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({
    saveProjects: (projectSnapshots: ProjectSnapshot[]) => {
      const projectModels: Project[] = projectSnapshots.map(p => ProjectModel.create(p)) // create model instances from the plain objects
      self.projects.replace(projectModels) // Replace the existing data with the new data
    },
  }))
  .actions(self => ({
    getProjects: flow(function*() {
      self.rootStore.loaderStore.setStatus('pending')
      
      // const authEmail = self.rootStore.businessDataStore[0].email
      try {
        /**
         * set auth header in apiSauce.
         */
        yield RNSInfo.getItem('edilgoToken', {
          keychainService: 'myKeychain'
        }).then(t => {
          self.environment.api.apisauce.setHeader('Authorization', `JWT ${t}`)
        })

        const result: GetProjectsResult = yield self.environment.api.fetchProjects({
          email: 'fonzini@fonzini.it'
        })
        if (result.kind === "ok") {
          self.saveProjects(result.projects)
        }
        self.rootStore.loaderStore.setStatus('done')
      } catch (error) {
        self.rootStore.loaderStore.setStatus('error')
        __DEV__ && console.tron.log(error)
      }
    }),
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

type ProjectStoreType = Instance<typeof ProjectStoreModel>
export interface ProjectStore extends ProjectStoreType {}
type ProjectStoreSnapshotType = SnapshotOut<typeof ProjectStoreModel>
export interface ProjectStoreSnapshot extends ProjectStoreSnapshotType {}
export const createProjectStoreDefaultModel = () => types.optional(ProjectStoreModel, {})
