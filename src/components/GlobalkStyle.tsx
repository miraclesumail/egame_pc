import { createGlobalStyle } from "styled-components"
import { DESIGN_WIDTH, getWndowWidth } from '@/utils/tool';
const GlobalStyle = createGlobalStyle`
  html,body,#root {
    margin: 0;
    padding: 0;
    overflow: hidden;
    width:100%;
    height:100%;
  }
  *{
    margin: 0;
    padding: 0;
    outline:0;
    box-sizing:border-box;
  }
  html{
    font-size: ${getWndowWidth() / DESIGN_WIDTH}px;
  }
  body{
    font-size:12px;
  }
`
const GlobalView: React.FC = () => {
  return (
    <GlobalStyle />
  )
}
export default GlobalView








