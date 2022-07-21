import * as React from "react";
import './App.scss'
import {
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { LayoutPage, LoginPage, Page404, Welcome, UserInfo } from "./routes";
import { routeList } from "./routes/RouteList";
import { RequireAuth } from "./components/auth";
import { useAppSelector } from "./app/hooks";
import { selectAuth } from "./features/authSlice";

export default function App() {
  let auth = useAppSelector(selectAuth)
  const navigate = useNavigate()
  if (!auth.jwt) return (
    <LoginPage />
  )
  return (
      <Routes>
        <Route element={<LayoutPage />}>
          <Route path={routeList.HOME} element={<Welcome />} />
          <Route path={routeList.LOGIN} element={<LoginPage />} />
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
