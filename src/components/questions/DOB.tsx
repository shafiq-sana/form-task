import { FormControl, FormErrorMessage } from '@chakra-ui/form-control'
import { Box, Stack } from '@chakra-ui/layout'
import { Flex } from '@chakra-ui/react'
import { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import FormTemplate from '../FormTemplate'
import NumberField from '../form-helpers/NumberField'
import { useFormFlow } from '../../context/FormContext'

interface DOBProps {
  onDOBSuccess: () => void
  onPrevPage: () => void
}

const DOB: FC<DOBProps> = ({
  onDOBSuccess,
  onPrevPage,
}) => {
  const [loadingSubmit, setLoadingSubmit] = useState(false)

  const { formData, updateFormState } = useFormFlow()
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm()

  const handleDOBSubmit = handleSubmit((data) => {
    setLoadingSubmit(true)

    const dob = new Date(data.year, data.month - 1, data.day)

    if (formData.DOB !== dob) {
      updateFormState({ DOB: dob })
    }

    onDOBSuccess()
    setLoadingSubmit(false)
  })

  return (
    <FormTemplate
      prevButton="Back"
      nextButton="Continue"
      questionNumber={2}
      title='Date of Birth'
      displayInfo={true}
      infoLabel='Your Date of birth is required to accurately calculate your health age.'
      isLoading={loadingSubmit}
      handlePrev={onPrevPage}
      handleNext={handleDOBSubmit}
    >
      <Box
        as="form"
        id="dob_form"
        onSubmit={handleDOBSubmit}
        w="full"
        ml={40}
        maxW={{ base: '300px', md: '400px' }}
        noValidate
        textAlign="left"
      >
        <Stack my="6" w="full">
          <FormControl color="black" isInvalid={!!errors?.day || !!errors?.month || !!errors?.year}>
            <Flex gap="1em">
              <NumberField
                max={31}
                placeholder="DD"
                valueName="day"
                value={watch('day') || formData.DOB?.getDate() || ''}
                onChange={(valueString) => setValue('day', parseInt(valueString, 10))}
                register={register('day', { required: true })}
              />

              <NumberField
                max={12}
                placeholder="MM"
                valueName="month"
                value={watch('month') || formData.DOB && formData.DOB.getMonth() + 1 || ''}
                onChange={(valueString) => setValue('month', parseInt(valueString, 10))}
                register={register('month', { required: true })}
              />

              <NumberField
                min={1920}
                max={2006}
                placeholder="YYYY"
                valueName="year"
                value={watch('year') || formData.DOB?.getFullYear() || ''}
                onChange={(valueString) => setValue('year', parseInt(valueString, 10))}
                register={register('year', { required: true })}
              />
            </Flex>
            <FormErrorMessage>
              {errors.day && "Day is required"}
              {errors.month && "Month is required"}
              {errors.year && "Year is required"}
            </FormErrorMessage>
          </FormControl>
        </Stack>
      </Box>
    </FormTemplate>
  )
}

export default DOB