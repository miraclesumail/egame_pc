import React, {
  ReactNode,
  ForwardRefExoticComponent,
  FunctionComponent,
} from "react";
import ReactDOM from "react-dom/client";

interface Props {
  Cmp: FunctionComponent<any>;
  props?: Record<string, any>;
  onCreated?: () => void;
  children?: ReactNode;
  styles?: any;
}



const createElement = (
  { Cmp, props, onCreated }: Props,
  parent: HTMLElement
) => {
  const div = document.createElement("div");

  parent.appendChild(div);
  const root = ReactDOM.createRoot(div);

  root.render(<Cmp {...props} />);

  onCreated && onCreated();

  return () => {
    root.unmount();
  };
};

export default createElement;
