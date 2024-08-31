import { Box, BoxProps, useRadio } from "@chakra-ui/react"
import { FC } from "react"

interface BubbleRadioCardProps extends BoxProps {
  isChecked?: boolean
  children: React.ReactNode
}

export const BubbleRadioCard: FC<BubbleRadioCardProps> = (props) => {
  const { getInputProps } = useRadio(props)

  const input = getInputProps()

  return (
    <Box as="label">
      <input {...input} />
      <Box
        boxSize={50}
        py={12}
        px={15}
        display="flex"
        alignItems="center"
        justifyContent="center"
        backgroundColor={props.isChecked ? "white" : "#d5d1d5"}
        color="#715166"
        borderRadius="50%"
        cursor="pointer"
        _hover={{ backgroundColor: "white" }}
      >
        {props.children}
      </Box>
    </Box>
  )
}