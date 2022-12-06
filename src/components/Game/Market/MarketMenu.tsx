import { Button, Select } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import { marketFilters, optionsMarketFilters } from "../../../redux/market/models";

const { Option } = Select;

const DesktopMarketFilters = optionsMarketFilters
  .filter(options => options.value !== marketFilters.PORTFOLIO);

const MarketMenu = () => {

  const [screenWidth] = useState(window.screen.width);

  return (
    <>
      {screenWidth > 768 ? DesktopMarketFilters
        .map((option, index) =>
          <div className="gameProfitMenu__item">
            <Button>
              <Link key={index} to={option.value}>
                {option.label}
              </Link>
            </Button>
          </div>) : (
        <Select defaultValue={marketFilters.STOCKS}>
          {optionsMarketFilters
            .map((option, index) => <Option value={option.value}>
              <Link key={index} to={option.value}>
                {option.label}
              </Link>
            </Option>
            )}
        </Select>
      )};
    </>
  )
}



export default MarketMenu;