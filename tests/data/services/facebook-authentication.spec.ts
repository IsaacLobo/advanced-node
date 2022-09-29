import { AuthenticationError } from '@/domain/errors'
import { FacebookAuthentication } from '@/domain/features'

class FacebookAuthenticationService {
  constructor (private readonly loadFacebookUserApi: LoadFacebookUserApi) {

  }

  async perform (params: FacebookAuthentication.Params): Promise<AuthenticationError> {
    await this.loadFacebookUserApi.loadUser(params)
    return new AuthenticationError()
  }
}
interface LoadFacebookUserApi {
  loadUser: (params: LoadFacebookUserApi.Params) => Promise<LoadFacebookUserApi.Result>
}
namespace LoadFacebookUserApi{
  export type Params = {
    token: string
  }
  export type Result = undefined
}
class LoadFacebookApiSpy implements LoadFacebookUserApi {
  token?: string
  result = undefined
  async loadUser (params: LoadFacebookUserApi.Params): Promise<LoadFacebookUserApi.Result> {
    this.token = params.token
    return this.result
  }
}
describe('FacebookAuthenticationService', () => {
  it('should call LoadFacebookUserAPi with correct params', async () => {
    const loadFacebookApi = new LoadFacebookApiSpy()
    const sut = new FacebookAuthenticationService(loadFacebookApi)
    await sut.perform({ token: 'any_token' })
    expect(loadFacebookApi.token).toBe('any_token')
  })
  it('should return AtuhenticationError when LoadFacebookUserApi returns undefined', async () => {
    const loadFacebookApi = new LoadFacebookApiSpy()
    loadFacebookApi.result = undefined
    const sut = new FacebookAuthenticationService(loadFacebookApi)
    const authResult = await sut.perform({ token: 'any_token' })
    expect(authResult).toEqual(new AuthenticationError())
  })
})
