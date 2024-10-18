import styled from "styled-components"

import { COLOR_BACKGROUND_EXPLOSION, COLOR_BACKGROUND } from "@/store/base"

export const Container = styled.div`
  /* outline: 1px solid red; */
  background-color: ${COLOR_BACKGROUND_EXPLOSION};
  display: grid;
  grid-template-columns: subgrid;
  grid-column: 2 / 12;
  grid-row: 3 / 11;
  gap: 4rem;
`

export const Card = styled.div`
  /* outline: 1px solid blue; */
  grid-column: span 5;
  background-color: ${COLOR_BACKGROUND};
  border-radius: 0.5rem;
`
