import { FacebookAuthentication } from '@/domain/features'

class FacebookAuthenticationService {
  constructor (private readonly loadFacebookUserApi: LoadFacebookUserApi) {

  }

  async perform (params: FacebookAuthentication.Params): Promise<void> {
    await this.loadFacebookUserApi.loadUser(params)
  }
}
interface LoadFacebookUserApi {
  loadUser: (params: LoadFacebookUserApi.Params) => Promise<void>
}
namespace LoadFacebookUserApi{
  export type Params = {
    token: string
  }
}
class LoadFacebookApiSpy implements LoadFacebookUserApi {
  token?: string
  async loadUser (params: LoadFacebookUserApi.Params): Promise<void> {
    this.token = params.token
  }
}
describe('FacebookAuthenticationService', () => {
  it('', async () => {
    const loadFacebookUserByTokenApi = new LoadFacebookApiSpy()
    const sut = new FacebookAuthenticationService(loadFacebookUserByTokenApi)
    await sut.perform({ token: 'any_token' })
    expect(loadFacebookUserByTokenApi.token).toBe('any_token')
  })
})
