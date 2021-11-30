import { ProjectStoreModel } from "./project-store"

test("can be created", () => {
  const instance = ProjectStoreModel.create({})

  expect(instance).toBeTruthy()
})
