import { Button, Result } from 'antd'
import React from 'react'

export const Page404 = ({ backHome } : { backHome: () => void}) => {
  return (
    <div>
      <Result 
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={<Button onClick={backHome} type="primary">Back Home</Button>}
      />
    </div>
  )
}
