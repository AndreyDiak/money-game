import useSelection from "antd/lib/table/hooks/useSelection"
import axios from "axios"
import {useSelector} from "react-redux";
import { AppStateType } from "../redux/store";

const baseURL = '/api'
const token = useSelector((state: AppStateType) => state.app.token)

export const instance = axios.create({
  withCredentials: true,
  baseURL: baseURL,
  headers: {
    'Authorization': `Bearer ${token}`
  }
})

// export const ProfileAPI = {
//   getProf(id: number) {
//     return instance.get()
//   }
// }