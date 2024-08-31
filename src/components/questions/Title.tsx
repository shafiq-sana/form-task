import { FormControl, FormErrorMessage } from '@chakra-ui/form-control'
import { Box, Stack } from '@chakra-ui/layout'
import { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import Select, { SingleValue } from "react-select"
import FormTemplate from '../FormTemplate'
import { useFormFlow } from '../../context/FormContext'
import { titleDropdownStyles, TitleOptionField, titleOptions } from '../../lib/form-utils'

interface TitleProps {
  onTitleSuccess: () => void
  onPrevPage: () => void
}

const Title: FC<TitleProps> = ({ onTitleSuccess, onPrevPage }) => {
  const { formData, updateFormState } = useFormFlow()
  const { handleSubmit, formState: { errors } } = useForm()

  const [loadingSubmit, setLoadingSubmit] = useState(false)
  const [selectedTitle, setSelectedTitle] = useState(
    titleOptions.find(option => option.value === formData.Title) || null
  )

  const handleTitleChange = (option: SingleValue<TitleOptionField>) => setSelectedTitle(option)

  const handleTitleSubmit = handleSubmit(() => {
    setLoadingSubmit(true)
    if (formData.Title !== selectedTitle?.value) {
      updateFormState({ Title: selectedTitle?.value })
    }
    onTitleSuccess()
    setLoadingSubmit(false)
  })

  return (
    <FormTemplate
      nextButton="Continue"
      questionNumber={1}
      title="Title"
      isLoading={loadingSubmit}
      handlePrev={onPrevPage}
      handleNext={handleTitleSubmit}
    >
      <Box
        as="form"
        id="title_form"
        onSubmit={handleTitleSubmit}
        w="full"
        ml={40}
        maxW={{ base: '300px', md: '400px' }}
        noValidate
        textAlign="left"
      >
        <Stack my="6" w="full">
          <FormControl isInvalid={!!errors?.title}>
            <Select
              menuPortalTarget={document.body}
              menuPosition="fixed"
              id="title-select"
              placeholder="Select"
              options={titleOptions}
              value={selectedTitle}
              styles={titleDropdownStyles}
              onChange={handleTitleChange}
            />
            <FormErrorMessage>
              <>{errors?.title?.message}</>
            </FormErrorMessage>
          </FormControl>
        </Stack>
      </Box>
    </FormTemplate>
  )
}

export default Title
