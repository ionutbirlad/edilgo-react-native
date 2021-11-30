import { BusinessStatsModel } from "./business-stats"

test("can be created", () => {
  const instance = BusinessStatsModel.create({})

  expect(instance).toBeTruthy()
})
