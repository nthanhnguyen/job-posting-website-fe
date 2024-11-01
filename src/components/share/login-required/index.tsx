import { Navigate } from "react-router-dom";
import { useAppSelector } from "@/redux/hooks";
import LoginRequired from "./login-required";

const RoleBaseRoute = (props: any) => {
  return (<>{props.children}</>)
}

const LoginIsRequired = (props: any) => {
  const user = useAppSelector(state => state.account.user);

  const isUserLoggedIn = user && user._id && user.email && user.name && user.permissions.length > 0;

  return (
    <>
      {isUserLoggedIn ?
        <>
          <RoleBaseRoute>
            {props.children}
          </RoleBaseRoute>
        </>
        :
        <Navigate to='/login' replace />
      }
    </>
  )
}

export default LoginIsRequired;
