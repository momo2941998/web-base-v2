import { PageHeader, Layout, Typography } from 'antd'
import { useAppSelector } from '../app/hooks';
import { selectAuth } from '../features/authSlice';
const { Content } = Layout

export const UserInfo = () => {
  let auth = useAppSelector(selectAuth)

  
  return (
    <div id='user-info-page'>
      <PageHeader>
        <Typography.Title level={2}>
          Thông tin tài khoản
        </Typography.Title>
      </PageHeader>
      <Content>
        User {auth.user}
      </Content>
    </div>
  )
}