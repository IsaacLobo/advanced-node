import { AuthenticationError } from '@/domain/errors'
import { FacebookAuthenticationService } from '@/data/contracts/services'
import { mock } from 'jest-mock-extended'
import { LoadFacebookUserApi } from '../contracts/api'
describe('FacebookAuthenticationService', () => {
  it('should call LoadFacebookUserAPi with correct params', async () => {
    const loadFacebookApi = mock<LoadFacebookUserApi>()
    // const loadFacebookApi = new LoadFacebookApiSpy()
    const sut = new FacebookAuthenticationService(loadFacebookApi)
    await sut.perform({ token: 'any_token' })
    expect(loadFacebookApi.loadUser).toHaveBeenCalledWith({ token: 'any_token' })
    expect(loadFacebookApi.loadUser).toHaveBeenCalledTimes(1)
  })
  it('should return AtuhenticationError when LoadFacebookUserApi returns undefined', async () => {
    // const loadFacebookApi = new LoadFacebookApiSpy()
    // loadFacebookApi.result = undefined
    const loadFacebookApi = mock<LoadFacebookUserApi>()
    // loadFacebookApi.loadUser.mockResolvedValueOnce(undefined)
    const sut = new FacebookAuthenticationService(loadFacebookApi)
    const authResult = await sut.perform({ token: 'any_token' })
    expect(authResult).toEqual(new AuthenticationError())
  })
})
