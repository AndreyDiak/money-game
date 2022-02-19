import { BondType } from "../../../../redux/stocks-reducer"
import {useSelector} from 'react-redux'
import { AppStateType } from "../../../../redux/store"
import { FC } from "react"
import { getBondsSelector } from "../../../../redux/stocks-selector"

type BondsType = {
  setIsHistoryShown: (isHistoryShown: boolean) => void
  setActiveStock: (activeStock: BondType) => void
}
export const Bonds: FC<BondsType> = ({setActiveStock, setIsHistoryShown}) => {

  const bonds: BondType[] = useSelector(getBondsSelector)
  
  return (
    <>

    </>
  )
}