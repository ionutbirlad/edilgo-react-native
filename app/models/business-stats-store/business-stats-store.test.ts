import { BusinessStatsStoreModel } from "./business-stats-store"

test("can be created", () => {
  const instance = BusinessStatsStoreModel.create({})

  expect(instance).toBeTruthy()
})
