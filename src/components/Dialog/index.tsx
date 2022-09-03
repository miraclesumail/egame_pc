import React, { useEffect, useRef, useState, memo } from "react";
import classnames from "classnames";
import { RequireOnlyOne } from "@/type";
import { createRoot, Root } from "react-dom/client";
import store from "@/store";
import { Locale } from "@/store/slices/config.slice";
import locales from "@/locales";
import scss from "./index.module.scss";

interface Button {
  type?: "hollow" | "solid";
  text?: React.ReactNode;
  action: () => void;
}

interface Props {
  title: string;
  visible: boolean;
  message?: string;
  buttons?: Button[];
  children?: React.ReactNode;
  zIndex?: number;
  onClose?: () => void;
  small?: boolean;
  onAnimationend?: () => void;
}

interface Params extends Omit<Props, "message" | "children" | "visible"> {
  message: string;
}

type RequireOne = RequireOnlyOne<Props, "message" | "children">;

const Index: React.FC<RequireOne> = (props) => {
  let { onClose, buttons = [] } = props;
  const {
    title,
    message,
    children,
    visible: visibleProps,
    onAnimationend,
    small,
  } = props;
  const wrapperEl = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState<boolean>(visibleProps);

  const state: any = store.getState();
  const locale = locales[state.config.locale as Locale];
  const defaultButton: Button[] = [
    {
      type: "hollow",
      text: locale.cancel,
      action: () => null,
    },
    {
      type: "solid",
      text: locale.ok,
      action: () => null,
    },
  ];

  buttons = buttons.map((item, index) => {
    return {
      ...defaultButton[index],
      ...item,
    };
  });

  onClose = onClose || buttons[0]?.action;
  useEffect(toggleVisible, [visibleProps]);

  function toggleVisible() {
    const wrapper = wrapperEl.current;
    if (visibleProps) {
      setVisible(visibleProps);
    } else {
      console.log("bind----bidbnppppp");
      wrapper && (wrapper.onanimationend = animationend);
    }
  }

  function animationend() {
    setVisible(false);
    onAnimationend && onAnimationend();
  }

  return visible ? (
    <div
      ref={wrapperEl}
      style={{zIndex: props.zIndex || 100}}
      className={classnames(
        scss.container,
        "animate__animated",
        visibleProps ? "animate__fadeIn" : "animate__fadeOut",
        small ? scss.small : ""
      )}
    >
      <div
        className={classnames(
          scss.dialog,
          "animate__animated",
          visibleProps ? "animate__zoomIn" : "animate__zoomOut"
        )}
      >
        <div className={scss.header}>
          <span>{title}</span>
          <a className={scss.header__close} onClick={onClose}></a>
        </div>
        <div className={scss.content}>
          {children || <p className={scss.message}>{message}</p>}
        </div>
        {!!buttons.length && (
          <div className={scss.footer}>
            {buttons.map((item, index) => (
              <button
                key={index}
                className={classnames(scss.button, scss[item.type as string])}
                onClick={item.action}
              >
                {item.text}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  ) : null;
};

function open(instanceId: string, params: Params): Root {
  const container = document.createElement("div");
  const root = createRoot(container);
  document.body.appendChild(container);
  container.setAttribute("id", instanceId);
  root.render(<Index visible {...params} />);
  return root;
}

function hide(instanceId: string, params: Params, root: Root) {
  params.onAnimationend = () => {
    const container = document.getElementById(instanceId);
    container?.parentNode?.removeChild(container);
    root.unmount();
  };
  root.render(<Index visible={false} {...params} />);
}

function dialog(params: Params): () => void {
  const instanceId = `dialog_${Date.now()}`;
  const root = open(instanceId, params);
  return hide.bind(null, instanceId, params, root);
}

export type { Button };
export { dialog };
export default memo(Index);
