import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { MDXProvider } from "@mdx-js/react"
import isPropValid from "@emotion/is-prop-valid"
import {
  View,
  Box,
  Sphere,
  Torus,
  Stage,
  CameraControls,
  OrbitControls,
  Stars,
} from "@react-three/drei"
import { StyleSheetManager, createGlobalStyle } from "styled-components"

import { App } from "./App.jsx"

import "@/styles/reset.css"
import "@/styles/index.css"

import Tree from "@/components/render/Tree"
import Stones from "@/components/render/Stones"
import Target from "@/components/render/Target"

import { Card, Container } from "@/components/styled/Card"
import {
  Headline,
  SubHeadline,
  Title,
  SubTitle,
} from "@/components/styled/Title"

import { ol, ul, li } from "@/components/styled/List"
import { h1, h2, h3, h4, p, a, Mark, i, Em } from "@/components/styled/Text"
import { Content } from "@/components/styled/Content"

import { Scene } from "@/components/render/Scene"

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
      h1: h1,
      h2: h2,
      h3: h3,
      h4: h4,
      ol: ol,
      ul: ul,
      li: li,
      a: a,
      Mark,
      Em,
      Content,
      Card,
      Container,
      View,
      Scene,
      Box,
      Sphere,
      CameraControls,
      OrbitControls,
      Torus,
      Stones,
      Tree,
      Stage,
      Target,
    }}
  >
    <StyleSheetManager shouldForwardProp={shouldForwardProp}>
      <GlobalStyle />
      <App />
    </StyleSheetManager>
  </MDXProvider>
  // </StrictMode>
)
