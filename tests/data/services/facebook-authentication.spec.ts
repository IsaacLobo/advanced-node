import { AuthenticationError } from '@/domain/errors'
import { LoadFacebookUserApi } from '@/data/contracts/api'
import { FacebookAuthenticationService } from '@/data/contracts/services'

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
