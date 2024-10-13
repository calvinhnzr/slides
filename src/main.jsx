import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { MDXProvider } from "@mdx-js/react"
import isPropValid from "@emotion/is-prop-valid"
import { StyleSheetManager, createGlobalStyle } from "styled-components"

import { App } from "./App.jsx"
import "@/global/reset.css"
import "@/global/index.css"
import "@/global/App.css"

const GlobalStyle = createGlobalStyle`
  h1, h2, h3, h4, h5, h6, p, li, label, th, td {
		color: white;
		font-family: "Roboto", sans-serif ;
	}
  h1 {
    font-size: 4.5rem;
    font-weight: bold;
  }
  h2 {
    font-size: 2.25rem;
    font-weight:  100;
    font-style: italic;
    line-height: 1.1;
  }
  h3 {
    font-size: 3rem;
    font-weight: bold;
    line-height: 1.2;
  }
`

function shouldForwardProp(propName, target) {
  if (typeof target === "string") {
    // For HTML elements, forward the prop if it is a valid HTML attribute
    return isPropValid(propName)
  }
  // For other elements, forward all props
  return true
}

const components = {
  // em: (props) => <i {...props} />,
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MDXProvider components={components}>
      <StyleSheetManager shouldForwardProp={shouldForwardProp}>
        <GlobalStyle />
        <App />
      </StyleSheetManager>
    </MDXProvider>
  </StrictMode>
)
