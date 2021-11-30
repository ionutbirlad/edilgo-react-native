import { ProjectContentStoreModel } from "./project-content-store"

test("can be created", () => {
  const instance = ProjectContentStoreModel.create({})

  expect(instance).toBeTruthy()
})
