import { BusinessDataStoreModel } from "./business-data-store"

test("can be created", () => {
  const instance = BusinessDataStoreModel.create({})

  expect(instance).toBeTruthy()
})
