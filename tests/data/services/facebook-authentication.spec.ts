import { AuthenticationError } from '@/domain/errors'
import { FacebookAuthenticationService } from '@/data/contracts/services'

describe('FacebookAuthenticationService', () => {
  it('should call LoadFacebookUserAPi with correct params', async () => {
    const loadFacebookApi = { loadUser: jest.fn() }
    // const loadFacebookApi = new LoadFacebookApiSpy()
    const sut = new FacebookAuthenticationService(loadFacebookApi)
    await sut.perform({ token: 'any_token' })
    expect(loadFacebookApi.loadUser).toHaveBeenCalledWith({ token: 'any_token' })
    expect(loadFacebookApi.loadUser).toHaveBeenCalledTimes(1)
  })
  it('should return AtuhenticationError when LoadFacebookUserApi returns undefined', async () => {
    // const loadFacebookApi = new LoadFacebookApiSpy()
    // loadFacebookApi.result = undefined
    const loadFacebookApi = { loadUser: jest.fn() }
    loadFacebookApi.loadUser.mockResolvedValueOnce(undefined)
    const sut = new FacebookAuthenticationService(loadFacebookApi)
    const authResult = await sut.perform({ token: 'any_token' })
    expect(authResult).toEqual(new AuthenticationError())
  })
})
