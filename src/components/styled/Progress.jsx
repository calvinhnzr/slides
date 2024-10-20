import styled from "styled-components"
import { COLOR_SECTION, COLOR_EXPLOSION } from "@/store/base"

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
    color: ${COLOR_EXPLOSION};

    background-color: ${COLOR_SECTION};
  }
  &[value]::-webkit-progress-value {
    background-color: ${COLOR_EXPLOSION};
    transition: width 0.5s ease-in-out;
  }
  &[value]::-webkit-progress-bar {
    background-color: ${COLOR_SECTION};
  }
`
