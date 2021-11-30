import { ProjectModel } from "./project"

test("can be created", () => {
  const instance = ProjectModel.create({})

  expect(instance).toBeTruthy()
})
