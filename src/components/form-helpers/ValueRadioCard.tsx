import { BoxProps, useRadio, Flex, Box } from "@chakra-ui/react"
import { FC } from "react"

interface ValueRadioCardProps extends BoxProps {
  isChecked?: boolean
  option: { key: string, value: string }
}

export const ValueRadioCard: FC<ValueRadioCardProps> = ({ isChecked, option, ...props }) => {
  const { getInputProps } = useRadio(props)

  const input = getInputProps()

  return (
    <Box as="label">
      <input {...input} />
      <Box
        py={12}
        px={15}
        w="30em"
        h={50}
        display="flex"
        backgroundColor={isChecked ? "white" : "#d5d1d5"}
        color="#715166"
        borderRadius="5%"
        cursor="pointer"
        _hover={{ backgroundColor: "white" }}
      >
        <Flex gap={15}>
          <Box backgroundColor="#927d8e" color="white" borderRadius="10%" px={5}>
            {option.key}
          </Box>
          <Box>
            {option.value}
          </Box>
        </Flex>
      </Box>
    </Box>
  )
}