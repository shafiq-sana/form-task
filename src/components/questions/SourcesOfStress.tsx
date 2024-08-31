import { FormControl, FormErrorMessage } from '@chakra-ui/form-control'
import { Box, Text, Stack } from '@chakra-ui/layout'
import { Textarea } from '@chakra-ui/react'
import { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import FormTemplate from '../FormTemplate'
import { useFormFlow } from '../../context/FormContext'

interface SourcesOfStressProps {
  onSourcesOfStressSuccess: () => void
  onPrevPage: () => void
}

const SourcesOfStress: FC<SourcesOfStressProps> = ({
  onSourcesOfStressSuccess,
  onPrevPage,
}) => {
  const [loadingSubmit, setLoadingSubmit] = useState(false)

  const { formData, updateFormState } = useFormFlow()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const handlesourcesOfStressSubmit = handleSubmit((data) => {
    setLoadingSubmit(true)

    if (formData.SourcesOfStress !== data.sourcesOfStress) {
      updateFormState({ SourcesOfStress: data.sourcesOfStress })
    }

    onSourcesOfStressSuccess()
    setLoadingSubmit(false)
  })

  return (
    <FormTemplate
      prevButton="Back"
      nextButton="Continue"
      questionNumber={4}
      title="Are there any other sources of stress not mentioned here that affect you?"
      displayInfo={true}
      infoLabel="Knowing other work or non- work drivers of stress may help your organization implement practices to counter these factors."
      isLoading={loadingSubmit}
      handlePrev={onPrevPage}
      handleNext={handlesourcesOfStressSubmit}
    >
      <Box
        as="form"
        id="sources_of_stress_form"
        onSubmit={handlesourcesOfStressSubmit}
        w="full"
        maxW={{ base: '300px', md: '400px' }}
        noValidate
        textAlign="left"
        pl="3rem"
      >
        <Text fontSize="xs">
          Please enter upto 250 characters below.
        </Text>
        <Stack my="6" w="full">
          <FormControl isInvalid={!!errors?.sourcesOfStress}>
            <Textarea
              id="sources-of-stress"
              borderRadius="10%"
              backgroundColor="#927d8e"
              w="33rem"
              p="1em"
              _focus={{ outline: "none" }}
              autoComplete="off"
              {...register('sourcesOfStress', {
                value: formData.SourcesOfStress,
                required: {
                  value: true,
                  message: "required"
                },
                maxLength: {
                  value: 250,
                  message: "Only 250 characters allowed."
                },
                setValueAs: (value) => value.trim(),
              })}
            />
            <FormErrorMessage>
              <>{errors?.sourcesOfStress?.message}</>
            </FormErrorMessage>
          </FormControl>
        </Stack>
      </Box>
    </FormTemplate>
  )
}

export default SourcesOfStress
