import React, { useContext } from 'react';
import Icon from './icon';
import { PlayerContext } from '../../model';
import lang from '../../utils/local';
import styled from 'styled-components';
import { colorArr } from '../../utils/utils';

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
      <Icon type="subtitle" className="iconfont"></Icon>
      <div className="panel" style={{ right: '-100px' }}>
        <div className="container">
          <div className="secList">
            <p>{lang[state.lang].showSubtitle}</p>
            <div className="labelCon">
              <div
                className="labelList"
                style={state.subshow ? { backgroundColor: color } : {}}
                onClick={() => methods.changeSubShow(true)}
              >
                {lang[state.lang].subtitle}
              </div>
              <div
                className="labelList"
                style={!state.subshow ? { backgroundColor: color } : {}}
                onClick={() => methods.changeSubShow(false)}
              >
                {lang[state.lang].nosubtitle}
              </div>
            </div>
          </div>
          <div className="secList">
            <p>{lang[state.lang].subsize}</p>
            <div className="labelCon">
              {sizeArr.map((item: number, index: number) => (
                <div className="secLabel" onClick={() => methods.changeSubSize(item)} key={item}>
                  <span className="rate">{lang[state.lang]['subsize' + (index + 1)]}</span>
                  <span className="ratedot"></span>
                  {state.subsize === item && (
                    <span className="rateSelect" style={{ backgroundColor: color }}></span>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="secList">
            <p>{lang[state.lang].submargin}</p>
            <div className="labelCon">
              {sizeArr.map((item: number, index: number) => (
                <div className="secLabel" onClick={() => methods.changeSubMargin(item)} key={item}>
                  <span className="rate">{lang[state.lang]['submargin' + (index + 1)]}</span>
                  <span className="ratedot"></span>
                  {state.submargin === item && (
                    <span className="rateSelect" style={{ backgroundColor: color }}></span>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="secList" style={{ marginBottom: 0 }}>
            <p>{lang[state.lang].subcolor}</p>
            <div className="labelCon" style={{ marginTop: '8px' }}>
              {colorArr.map((item: string, index: number) => (
                <div
                  className="colorLabel"
                  onClick={() => methods.changeSubColor(index)}
                  key={item}
                  style={{ backgroundColor: item }}
                >
                  {state.subcolor === index && <Icon type="select" className="selectIcon"></Icon>}
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
