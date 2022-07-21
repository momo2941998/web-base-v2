import { Navigate, useLocation } from "react-router-dom";
import { selectAuth } from "../../features/authSlice";
import { useAppSelector } from "../../app/hooks";
import { routeList } from "../../routes/RouteList";
import { StateLocation } from "../../types/router";

export function RequireAuth({ children }: { children: JSX.Element }) {
  let location = useLocation();
  let auth = useAppSelector(selectAuth)
  if (!auth.user) {
    return <Navigate to={routeList.LOGIN} state={{ from: location } as unknown as StateLocation } />;
  }

  return children;
}