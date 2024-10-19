import styled from "styled-components"

import { COLOR_BACKGROUND_EXPLOSION, COLOR_BACKGROUND } from "@/store/base"

export const Container = styled.div`
  /* background-color: ${COLOR_BACKGROUND_EXPLOSION}; */
  display: grid;
  grid-template-columns: subgrid;
  grid-column: 2 / 12;
  grid-row: 3 / 11;
  gap: 4rem;
  z-index: 1000;
  position: relative;

  &.full {
    outline: 1px solid red;
    grid-column: 1 / 13;
    grid-row: 1 / 13;
  }
  &.side {
    grid-column: 8 / 13;
    grid-row: 1 / 13;
  }
`

export const Card = styled.div`
  /* outline: 1px solid blue; */
  grid-column: span 5;
  background-color: ${COLOR_BACKGROUND};
  border-radius: 0.5rem;
`
