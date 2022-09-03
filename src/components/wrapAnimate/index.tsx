import React, {
  FC,
  useEffect,
  useRef,
  MutableRefObject,
  cloneElement,
  FunctionComponent,
  ReactNode,
} from "react";

type Props = {
  children?: ReactNode;
  Cmp: FunctionComponent<any>;
  /** 动画结束回调 */
  onAnimationend?: () => void;
  /** 应用动画类名 */
  animateClass: string;
  classNames?: string;
  [key: string]: any;
};

/**
 * 自定义动画组件
 * @param param0
 * @returns
 */
const wrapAnimate: FC<Props> = ({
  Cmp,
  children,
  classNames,
  animateClass,
  onAnimationend,
  ...rest
}) => {
  const ref: MutableRefObject<any> = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (animateClass) {
      ref.current.classList.add(animateClass);
      ref.current.addEventListener("animationend", () => {
        onAnimationend && onAnimationend();
        console.log("animationend");
      });
    }
  }, [animateClass]);

  return (
    <Cmp ref={ref} className={classNames} {...rest}>
      {children}
    </Cmp>
  );
};

export default wrapAnimate;
