import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { MDXProvider } from "@mdx-js/react"
import isPropValid from "@emotion/is-prop-valid"
import { StyleSheetManager, createGlobalStyle } from "styled-components"

import { App } from "./App.jsx"
import "@/styles/reset.css"
import "@/styles/index.css"
import "@/styles/App.css"

import { Card, Container } from "@/components/styled/Card"
import { Headline, SubHeadline, Title } from "@/components/styled/Title"

const GlobalStyle = createGlobalStyle`
  h1, h2, h3, h4, h5, h6, p, li, label, th, td {
		color: white;
		font-family: "Roboto", sans-serif ;
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

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <MDXProvider
    components={{
      h1: Headline,
      h2: SubHeadline,
      h3: Title,
      Card,
      Container,
    }}
  >
    <StyleSheetManager shouldForwardProp={shouldForwardProp}>
      <GlobalStyle />
      <App />
    </StyleSheetManager>
  </MDXProvider>
  // </StrictMode>
)
