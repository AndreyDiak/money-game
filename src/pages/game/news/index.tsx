import {
  CheckSquareOutlined,
  InboxOutlined,
} from "@ant-design/icons/lib/icons";
import { Button } from "antd";
import React, { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setPopupsActiveThunk,
  setPopupsShownThunk,
} from "../../../redux/game/game-reducer";
import { newsActions, newsArrayType } from "../../../redux/news/news-reducer";
import { settingsActions } from "../../../redux/settings/settings-reducer";
import {
  getMyStocksSelector,
  getStocksSelector,
} from "../../../redux/market/stocks-selector";
import { useTypedSelector } from "../../../utils/hooks/useTypedSelector";
import {
  getArchiveSelector,
  getNewsSelector,
} from "../../../redux/news/news-selector";
import { regionMap } from "../../../redux/game/realty/models";
import { popups } from "../../../redux/game/models";

const NewsPage = React.memo(() => {
  const dispatch = useDispatch();

  const news = useTypedSelector(getNewsSelector);
  const archive = useTypedSelector(getArchiveSelector);

  const [isArchiveShown, setIsArchiveShown] = useState(false);

  const readAllNews = () => {
    dispatch(newsActions.setAllToArchive());
  };

  return (
    <>
      <div className="gameNews">
        <div className="gameNewsContent">
          <div className="container">
            <div className="gameNewsMenu">
              {isArchiveShown ? (
                <Button onClick={() => setIsArchiveShown(false)}>
                  Новости
                </Button>
              ) : (
                <>
                  <Button onClick={() => setIsArchiveShown(true)}>
                    Архив <InboxOutlined />
                  </Button>
                  <Button onClick={() => readAllNews()}>Прочитать всё </Button>
                </>
              )}
            </div>
            {isArchiveShown ? (
              <div className="gameNewsBlocks gameNewsBlocks__reverse">
                {archive.map((newsBlock, index) => (
                  <RenderNewsBlock
                    key={index}
                    index={index}
                    news={newsBlock}
                    isArchive
                  />
                ))}
              </div>
            ) : (
              <div className="gameNewsBlocks">
                {news.map((newsBlock, index) => (
                  <RenderNewsBlock
                    key={index}
                    index={index}
                    news={newsBlock}
                    isArchive={false}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
});

interface NewsBlockType {
  news: newsArrayType;
  index: number;
  isArchive: boolean;
}

export const RenderNewsBlock: FC<NewsBlockType> = React.memo(
  ({ news, index, isArchive }) => {
    const dispatch = useDispatch();

    const stocks = useSelector(getStocksSelector);
    const myStocks = useSelector(getMyStocksSelector);
    const myRealty = useTypedSelector((state) => state.realtyPage.myRealty);
    const themeColor =
      news.type === "person"
        ? "#388e3c"
        : news.type === "stock"
        ? "#439093"
        : news.type === "realty"
        ? "#f4511e "
        : "#b71c1c";

    const moveToArchive = () => {
      dispatch(newsActions.setToArchive(index));
    };

    const onChangeTime = () => {
      dispatch(settingsActions.setTimeSpeed());
    };
    // открываем окно с акцией...
    const buyStocks = () => {
      stocks.forEach((stock, index) => {
        if (stock.title === news.company) {
          dispatch(setPopupsActiveThunk(popups.STOCK, stocks[index]));
        }
      });
      dispatch(setPopupsShownThunk(popups.STOCK, true));
      onChangeTime();
    };

    const sellStocks = () => {
      myStocks.forEach((stock, index) => {
        if (stock.title === news.company) {
          dispatch(setPopupsActiveThunk(popups.MY_STOCK, index));
        }
      });
      dispatch(setPopupsShownThunk(popups.MY_STOCK, true));
      onChangeTime();
    };

    const onSellRealty = () => {
      dispatch(setPopupsShownThunk(popups.REALTY_SELL, true));
    };

    return (
      <>
        <div className="gameNewsBlock">
          <div
            className="gameNewsBlock__Title"
            style={{ background: themeColor }}
          >
            <b>Новость!</b>
            <span style={{ color: "#def4e4" }}>
              {" "}
              / {news.month} {news.dayInMonth}
            </span>
          </div>
          <div className="gameNewsBlock__News">
            <div className="gameNewsBlock__NewsTitle">
              <b>{news.title}</b>
            </div>
            {/* если новость связана с акцией... */}
            {news.company !== "" && news.type === "stock" ? (
              <div className="gameNewsBlock__NewsCompany">
                <i>{news.company}</i>
              </div>
            ) : (
              ""
            )}
            {/* если новость связана с недвижимостью... */}
            {news.type === "realty" && news.realty.wanted ? (
              <div style={{ borderTop: "1px solid grey" }}>
                {/* props.company === 'low' | 'medium' | 'high */}
                <div className="gameNewsBlock__NewsRealty">
                  <div className="gameNewsBlock__NewsPrice">
                    <b>
                      Район: <i>{regionMap[news.realty.region]}</i>
                    </b>
                  </div>
                </div>
                {myRealty.some(
                  (realty) => realty.region === news.realty.region
                ) ? (
                  <Button onClick={onSellRealty}>Продать</Button>
                ) : (
                  "У вас нет недвижимости в этом районе."
                )}
              </div>
            ) : (
              ""
            )}
            {/*  */}
            {news.type === "stock" && news.condition === 0 ? (
              <div className="gameNewsBlock__NewsButton">
                <Button onClick={buyStocks}>Купить акцию</Button>
              </div>
            ) : (
              ""
            )}
            {/*  */}
            {news.type === "stock" &&
            news.condition === 1 &&
            myStocks.some((s) => s.title === news.company) ? (
              <div className="gameNewsBlock__NewsButton">
                <Button onClick={sellStocks}>Продать акцию</Button>
              </div>
            ) : (
              ""
            )}
            {/*  */}
            {news.amount !== 0 ? (
              <div className="gameNewsBlock__NewsPrice">
                {news.amount > 0 ? (
                  <>
                    Вы заработали
                    <span className="gameNewsBlock__NewsPriceBold">
                      ${news.amount}
                    </span>
                  </>
                ) : (
                  <>
                    {news.title === "Рождение ребенка это большое событие!" ? (
                      <>
                        Ежемесячная трата на ребенка:
                        <span className="gameNewsBlock__NewsPriceBold">
                          ${-news.amount}
                        </span>
                      </>
                    ) : (
                      <>
                        Вы потратили
                        <span className="gameNewsBlock__NewsPriceBold">
                          ${-news.amount}
                        </span>
                      </>
                    )}
                  </>
                )}
              </div>
            ) : (
              ""
            )}
          </div>
          {/* кнопка для помещения новости в архив . . . */}
          {isArchive ? (
            ""
          ) : (
            <div className="gameNewsBlock__Footer">
              <button
                onClick={() => moveToArchive()}
                className="gameNewsBlock__FooterButton"
              >
                <CheckSquareOutlined />
              </button>
              <div className="gameNewsBlock__FooterText">
                <b>Я прочитал</b>
              </div>
            </div>
          )}
        </div>
      </>
    );
  }
);

export default NewsPage;
