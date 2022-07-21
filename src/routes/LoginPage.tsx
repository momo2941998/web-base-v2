import { useAppSelector } from "../app/hooks"; 
import { Navigate, useLocation } from "react-router";
import { selectAuth } from "../features/authSlice";
import { useAppDispatch } from '../app/hooks'
import { signin } from "../features/authSlice";
import { Button, Col, Form, Input, Row, Space, Spin, Typography, notification } from "antd";
import { useEffect, useState } from "react";
import { getToken } from "../service";
import { routeList } from "./RouteList";
import { StateLocation } from "../types/router";

export function LoginPage() {
  let dispatch = useAppDispatch()
  let location = useLocation();
  console.log(location)
  let auth = useAppSelector(selectAuth)

  let state = location.state as StateLocation
  let from = state?.from.pathname || routeList.USER_INFO
  const [isPending, setIsPending] = useState(false)

  useEffect(() => {
    return () => {
      setIsPending(false)
    }
  }, [])
  

  const onFinish = (values: {username: string, password: string}) => {
    const { username, password } = values;
    setIsPending(true)
    getToken(username, password)
      .then((token) => {
          setIsPending(false)
          dispatch(signin({
            user: username,
            jwt: token
          }))
      })
      .catch((error: Error) => {
        notification.error({
          message: "Lỗi đăng nhập",
          duration: 3
        })
      })
      .finally(() => {
        setIsPending(false)
      })
  };
  const onFinishFailed = (errorInfo: any) => {
    console.error('Failed:', errorInfo);
  };

  if (!auth.user) {
    return (
    <Row>
      <Col offset={4} span={16} >
        <Typography.Title level={1} style={{ textAlign: 'center', marginTop: '1em'}}>
          Chào mừng đến trang Tra cứu cước Siptrunk
        </Typography.Title>
      </Col>
      <Col offset={8} span={8} >

          <Form
            style={{ padding: '32px 0 32px 0', margin: '32px 0 32px 0', border: 'solid 1px', borderRadius: '32px'}}
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 12,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
          <div style={{textAlign: 'center', marginBottom: '64px'}}>
          <Typography.Title level={1}>
            Đăng nhập
          </Typography.Title>
          </div>
            <Form.Item
              label="Email"
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Please input your username!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Mật khẩu"
              name="password"
              
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button 
                type="primary" 
                htmlType="submit"
                disabled={isPending}
              >
                <Space >
                  Đăng nhập
                  {isPending && <Spin />}
                </Space>
              </Button>
            </Form.Item>
          </Form>
      </Col>
    </Row>
    );
  } else {
    return <Navigate to={from} />
  }
}