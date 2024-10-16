import styled from "styled-components"
import { COLOR_ACCENT, COLOR_BACKGROUND } from "@/store/base"

const myDarkGrey = COLOR_BACKGROUND
const myBlue = COLOR_ACCENT

export const Progress = styled.progress`
  z-index: 100;
  display: inherit;
  -webkit-appearance: none;
  appearance: none;
  position: absolute;
  bottom: 0;
  height: 0.75rem;
  width: 100%;

  &[value] {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border: none;
    color: ${myDarkGrey};

    background-color: ${myBlue};
  }
  &[value]::-webkit-progress-value {
    background-color: ${myDarkGrey};
    transition: width 0.5s ease-in-out;
  }
  &[value]::-webkit-progress-bar {
    background-color: ${myBlue};
  }
`
