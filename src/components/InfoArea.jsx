import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { chartInfoRoute } from "../utils/apiRoutes";

const InfoArea = ({ symbol, updateData }) => {
  const [data, setData] = useState({ name: "loading..." });
  const [error, setError] = useState(false);

  useEffect(() => {
    const call = async () => {
      const response = await axios.post(`${chartInfoRoute}`, {
        symbol: symbol,
      });
      if (response.data.error) {
        setError(true);
        return;
      } else{
        setError(false);
      }
      console.log("-------", response.data);
      setData(response.data);
    };
    call();
  }, [symbol]);

  const tile = "Loading...";
  let day = "";
  let month = "";
  let year = "";
  if (data.name !== "loading...") {
    const date = new Date(data.response.earningsDate.start);
    day = ("0" + date.getDate()).slice(-2);
    month = ("0" + (date.getMonth() + 1)).slice(-2);
    year = date.getFullYear();
    console.log(date, day, month, year);
  }

  return (
    <InfoContainer>
      <div className="info">
        {data.name === "loading..." ? (
          <h1>Loading...</h1>
        ) : (
          <>
            {error ? (
              <h1>Given API have no data about this company...</h1>
            ) : (
              <>
                <h1>{data.name}</h1>
                <h2>
                  {data.response.ask.value} {data.currency}
                </h2>
                <div className="summary">
                  <div className="item">
                    <div className="name">Previous Close</div>
                    <div className="value">{data.response.previousClose}</div>
                  </div>
                  <div className="item">
                    <div className="name">Open</div>
                    <div className="value">{data.response.open}</div>
                  </div>
                  <div className="item">
                    <div className="name">Bid</div>
                    <div className="value">
                      {data.response.bid.value} x {data.response.bid.shares}
                    </div>
                  </div>
                  <div className="item">
                    <div className="name">Ask</div>
                    <div className="value">
                      {data.response.ask.value} x {data.response.ask.shares}
                    </div>
                  </div>
                  <hr />
                  <div className="item">
                    <div className="name">Daily's Range</div>
                    <div className="value">
                      {data.response.dayRange.low} -{" "}
                      {data.response.dayRange.high}
                    </div>
                  </div>
                  <div className="item">
                    <div className="name">52 Week Range</div>
                    <div className="value">
                      {data.response.fiftyTwoWeekRange.low} -{" "}
                      {data.response.fiftyTwoWeekRange.high}
                    </div>
                  </div>
                  <hr />
                  <div className="item">
                    <div className="name">Volume</div>
                    <div className="value">{data.response.volume}</div>
                  </div>
                  <div className="item">
                    <div className="name">Avg. Volume</div>
                    <div className="value">{data.response.avgVolume}</div>
                  </div>

                  <div className="item">
                    <div className="name">Market Cap</div>
                    <div className="value">{data.response.marketCap}</div>
                  </div>
                  <hr />
                  <div className="item">
                    <div className="name">{`Beta (5Y Monthly)`}</div>
                    <div className="value">{data.response.beta}</div>
                  </div>
                  <div className="item">
                    <div className="name">{`PE Ratio (TTM)`}</div>
                    <div className="value">{data.response.peRatio}</div>
                  </div>
                  <div className="item">
                    <div className="name">{`EPS (TTM)`}</div>
                    <div className="value">{data.response.eps}</div>
                  </div>
                  <hr />
                  <div className="item">
                    <div className="name">Forward Dividend & Yield</div>
                    <div className="value">
                      {data.response.forwardDividend}
                      {`(${data.response.forwardYield}%)`}
                    </div>
                  </div>
                  <div className="item">
                    <div className="name">Earnings Date</div>
                    <div className="value">{`${day}/${month}/${year}`}</div>
                  </div>
                  <div className="item">
                    <div className="name">{`1y Target Est`}</div>
                    <div className="value">
                      {data.response.oneYearTargetEst}
                    </div>
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </InfoContainer>
  );
};

const InfoContainer = styled.div`
  flex: 1;
  height: 130vh;
  background-color: #f5f5f5;
  .info {
    // height: 100%;
    padding-bottom: 50px;
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .summary {
      margin-top: 40px;
      padding: 20px 0px 20px 0px;
      width: 80%;
      background-color: rgba(0, 0, 0, 0.1);
      border-radius: 10px;
      box-shadow: 0 10px 10px rgba(0, 0, 0, 0.3);
      hr {
        margin: 10px 0px 10px 0px;
      }
      .item {
        width: 100%;
        display: flex;
        justify-content: space-between;
        padding: 10px 20px;
        box-sizing: border-box;
        .name {
          font-size: 1rem;
          font-weight: 500;
        }
        .value {
          font-size: 1rem;
          font-weight: 500;
        }
      }
    }
    h1 {
    }
  }
`;

export default InfoArea;
