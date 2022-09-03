import classnames from "classnames";
import React, { FC, ReactNode, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Column, Row } from "../flex";

interface Props {
  maskClosable?: boolean;
  maskBackground?: string;
  modalWidth: number;
  visible: boolean;
  onClose: () => void;
  onAnimationend?: () => void;
  children?: React.ReactNode;
}

const defaultBg = "rgba(101, 90, 70, 0.7)";

const Mask = styled(Row)`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 800;
  max-width: 100%;
  background: ${(props: any) => props.maskBackground};
  animation-duration: 500ms;
  cursor: pointer;
`;

const Modal = styled(Column)`
  position: absolute;
  width: ${(props: any) => `${props.modalWidth}px`};
  height: 100%;
  right: 0px;
  bottom: 0px;
  background: rgb(23, 23, 23, 0.8);
  z-index: 15;
  animation-duration: 500ms;
`;

const SlideModal: FC<Props> = ({
  maskBackground = defaultBg,
  maskClosable = true,
  visible: visibleProps,
  modalWidth = null,
  children,
  onClose,
  onAnimationend,
}) => {
  const wrapperEl = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(visibleProps);

  function animationend() {
    setVisible(false);
    onAnimationend && onAnimationend();
  }

  function toggleVisible() {
    if (visibleProps) {
      setVisible(true);
    } else {
      wrapperEl.current && (wrapperEl.current.onanimationend = animationend);
    }
  }

  function onMaskClick(e: MouseEvent) {
    if (
      maskClosable &&
      (e.target as HTMLDivElement).classList.contains("mask")
    ) {
      onClose();
    }
  }

  useEffect(toggleVisible, [visibleProps]);

  return visible ? (
    <Mask
      {...{ maskBackground }}
      iref={wrapperEl}
      onClick={onMaskClick}
      className={classnames(
        "mask",
        "animate__animated",
        visibleProps ? "animate__fadeIn" : "animate__fadeOut"
      )}
    >
      <Modal
        {...{ modalWidth }}
        className={classnames(
          "animate__animated",
          visibleProps ? "animate__slideInRight" : "animate__slideOutRight"
        )}
      >
        {children}
      </Modal>
    </Mask>
  ) : null;
};

export default SlideModal;
