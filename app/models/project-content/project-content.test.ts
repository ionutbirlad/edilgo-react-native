import { ProjectContentModel } from "./project-content"

test("can be created", () => {
  const instance = ProjectContentModel.create({})

  expect(instance).toBeTruthy()
})
