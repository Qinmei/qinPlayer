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
      bottom: -20px;
      right: 0;
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
            width: 20%;
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
              width: 10%;
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
              width: 10%;
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

          .checkLabel {
            width: calc((100% - 16px) / 3);
            display: flex;
            justify-content: center;
            align-items: center;
            height: 26px;
            cursor: pointer;
            user-select: none;

            .check {
              width: 14px;
              height: 14px;
              margin-right: 6px;
              fill: currentColor;

              &.disable {
                opacity: 0.6;
              }
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

const rateArr = [0.5, 0.75, 1.0, 1.25, 1.5, 2.0];
const sizeArr = [50, 60, 70, 80, 90, 100];

const reactComponent: React.FC<{}> = (props) => {
  const data = useContext(PlayerContext);
  const { methods, state } = data;
  const { color } = state;

  const pipToggle = () => {
    methods.changePicture();
  };

  const supportPip = document.pictureInPictureEnabled;

  return (
    <Wrapper color={color}>
      <Icon type="setting" className="iconfont"></Icon>
      <div className="panel">
        <div className="container">
          <div className="secList">
            <p>{lang[state.lang].playMode}</p>
            <div className="labelCon">
              <div
                className="labelList"
                style={!state.loop ? { backgroundColor: state.color } : {}}
                onClick={() => {
                  methods.changeLoop(false);
                }}
              >
                {lang[state.lang].endStop}
              </div>
              <div
                className="labelList"
                style={state.loop ? { backgroundColor: state.color } : {}}
                onClick={() => {
                  methods.changeLoop(true);
                }}
              >
                {lang[state.lang].autoLoop}
              </div>
            </div>
          </div>
          <div className="secList">
            <p>{lang[state.lang].playRate}</p>
            <div className="labelCon">
              {rateArr.map((item: number) => (
                <div className="secLabel" onClick={() => methods.changeRate(item)} key={item}>
                  <span className="rate">
                    {[0.75, 1.25].includes(item) ? item : item.toFixed(1)}
                  </span>
                  <span className="ratedot"></span>
                  {state.rate === item && (
                    <span className="rateSelect" style={{ backgroundColor: state.color }}></span>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="secList">
            <p>{lang[state.lang].sizePercent}</p>
            <div className="labelCon">
              {sizeArr.map((item: number) => (
                <div className="secLabel" onClick={() => methods.changeSize(item)} key={item}>
                  <span className="rate">{(item / 100).toFixed(1)}</span>
                  <span className="ratedot"></span>
                  {state.size === item && (
                    <span className="rateSelect" style={{ backgroundColor: state.color }}></span>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="secList" style={{ marginBottom: 0 }}>
            <p>{lang[state.lang].playSetting}</p>
            <div className="labelCon">
              <div
                className="checkLabel"
                style={state.light ? { color: state.color } : {}}
                onClick={() => methods.changeLight()}
              >
                {!state.light ? (
                  <Icon type="nocheck" className="check"></Icon>
                ) : (
                  <Icon type="checked" className="check"></Icon>
                )}
                {lang[state.lang].noLight}
              </div>
              <div
                className="checkLabel"
                style={state.picture ? { color: state.color } : { opacity: supportPip ? 1 : 0.5 }}
                onClick={pipToggle}
              >
                {!state.picture ? (
                  <Icon type="nocheck" className="check"></Icon>
                ) : (
                  <Icon type="checked" className={'check'}></Icon>
                )}
                {lang[state.lang].picture}
              </div>
              <div
                className="checkLabel"
                style={state.movie ? { color: state.color } : {}}
                onClick={() => methods.changeMovie()}
              >
                {!state.movie ? (
                  <Icon type="nocheck" className="check"></Icon>
                ) : (
                  <Icon type="checked" className="check"></Icon>
                )}
                {lang[state.lang].intotheater}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};
export default reactComponent;
