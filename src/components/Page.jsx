import { styled } from "styled-components"

import { COLOR_BACKGROUND, COLOR_BACKGROUND_DARK } from "@/store/base"
import "@/global/Page.css"

const Page = styled.section`
  width: 100%;
  height: 100%;
  flex: 0 0 auto;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(12, 1fr);
  gap: 1rem;
  background-color: ${COLOR_BACKGROUND};
  &:first-of-type {
    background-color: ${COLOR_BACKGROUND_DARK};
  }
`
export default Page
