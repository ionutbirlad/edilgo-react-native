import { ApisauceInstance, create, ApiResponse } from "apisauce"
import { getGeneralApiProblem } from "./api-problem"
import { ApiConfig, DEFAULT_API_CONFIG } from "./api-config"
import * as Types from "./api.types"
import { UserSnapshot } from "../../models/user/user"
import { BusinessDataSnapshot } from "../../models/business-data/business-data"
import { BusinessStatsSnapshot } from "../../models/business-stats/business-stats"
import { ProjectSnapshot } from "../../models/project/project"
import { ProjectContentSnapshot } from "../../models/project-content/project-content"
import { NotificationSnapshot } from "../../models/notification/notification"
import SInfo from "react-native-sensitive-info"

// const API_PAGE_SIZE = 50

const convertUser = (raw: any): UserSnapshot => {
  SInfo.setItem('edilgoToken', raw.token, {
    keychainService: 'myKeychain'
  })
  return {
    builderId: raw.userInfo.builderId,
    // supplierId: types.maybe(types.identifier),
    isBuilder: raw.userInfo.isBuilder,
    businessName: raw.userInfo.businessName,
    builderAccessPermissions: raw.userInfo.builderAccessPermissions,
    supplierAccessPermissions: raw.userInfo.supplierAccessPermissions,
    isVerified: raw.userInfo.isVerified,
    isBoss: raw.userInfo.isBoss,
    isFirstLogin: raw.userInfo.isFirstLogin,
    activeServices: raw.userInfo.activeServices,
    modalStatus: raw.userInfo.modalStatus,
  }
}

const convertBusinessData = (raw: any): BusinessDataSnapshot => {
  return {
    id: raw.id,
    firstName: raw.firstname,
    lastName: raw.lastname,
    companyRole: raw.companyRole,
    phone: raw.phone,
    email: raw.email,
    categories: raw.categories,
    profilePicture: raw.profilePicture,
    settings: raw.settings,
    builderAccessPermissions: raw.builder.builderAccessPermissions,
    supplierAccessPermissions: raw.supplier.supplierAccessPermissions,
    businessId: raw.business.id,
    edilgoVerified: raw.business.edilgoVerified,
    pec: raw.business.pec,
    businessPicture: raw.business.picture,
    offerResponseRate: raw.business.offerResponseRate,
    addresses: raw.business.addresses.edges,
    hqAddress: raw.business.hqAddress,
    legalAddress: raw.business.legalAddress,
    badges: raw.business.badges.edges,
    businessName: raw.business.name,
    vatNumber: raw.business.vatNumber,
    revenueInt: raw.business.revenueInt,
    employeesInt: raw.business.employeesInt,
    businessPhone: raw.business.phone,
    website: raw.business.website,
    bio: raw.business.bio,
    durc: raw.business.durc,
    noDurcNeeded: raw.business.noDurcNeeded,
    licensed: raw.business.licensed,
    cam: raw.business.cam,
    epd: raw.business.epd,
    dop: raw.business.dop,
    iso9001: raw.business.iso9001,
    iso14001: raw.business.iso14001,
    ohsas18001: raw.business.ohsas18001,
    soa: raw.business.soa,
    whitelist: raw.business.whitelist,
  }
}

const convertBusinessStats = (raw: any): BusinessStatsSnapshot => {
  return {
    activeOffers: raw.active_offers,
    currentProjects: raw.current_projects,
    edilgoSavings: raw.edilgo_savings,
    latestRequests: raw.latest_requests,
    requestsSent: raw.requests_sent,
  }
}

const convertProject = (raw: any): ProjectSnapshot => {
  return {
    id: raw.node.id,
    name: raw.node.name,
    address: `${raw.node.address.city} (${raw.node.address.province})`,
    isSingleRequest: raw.node.isSingleRequest,
    createdRequests: raw.node.requestsCreated,
    sentRequests: raw.node.requestsSent,
    receivedOffers: raw.node.offersRecieved,
    status: raw.node.status,
  }
}

