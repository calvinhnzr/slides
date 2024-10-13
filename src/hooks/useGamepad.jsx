import { useEffect, useState, useRef } from "react"

const useGamepad = (enableDelay = true) => {
  const [buttons, setButtons] = useState([])
  const [axes, setAxes] = useState([])
  const buttonPressTimers = useRef({})

  useEffect(() => {
    const handleGamepadConnected = (event) => {
      console.log("Gamepad connected:", event.gamepad)
    }

    const handleGamepadDisconnected = (event) => {
      console.log("Gamepad disconnected:", event.gamepad)
    }

    const updateGamepadState = () => {
      const gamepads = navigator.getGamepads()
      if (gamepads[0]) {
        const newButtons = gamepads[0].buttons.map((button, index) => {
          if (enableDelay) {
            if (button.pressed && !buttonPressTimers.current[index]) {
              // Button pressed and no timer running for this button
              buttonPressTimers.current[index] = setTimeout(() => {
                delete buttonPressTimers.current[index]
              }, 500) // Adjust delay as needed
              return button.value
            } else if (!button.pressed && buttonPressTimers.current[index]) {
              // Button released while timer is running, clear the timer
              clearTimeout(buttonPressTimers.current[index])
              delete buttonPressTimers.current[index]
              return 0
            } else if (buttonPressTimers.current[index]) {
              // Timer is running, ignore input
              return 0
            } else {
              // No timer and button is not pressed or pressed without a delay
              return button.value
            }
          } else {
            // Delay is disabled, return button value directly
            return button.value
          }
        })

        setButtons(newButtons)
        setAxes(gamepads[0].axes)
      }
    }

    window.addEventListener("gamepadconnected", handleGamepadConnected)
    window.addEventListener("gamepaddisconnected", handleGamepadDisconnected)

    let intervalId

    if (enableDelay) {
      intervalId = setInterval(updateGamepadState, 16) // Approximately 60fps
    } else {
      intervalId = setInterval(updateGamepadState, 33) // Approximately 30fps
    }

    return () => {
      window.removeEventListener("gamepadconnected", handleGamepadConnected)
      window.removeEventListener(
        "gamepaddisconnected",
        handleGamepadDisconnected
      )
      clearInterval(intervalId)
      for (const timer in buttonPressTimers.current) {
        clearTimeout(buttonPressTimers.current[timer])
      }
    }
  }, [enableDelay])

  return { buttons, axes }
}

export default useGamepad
