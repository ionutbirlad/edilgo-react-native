import { GeneralApiProblem } from "./api-problem"
import { Character } from "../../models/character/character"
import { UserSnapshot, BusinessDataSnapshot, BusinessStatsSnapshot, ProjectSnapshot, ProjectContentSnapshot, NotificationSnapshot } from "../../models"

// export interface User {
//   id: number
//   name: string
// }

export type GetUserResult = { kind: "ok"; user: UserSnapshot } | GeneralApiProblem
export type GetBusinessDataResult = { kind: "ok"; businessData: BusinessDataSnapshot } | GeneralApiProblem
export type GetBusinessStatsResult = { kind: "ok"; businessStats: BusinessStatsSnapshot } | GeneralApiProblem
export type GetProjectsResult = { kind: "ok"; projects: ProjectSnapshot[] } | GeneralApiProblem
export type GetProjectContentResult = { kind: "ok"; projectContent: ProjectContentSnapshot } | GeneralApiProblem
export type GetNotificationsResult = { kind: "ok"; notifications: NotificationSnapshot[] } | GeneralApiProblem

export type GetCharactersResult = { kind: "ok"; characters: Character[] } | GeneralApiProblem
export type GetCharacterResult = { kind: "ok"; character: Character } | GeneralApiProblem
