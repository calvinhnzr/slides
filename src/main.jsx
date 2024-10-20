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
import Stone from "@/components/render/Stone"
import Target from "@/components/render/Target"

import { Card, Container } from "@/components/styled/Card"
import {
  Headline,
  SubHeadline,
  Title,
  SubTitle,
} from "@/components/styled/Title"
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
      h1: Title,
      h2: SubTitle,
      h3: Headline,
      h4: SubHeadline,
      Card,
      Container,
      View,
      Scene,
      Box,
      Sphere,
      CameraControls,
      OrbitControls,
      Torus,
      Stone,
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
