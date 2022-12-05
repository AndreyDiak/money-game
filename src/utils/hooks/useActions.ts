import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { appActions } from '../../redux/app-reducer'
import { businessActions } from '../../redux/market/business/business-reducer'
import { actions } from '../../redux/game/game-reducer'
import { profileActions } from '../../redux/profile/profile-reducer'
import { realtyActions } from '../../redux/market/realty/realty-reducer'
import { spendsActions } from '../../redux/spends-reducer'
import { stocksActions } from '../../redux/market/stocks/stocks-reducer'

const AllActions = {
  ...actions,
  ...appActions,
  ...businessActions,
  ...realtyActions,
  ...stocksActions,
  ...spendsActions,
  ...profileActions,
}

const useActions = () => {
  const dispatch = useDispatch()

  return bindActionCreators(AllActions, dispatch)
}

export default useActions