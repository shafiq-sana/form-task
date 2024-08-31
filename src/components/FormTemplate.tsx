import { Button } from '@chakra-ui/button'
import { InfoOutlineIcon } from '@chakra-ui/icons'
import { Box, Flex, Heading } from '@chakra-ui/layout'
import { Tooltip } from '@chakra-ui/react'
import { FC, ReactNode } from 'react'

interface FormTemplateProps {
  children: ReactNode
  prevButton?: string
  nextButton: string
  isLoading?: boolean
  questionNumber: number
  title?: string
  displayInfo?: boolean
  infoLabel?: string
  handlePrev: () => void
  handleNext: () => void
}

const FormTemplate: FC<FormTemplateProps> = ({
  children,
  prevButton,
  nextButton,
  isLoading = false,
  questionNumber,
  title,
  displayInfo = false,
  infoLabel,
  handlePrev,
  handleNext,
}) => {
  return (
    <Flex
      position="relative"
      minH="100vh"
      direction="column"
      align="center"
      textAlign="center"
      w="full"
    >
      <Flex
        position="relative"
        direction="column"
        w="full"
        maxW="50em"
        py="20em"
        justify="center"
      >
        {title && (
          <Flex gap={10}>
            <Box
              p="0.23rem"
              boxSize="2rem"
              alignContent="center"
              backgroundColor="#d5d1d5"
              color="#715166"
              borderRadius="50%"
            >
              {questionNumber}
            </Box>
            <Box w="full">
              <Heading maxW="40em" whiteSpace="pre-line">
                {title}
              </Heading>
            </Box>
            {
              displayInfo &&
              <Tooltip
                hasArrow
                backgroundColor='#d5d1d5'
                color='#715166'
                p={5}
                borderRadius="10%"
                label={infoLabel}
                fontSize='md'
              >
                <InfoOutlineIcon w={20} h={20} p={1} />
              </Tooltip>
            }
          </Flex>

        )}
        {children}
      </Flex>
      <Flex
        position="fixed"
        bottom={0}
        w="100vw"
        h="85px"
        minH="85px"
        px="2rem"
        align="center"
        justify={prevButton ? "space-between" : "end"}
        borderTopWidth="1px"
      >
        {prevButton &&
          <Button
            w="full"
            onClick={handlePrev}
            isDisabled={isLoading}
          >
            {prevButton}
          </Button>
        }
        <Button
          w="full"
          isLoading={isLoading}
          isDisabled={isLoading}
          onClick={handleNext}
        >
          {nextButton}
        </Button>
      </Flex>
    </Flex >
  )
}

export default FormTemplate
