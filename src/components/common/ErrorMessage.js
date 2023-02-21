import React from "react";
import { Badge } from "native-base";

const ErrorMessage = ({ message, colorScheme }) => {
  return (
    <Badge colorScheme={colorScheme} alignSelf="center" variant={'subtle'}>
      {message}
    </Badge>
  )
}

export default ErrorMessage
