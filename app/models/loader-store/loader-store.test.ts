import { LoaderStoreModel } from "./loader-store"

test("can be created", () => {
  const instance = LoaderStoreModel.create({})

  expect(instance).toBeTruthy()
})
