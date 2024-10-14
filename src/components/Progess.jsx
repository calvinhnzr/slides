import styled from "styled-components"
import { useAtom } from "jotai"
import { COLOR_ACCENT, COLOR_BACKGROUND } from "@/store/base"
import { MIN_VALUE, MAX_VALUE, currentHorizontalAtom } from "@/store/atoms"

const myDarkGrey = COLOR_BACKGROUND
const myBlue = COLOR_ACCENT

const StyledProgress = styled.progress`
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

const Progress = () => {
  const [currentHorizont] = useAtom(currentHorizontalAtom)

  return <StyledProgress value={currentHorizont} max={MAX_VALUE} />
}

export default Progress
