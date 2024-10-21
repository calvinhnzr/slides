import React from "react"
import styled from "styled-components"
import { COLOR_INTRO, COLOR_OUTRO } from "@/store/base"

export const ul = styled.ul`
  padding-left: 1.5rem;

  li {
    padding-left: 0.75rem;
    font-weight: 300;
    margin-bottom: 2rem;
    font-size: 2rem;
    width: fit-content;

    position: relative;
    z-index: 1;
    padding: 1rem 0;

    &::before {
      content: "...";
      position: absolute;
      left: -1.5rem;
    }

    em {
      padding: 1rem;
      margin: 0 0.5rem;
      background-color: #4c5869;

      &.green {
        background-color: #81ad97;
      }
      &.red {
        background-color: #da736b;
      }
      font-weight: 400;
    }
  }
`

export const ol = styled.ol`
  list-style: decimal;
`

export const li = styled.li`
  font-weight: 300;
  margin-bottom: 2rem;
  font-size: 2rem;
  &:has(> a) {
    padding: 0.25rem 0;
    padding-left: 0.75rem;
  }
`
