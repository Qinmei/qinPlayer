import React, { useContext, useState } from 'react';
import { PlayerContext, SourceType } from '../../model';
import styled from 'styled-components';

const Wrapper = styled.div`
  min-width: 50px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: relative;

  .label {
    color: white;
    font-size: 14px;
    padding: 0 10px;
    white-space: nowrap;
  }

  .panel {
    position: absolute;
    bottom: 45px;
    right: transform(translateX(-50%));
    cursor: default;
    color: #fff;
    box-sizing: border-box;
    background: rgba(21, 21, 21, 0.9);
    border-radius: 2px;
    padding: 5px 0;
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

      .list {
        font-size: 14px;
        white-space: nowrap;
        padding: 5px 20px;
        cursor: pointer;

        &:hover {
          background-color: rgba(255, 255, 255, 0.2);
        }

        &.active {
          color: ${(props: { color: string }) => props.color};
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

const reactComponent: React.FC<{}> = (props) => {
  const data = useContext(PlayerContext);
  const { methods, state } = data;
  const { color, source } = state;

  const [select, setSelect] = useState(source[0]);
  const [show, setShow] = useState(false);

  const changeSource = (value: SourceType) => {
    if (select === value) return;
    setSelect(value);
    setShow(false);
    methods.changeSource(value.value);
    methods.changePlay(false);
    methods.changeCurrent();
  };

  return (
    <Wrapper color={color}>
      <span className="label" onMouseOver={() => setShow(true)}>
        {select.label}
      </span>
      {show && (
        <div className="panel">
          <div className="container">
            {source.map((item) => (
              <div
                className={`list ${select === item && 'active'}`}
                key={item.label + item.value}
                onClick={() => changeSource(item)}
              >
                {item.label}
              </div>
            ))}
          </div>
        </div>
      )}
    </Wrapper>
  );
};
export default reactComponent;
