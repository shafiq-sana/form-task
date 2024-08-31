import { Box, Stack } from '@chakra-ui/layout'
import { FormControl, FormErrorMessage, Grid, useRadioGroup } from '@chakra-ui/react'
import { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import FormTemplate from '../FormTemplate'
import { useFormFlow } from '../../context/FormContext'
import { BubbleRadioCard } from '../form-helpers/BubbleRadioCard'

interface PerformanceProps {
  onPerformanceSuccess: () => void
  onPrevPage: () => void
}

const Performance: FC<PerformanceProps> = ({
  onPerformanceSuccess,
  onPrevPage,
}) => {
  const [loadingSubmit, setLoadingSubmit] = useState(false)
  const options = Array.from({ length: 10 }, (_, i) => String(i + 1))

  const { formData, updateFormState } = useFormFlow()
  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({ defaultValues: { performance: formData.Performance?.toString() || '' } })

  const selectedValue = watch('performance')

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'performance',
    value: selectedValue,
    onChange: (value) => setValue('performance', value),
  })

  const group = getRootProps()

  const handlePerformanceSubmit = handleSubmit((data) => {
    setLoadingSubmit(true)
    const performanceValue = parseInt(data.performance, 10)

    if (formData.Performance !== performanceValue) {
      updateFormState({ Performance: performanceValue })
    }

    onPerformanceSuccess()
    setLoadingSubmit(false)
  })

  return (
    <FormTemplate
      prevButton="Back"
      nextButton="Continue"
      questionNumber={3}
      title={`On a scale of 1-10, with 10 being the highest, would you rate the following?\nThe usual performance of most other workers in a job similar to yours?`}
      isLoading={loadingSubmit}
      handlePrev={onPrevPage}
      handleNext={handlePerformanceSubmit}
    >
      <Box
        as="form"
        id="performance_form"
        onSubmit={handlePerformanceSubmit}
        w="full"
        maxW={{ base: '300px', md: '400px' }}
        noValidate
        textAlign="left"
      >
        <Stack my="6" w="full">
          <FormControl isInvalid={!!errors?.performance}>
            <Grid pl={60} templateColumns='repeat(5, 1fr)' gap={10} {...group}>
              {options.map((value) => {
                const radio = getRadioProps({ value })
                return (
                  <BubbleRadioCard key={value} {...radio} isChecked={selectedValue === value}>
                    {value}
                  </BubbleRadioCard>
                )
              })}
            </Grid>
            <FormErrorMessage>
              <>{errors?.performance?.message}</>
            </FormErrorMessage>
          </FormControl>
        </Stack>
      </Box>
    </FormTemplate>
  )
}

export default Performance
