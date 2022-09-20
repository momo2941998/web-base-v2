import { Col, Row, Typography } from "antd"

export const Welcome = () => {
  
  return (
    <div>
      <Row>
        <Col offset={4} span={16} >
          <Typography.Title level={1} style={{ textAlign: 'center', marginTop: '1em'}}>
            Welcome SSO Middleware Page
          </Typography.Title>
        </Col>
      </Row>
    </div>
  )
}
