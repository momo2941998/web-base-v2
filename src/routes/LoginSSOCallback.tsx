import { Col, Row, Typography } from "antd"
import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { SSOResponse } from "../types/sso"
import { composeUrl, parseUrlHash } from "../utils/hash-utils"
import jwt_decode from "jwt-decode";

export const LoginSSOCallback = () => {
  let location = useLocation()
  useEffect(() => {
    if (location) {
      const paramsUrl = parseUrlHash(location.hash)
      let ssoCallbackParams: SSOResponse = {
        access_token: paramsUrl.access_token,
        expires_in: paramsUrl.expires_in,
        id_token: paramsUrl.id_token,
        refresh_token: paramsUrl.refresh_token,
        state: paramsUrl.state,
        sessionId: paramsUrl.sessionId,
        token_type: paramsUrl.token_type,
      }
      // console.log(ssoCallbackParams)
      let redirectURL = localStorage.getItem("redirectURL") || ""
      let tokenInfo: any = jwt_decode(ssoCallbackParams.id_token)
      console.log(tokenInfo)
      let params = {
        accountId: tokenInfo.accountId,
        fullname: tokenInfo.fullname,
        email: tokenInfo.mail,
        username: tokenInfo.username
      }
      let fullLink = composeUrl(redirectURL, params)
      console.log(fullLink)
      window.location.href = fullLink
    }
  }, [location])
  return (
    <div>
      <Row>
        <Col offset={4} span={16} >
          <Typography.Title level={1} style={{ textAlign: 'center', marginTop: '1em'}}>
            Welcome SSO Callback
          </Typography.Title>
        </Col>
      </Row>
    </div>
  )
}
