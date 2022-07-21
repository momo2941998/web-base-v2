import { Button, Space, Typography } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router'
import { useAppSelector } from '../app/hooks'
import { ChooseLanguage } from '../components/lang/ChooseLanguage'
import { selectAuth } from '../features/authSlice'
import { routeList } from './RouteList'
export const Welcome = () => {
  let auth = useAppSelector(selectAuth)
  let navigate = useNavigate();

  return (
    <div>
      <ChooseLanguage />
      <Typography.Title level={1}>
        Chào mừng đến trang Tra cứu cước Siptrunk.
        {!auth.jwt && (
          <div>
            <Space size="small" >
            Vui lòng chọn 
            <Button 
              type='primary'
              onClick={() => navigate(routeList.LOGIN)}
            >
              Đăng nhập
            </Button> 
            để truy cập các tính năng tra cước.
            </Space>
          </div>
        )} 
      </Typography.Title>
    </div>
  )
}