const convertProjectContent = (raw: any): ProjectContentSnapshot => {
  return {
    projectInfo: {
      isSingleRequest: raw.isSingleRequest,
      name: raw.name,
      description: raw.description,
      address: raw.address.address,
      latitude: raw.address.latitude,
      longitude: raw.address.longitude,
      streetNumber: raw.address.streetNumber,
      city: raw.address.city,
      province: raw.address.province,
      zipCode: raw.address.zipCode,
      country: raw.address.country,
      attachmentsSet: raw.projectattachmentSet.edges
    },
    requests: raw.requestSet.edges
  }
}

const convertNotification = (raw: any): NotificationSnapshot => {
  return {
    id: raw.node.id,
    sender: raw.node.sender,
    description: raw.node.description,
    timestamp: raw.node.timestamp,
    unread: raw.node.unread,
    offer: raw.node.offer ? raw.node.offer : '-',
    hasNextPage: false,
    endCursor: 'aaa',
  }
}

/**
 * Manages all requests to the API.
 */
export class Api {
  /**
   * The underlying apisauce instance which performs the requests.
   */
  apisauce: ApisauceInstance

  /**
   * Configurable options.
   */
  config: ApiConfig

  /**
   * Creates the api.
   *
   * @param config The configuration to use.
   */
  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config
  }

  /**
   * Sets up the API.  This will be called during the bootup
   * sequence and will happen before the first React component
   * is mounted.
   *
   * Be as quick as possible in here.
   */
  setup() {
    // construct the apisauce instance
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        Accept: "application/json",
      },
    })
  }

  /**
   * Gets a user.
   */
   async fetchUser(payload): Promise<Types.GetUserResult> {
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.post('', {
      query: `mutation TokenAuth($email: String!, $password: String!) {
                tokenAuth(input: {email: $email, password: $password}) {
                  token
                  payload
                  refreshExpiresIn
                  userInfo
                }
              }`,
      variables: { email: payload.email, password: payload.password } 
    })
    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      const rawUser = response.data.data.tokenAuth
      const convertedUser: UserSnapshot = convertUser(rawUser)
      return { kind: "ok", user: convertedUser }
    } catch (e) {
      __DEV__ && console.tron.log(e.message)
      return { kind: "bad-data" }
    }
  }

  async fetchBusinessData(payload): Promise<Types.GetBusinessDataResult> {
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.post('', {
      query: `query($email: String!) {
        users(email: $email) {
          edges {
            node {
              id
              firstname
              lastname
              companyRole
              phone
              email
              categories
              profilePicture
              settings
              builder{
                builderAccessPermissions
              }
              supplier{
                supplierAccessPermissions
              }
              business {
                id
                edilgoVerified
                pec
                picture
                offerResponseRate
                addresses {
                  edges {
                    node {
                      id
                      address
                      streetNumber
                      city
                      province
                      zipCode
                    }
                  }
                }
                hqAddress {
                  id
                }
                legalAddress {
                  id
                }
                badges {
                  edges {
                    node {
                      shortName
                    }
                  }
                }
                name
                vatNumber
                revenueInt
                employeesInt
                phone
                website
                bio
                durc
                noDurcNeeded
                catalog
                leed
                cam
                epd
                dop
                iso9001
                iso14001
                ohsas18001
                soa
                whitelist
              }
            }
          }
        }
      }`,
      variables: { email: payload.email } 
    })
    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      const rawBusinessData = response.data.data.users.edges[0].node
      const convertedBusinessData: BusinessDataSnapshot = convertBusinessData(rawBusinessData)
      return { kind: "ok", businessData: convertedBusinessData }
    } catch (e) {
      __DEV__ && console.tron.log(e.message)
      return { kind: "bad-data" }
    }
  }

  async fetchBusinessStats(payload): Promise<Types.GetBusinessStatsResult> {
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.post('', {
      query: `query {
        builderStats
      }`,
      variables: { email: payload.email } 
    })
    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      const rawBusinessStats = response.data.data.builderStats
      const convertedBusinessStats: BusinessStatsSnapshot = convertBusinessStats(rawBusinessStats)
      return { kind: "ok", businessStats: convertedBusinessStats }
    } catch (e) {
      __DEV__ && console.tron.log(e.message)
      return { kind: "bad-data" }
    }
  }

  async fetchProjects(payload): Promise<Types.GetProjectsResult> {
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.post('', {
      query: `query {
                projects(
                  orderBy: "id",
                ) {
                  edges {
                    node {
                      id
                      name
                      timestamp
                      colaboratorsReadOnly {
                        edges {
                          node {
                            email
                          }
                        }
                      }
                      colaboratorsReadAndWrite {
                        edges {
                          node {
                            email
                          }
                        }
                      }
                      isSingleRequest
                      owner {
                        id
                        email
                        firstname
                        lastname
                      }
                      address {
                        province
                        city
                      }
                      requestsCreated
                      requestsSent
                      offersRecieved
                      status
                      categoriesConfirmed
                    }
                  }
                }
              }`,
      variables: { email: payload.email } 
    })
    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      const rawProjects = response.data.data.projects.edges
      const convertedProjects: ProjectSnapshot[] = rawProjects.map(convertProject)
      return { kind: "ok", projects: convertedProjects }
    } catch (e) {
      __DEV__ && console.tron.log(e.message)
      return { kind: "bad-data" }
    }
  }

  async fetchProjectContent(payload): Promise<Types.GetProjectContentResult> {
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.post('', {
      query: `query ($projectId: ID!) {
        projects(projectId: $projectId) {
          edges {
            node {
              id
              isSingleRequest
              description
              name
              projectattachmentSet {
                edges {
                  node {
                    id
                    name
                    url
                  }
                }
              }
              owner {
                id
              }
              requestSet {
                edges {
                  node {
                    id
                    status
                    offersCount
                    deadline
                    filterRevenue
                    filterDistance
                    category {
                      id
                      name
                    }
                    bomitemSet {
                      edges {
                        node {
                          id
                          code
                          description
                          parts
                          length
                          width
                          heightOrWeight
                          unitOfMeasurement
                          quantity
                          unitPrice
                        }
                      }
                    }
                  }
                }
              }
              colaboratorsReadAndWrite {
                edges {
                  node {
                    id
                  }
                }
              }
              colaboratorsReadOnly {
                edges {
                  node {
                    id
                  }
                }
              }
              address {
                id
                address
                streetNumber
                city
                province
                zipCode
                country
                latitude
                longitude
              }
              contractType {
                id
                name
              }
              installationType {
                id
                name
              }
              interventionType {
                id
                name
              }
            }
          }
        }
      }`,
      variables: { projectId: payload.projectId }
    })
    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      const rawProjectContent = response.data.data.projects.edges[0].node
      const convertedProjectContent: ProjectContentSnapshot = convertProjectContent(rawProjectContent)
      return { kind: "ok", projectContent: convertedProjectContent }
    } catch (e) {
      __DEV__ && console.tron.log(e.message)
      return { kind: "bad-data" }
    }
  }

  async fetchNotifications(payload): Promise<Types.GetNotificationsResult> {
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.post('', {
      query: `query ($email: String!){
                notifications (recipient_Email: $email){
                  pageInfo {
                    hasNextPage
                    endCursor
                  }
                  edges {
                    node {
                      id
                      sender
                      description
                      timestamp
                      unread
                      offer
                    }
                  }
                }
              }`,
      variables: { email: payload.email } 
    })
    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      const rawNotifications = response.data.data.notifications.edges
      const convertedNotifications: NotificationSnapshot[] = rawNotifications.map(convertNotification)
      return { kind: "ok", notifications: convertedNotifications }
    } catch (e) {
      __DEV__ && console.tron.log(e.message)
      return { kind: "bad-data" }
    }
  }
}
