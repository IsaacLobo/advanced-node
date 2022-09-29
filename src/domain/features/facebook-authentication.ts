import { AccessToken } from '@/domain/models'
import { AuthenticationError } from '@/domain/errors'

/* eslint-disable @typescript-eslint/no-unused-vars */
export interface FacebookAuthentication {
  perform: (params: FacebookAuthentication.Params) => Promise<FacebookAuthentication.Result>
}
export namespace FacebookAuthentication{
  export type Params = {
    token: string
  }
  export type Result = AccessToken | AuthenticationError
}
