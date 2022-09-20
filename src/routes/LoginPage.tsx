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

const defaultRoute = routeList.USER_INFO

export function LoginPage() {
  let dispatch = useAppDispatch()
  let location = useLocation();
  console.log(location)
  let auth = useAppSelector(selectAuth)

  let state = location.state as StateLocation
  let from = state?.from.pathname || defaultRoute
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
          Login page
        </Typography.Title>
      </Col>
    </Row>
    );
  } else {
    return <Navigate to={from} />
  }
}