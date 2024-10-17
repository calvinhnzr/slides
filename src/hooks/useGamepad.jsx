import { useEffect, useState, useRef, useCallback } from "react"

const useGamepad = (enableDelay = true) => {
  // State to store the current state of buttons and axes
  const [buttons, setButtons] = useState([])
  const [axes, setAxes] = useState([])

  // Refs to store button press timers and animation frame ID
  const buttonPressTimers = useRef({})
  const animationFrameId = useRef(null)

  // Function to update the gamepad state
  const updateGamepadState = useCallback(() => {
    const gamepads = navigator.getGamepads()
    if (gamepads[0]) {
      const newButtons = gamepads[0].buttons.map((button, index) => {
        if (enableDelay) {
          // Handle button press with delay
          if (button.pressed && !buttonPressTimers.current[index]) {
            buttonPressTimers.current[index] = setTimeout(() => {
              delete buttonPressTimers.current[index]
            }, 500) // Adjust delay as needed
            return button.value
          } else if (!button.pressed && buttonPressTimers.current[index]) {
            clearTimeout(buttonPressTimers.current[index])
            delete buttonPressTimers.current[index]
            return 0
          } else if (buttonPressTimers.current[index]) {
            return 0
          } else {
            return button.value
          }
        } else {
          // Handle button press without delay
          return button.value
        }
      })

      // Update buttons state only if it has changed
      setButtons((prevButtons) => {
        if (JSON.stringify(prevButtons) !== JSON.stringify(newButtons)) {
          return newButtons
        }
        return prevButtons
      })

      // Update axes state only if it has changed
      setAxes((prevAxes) => {
        if (JSON.stringify(prevAxes) !== JSON.stringify(gamepads[0].axes)) {
          return gamepads[0].axes
        }
        return prevAxes
      })
    }

    // Request the next animation frame to update the gamepad state
    animationFrameId.current = requestAnimationFrame(updateGamepadState)
  }, [enableDelay])

  useEffect(() => {
    // Event handler for gamepad connection
    const handleGamepadConnected = (event) => {
      console.log("Gamepad connected:", event.gamepad)
    }

    // Event handler for gamepad disconnection
    const handleGamepadDisconnected = (event) => {
      console.log("Gamepad disconnected:", event.gamepad)
    }

    // Add event listeners for gamepad connection and disconnection
    window.addEventListener("gamepadconnected", handleGamepadConnected)
    window.addEventListener("gamepaddisconnected", handleGamepadDisconnected)

    // Start the animation frame loop to update the gamepad state
    animationFrameId.current = requestAnimationFrame(updateGamepadState)

    // Cleanup function to remove event listeners and cancel animation frame
    return () => {
      window.removeEventListener("gamepadconnected", handleGamepadConnected)
      window.removeEventListener(
        "gamepaddisconnected",
        handleGamepadDisconnected
      )

      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }

      // Clear any remaining button press timers
      for (const timer in buttonPressTimers.current) {
        clearTimeout(buttonPressTimers.current[timer])
      }
    }
  }, [updateGamepadState])

  // Return the current state of buttons and axes
  return { buttons, axes }
}

export default useGamepad
