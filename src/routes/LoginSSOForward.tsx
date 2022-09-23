import { Col, Row, Typography } from "antd"
import { useEffect } from "react";
import { useSearchParams, createSearchParams, useLocation } from "react-router-dom"

export const LoginSSOForward = () => {
  let [searchParams, setSearchParams] = useSearchParams()
  let location = useLocation()
  useEffect(() => {
    if (searchParams) {
      let redirectURL =  searchParams.get("service") || ""
      localStorage.setItem("redirectURL", redirectURL)
      window.location.href = "https://devsso.smart-office.vn/sso/authorize-spa?response_type=id_token%20token&scope=openid&nonce=anything&state=anything&client_id=SMART_OFFICE_DEV&redirect_uri=http://localhost:5000/login-sso-callback&tenant_code=mobifone"

    }
  }, [searchParams])
  
  return (
    <div>
      <Row>
        <Col offset={4} span={16} >
          <Typography.Title level={1} style={{ textAlign: 'center', marginTop: '1em'}}>
            Welcome SSO Forward
          </Typography.Title>
        </Col>
      </Row>
    </div>
  )
}
