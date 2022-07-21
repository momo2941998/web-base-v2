import { Button, Space } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { selectAuth } from "../../features/authSlice";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { actionResetPersist } from "../../app/rootReducer";
import { routeList } from "../../routes/RouteList";
export function AuthStatus() {
  let navigate = useNavigate();
  let auth = useAppSelector(selectAuth)
  let dispatch = useAppDispatch()
  let location = useLocation();
  if (location.pathname === routeList.LOGIN) {
    return (<Space />)
  }



  if (!auth.user) {
    return (
      <Space id="auth-status">
        <Button type="primary" onClick={() => navigate('/login')}>Đăng nhập</Button>
        {" "}
      </Space>
    )
  }

  return (
    <Space id="auth-status">
      <span className="hello-user" >Xin chào, </span>
      <span id="display-name-user" className="hello-user" >
        {auth.user} 
      </span>
      <Button
        onClick={() => {
          dispatch({type: actionResetPersist})
        }}
      >
        Đăng xuất
      </Button>
      {" "}
    </Space>
  );
}