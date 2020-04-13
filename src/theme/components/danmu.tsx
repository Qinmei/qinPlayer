import React, { useContext } from 'react';
import Icon from './icon';
import { PlayerContext } from '../../model';
import lang from '../../utils/local';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 35px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: relative;

  .iconfont {
    width: 25px;
    height: 20px;
    color: white;
    fill: currentColor;
  }

  .panel {
    position: absolute;
    bottom: 45px;
    right: -65px;
    cursor: default;
    color: #fff;
    width: 266px;
    box-sizing: border-box;
    background: rgba(21, 21, 21, 0.9);
    border-radius: 2px;
    padding: 12px 20px;
    text-align: left;
    font-size: 12px;
    display: none;

    &:before {
      content: '';
      width: 100%;
      height: 30px;
      position: absolute;
      bottom: -15px;
      right: 0;
      z-index: 29;
    }

    &:after {
      content: '';
      width: 35px;
      height: 30px;
      position: absolute;
      bottom: -20px;
      right: 65px;
      z-index: 29;
    }

    .container {
      width: 100%;
      height: auto;

      p {
        margin: 0;
        user-select: none;
      }

      .secList {
        margin-bottom: 12px;
        .labelCon {
          display: flex;
          justify-content: space-between;
          align-items: center;

          .labelList {
            margin-top: 6px;
            width: calc((100% - 8px) / 2);
            background-color: hsla(0, 0%, 100%, 0.3);
            line-height: 24px;
            border-radius: 2px;
            text-align: center;
            cursor: pointer;

            &:hover {
              background-color: hsla(0, 0%, 100%, 0.4);
            }
          }

          .secLabel {
            width: 25%;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 26px;
            cursor: pointer;
            user-select: none;
            padding-bottom: 3px;
            border-bottom: solid 2px hsla(0, 0%, 100%, 0.3);
            position: relative;

            .ratedot {
              position: absolute;
              bottom: -3px;
              height: 4px;
              width: 2px;
              background-color: hsla(0, 0%, 100%, 0.3);
            }

            .rateSelect {
              width: 12px;
              height: 12px;
              border-radius: 50%;
              position: absolute;
              bottom: -7px;
            }

            &:nth-child(1) {
              width: 12.5%;
              text-align: left;

              .rate {
                margin-left: -4px;
              }

              .ratedot {
                left: 0;
              }

              .rateSelect {
                left: 0px;
              }
            }

            &:nth-last-child(1) {
              width: 12.5%;
              text-align: right;

              .rate {
                margin-right: -4px;
              }

              .ratedot {
                right: 0;
              }

              .rateSelect {
                right: 0px;
              }
            }
          }

          .colorLabel {
            width: 18px;
            height: 18px;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;

            .selectIcon {
              width: 14px;
              height: 14px;
              color: white;
              fill: currentColor;
            }
          }
        }
      }
    }
  }

  &:hover {
    .panel {
      display: inline-block;
    }
  }
`;

const sizeArr = [0, 1, 2, 3, 4];

const reactComponent: React.FC<{}> = (props) => {
  const data = useContext(PlayerContext);
  const { methods, state } = data;
  const { color } = state;

  return (
    <Wrapper color={color}>
      <Icon type="danmu" className="iconfont"></Icon>
      <div className="panel" style={{ right: '-100px' }}>
        <div className="container">
          <div className="secList">
            <p>{lang[state.lang].danmuSetting}</p>
            <div className="labelCon">
              <div
                className="labelList"
                style={state.danmuShow ? { backgroundColor: color } : {}}
                onClick={() => methods.changeDanmuShow(true)}
              >
                {lang[state.lang].danmu}
              </div>
              <div
                className="labelList"
                style={!state.danmuShow ? { backgroundColor: color } : {}}
                onClick={() => methods.changeDanmuShow(false)}
              >
                {lang[state.lang].nodanmu}
              </div>
            </div>
          </div>
          <div className="secList">
            <p>{lang[state.lang].danmuFont}</p>
            <div className="labelCon">
              {sizeArr.map((item: number, index: number) => (
                <div className="secLabel" onClick={() => methods.changeDanmuFont(item)} key={item}>
                  <span className="rate">{lang[state.lang]['danmuFont' + (index + 1)]}</span>
                  <span className="ratedot"></span>
                  {state.danmuFont === item && (
                    <span className="rateSelect" style={{ backgroundColor: color }}></span>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="secList">
            <p>{lang[state.lang].danmuOpacity}</p>
            <div className="labelCon">
              {sizeArr.map((item: number, index: number) => (
                <div
                  className="secLabel"
                  onClick={() => methods.changeDanmuOpacity(item)}
                  key={item}
                >
                  <span className="rate">{lang[state.lang]['danmuOpacity' + (index + 1)]}</span>
                  <span className="ratedot"></span>
                  {state.danmuOpacity === item && (
                    <span className="rateSelect" style={{ backgroundColor: color }}></span>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="secList">
            <p>{lang[state.lang].danmuArea}</p>
            <div className="labelCon">
              {sizeArr.map((item: number, index: number) => (
                <div className="secLabel" onClick={() => methods.changeDanmuArea(item)} key={item}>
                  <span className="rate">{lang[state.lang]['danmuArea' + (index + 1)]}</span>
                  <span className="ratedot"></span>
                  {state.danmuArea === item && (
                    <span className="rateSelect" style={{ backgroundColor: color }}></span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};
export default reactComponent;
