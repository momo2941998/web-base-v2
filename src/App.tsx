import * as React from "react";
import './App.scss'
import {
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { LayoutPage, LoginPage, Page404, Welcome, UserInfo, LoginSSOForward, LoginSSOCallback } from "./routes";
import { routeList } from "./routes/RouteList";
import { RequireAuth } from "./components/auth";

export default function App() {
  const navigate = useNavigate()
  return (
      <Routes>
        <Route element={<LayoutPage />}>
          <Route path={routeList.HOME} element={<Welcome />} />
          <Route path={routeList.LOGIN_SSO} element={<LoginSSOForward />} />
          <Route path={routeList.LOGIN_SSO_CALLBACK} element={<LoginSSOCallback />} />
          <Route 
            path={routeList.USER_INFO} 
            element={(
              <RequireAuth>
                <UserInfo />
              </RequireAuth>
            )}
          />
          <Route 
            path="/*"
            element={<Page404 backHome={() => navigate('/')}/>}
          />
        </Route>
      </Routes>
  );
}
