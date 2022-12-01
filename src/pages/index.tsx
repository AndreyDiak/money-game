import { Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";
import { appActions } from "../redux/app-reducer";
import { AppRoutes } from "./_routes";

// const STORAGE_NAME = 'PROFILE_LOCAL_STORAGE'

const Main = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(appActions.setReady())
  }, [dispatch])

  return (
    <Suspense fallback={
      <div>
        Loading...
      </div>
    }>
      <AppRoutes/>
    </Suspense>
    
  )
}

export default Main;
