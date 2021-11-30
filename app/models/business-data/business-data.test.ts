import { BusinessDataModel } from "./business-data"

test("can be created", () => {
  const instance = BusinessDataModel.create({})

  expect(instance).toBeTruthy()
})
