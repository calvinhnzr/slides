import styled from "styled-components"

import { COLOR_CARD } from "@/store/base"

export const Container = styled.div`
  display: grid;
  grid-template-columns: subgrid;
  grid-column: 2 / 12;
  grid-row: 3 / 11;
  gap: 4rem;
  z-index: 1000;
  position: relative;

  &.full {
    border-radius: 1rem;

    grid-column: 1 / 13;
    grid-row: 1 / 13;
  }

  &.side {
    /* background-color: ${COLOR_CARD}; */
    border-radius: 1rem;
    grid-column: 8 / 12;
    grid-row: 3 / 11;
  }
`

export const Card = styled.div`
  /* outline: 1px solid blue; */
  grid-column: span 5;
  background-color: ${COLOR_CARD};
  border-radius: 0.5rem;
`
