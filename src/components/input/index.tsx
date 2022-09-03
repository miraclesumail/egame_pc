import React, { ChangeEvent, useState, useMemo } from "react";
import styled from "styled-components";
import classnames from "classnames";

type Props = {
  placeholder: string;
  id: string;
  inputCls?: string;
  errorMsg?: string;
  defaultValue?: string;
  value?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const Container = styled.div`
  width: 280px;
  height: 64px;
  position: relative;
  margin: 0 auto 30px auto;
  display: flex;
  justify-content: center;
  .input {
    width: 100%;
    height: 64px;
    padding-left: 20px;
    background: #4b3b3b;
    border-radius: 8px;
    font-size: 18px;
    outline: none;
    border: none;
    &.active {
      font-size: 16px;
      padding-top: 15px;
    }
    &.inValid {
      border: 1px solid #cb5460;
    }
  }
  .errorMsg {
    position: absolute;
    width: 100%;
    padding-left: 10px;
    bottom: -20px;
    font-size: 12px;
    color: #cb5460;
  }
  img {
    position: absolute;
    right: 10px;
    top: calc(50% - 12px);
    width: 24px;
    height: 24px;
  }
  .placeholder {
    color: #65657b;
    font-family: sans-serif;
    left: 20px;
    line-height: 14px;
    pointer-events: none;
    position: absolute;
    transform-origin: 0 50%;
    transition: transform 200ms, color 200ms;
    top: 25px;
    &.active {
      transform: translateY(-15px) translateX(0px) scale(0.7);
    }
  }
`;

const Index = ({ placeholder, value, onChange, errorMsg, inputCls, id }: Props) => {
  const [{ isFocus, hasReacted }, setState] = useState<any>({
    isFocus: false,
    hasReacted: false,
  });

  const active = useMemo(() => isFocus || value, [isFocus, value]);

  const inValid = useMemo(
    () => !isFocus && !value && hasReacted,
    [isFocus, value]
  );

  const onFocus = () => {
    console.log("onFocusonFocusonFocus");
    setState({ isFocus: true });
  };

  const onBlur = () => {
    console.log("onBluronBluronBlur");
    setState({ isFocus: false, hasReacted: true });
  };
  return (
    <Container>
      <input
        className={classnames(
          {
            input: true,
            active,
            inValid,
          },
          inputCls
        )}
        id={id}
        placeholder=""
        autoComplete="off"
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
      ></input>
      <label
        htmlFor={id}
        className={classnames({
          placeholder: true,
          active: active,
        })}
      >
        {placeholder}
      </label>
      {inValid && (
        <img src={require("@/assets/images/common/inputError.png")} />
      )}
      {value && hasReacted && !isFocus && (
        <img src={require("@/assets/images/common/inputSuccess.png")} />
      )}

      {inValid && errorMsg && <div className={"errorMsg"}>{errorMsg}</div>}
    </Container>
  );
};

export default Index;
