import { Box, Stack, FormControl, FormErrorMessage, useRadioGroup, Flex } from '@chakra-ui/react'
import { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import FormTemplate from '../FormTemplate'
import { ValueRadioCard } from '../form-helpers/ValueRadioCard'
import { useFormFlow } from '../../context/FormContext'
import { workLifeBalanceOptions } from '../../lib/form-utils'

interface WorkLifeBalanceProps {
  onPrevPage: () => void
}

const WorkLifeBalance: FC<WorkLifeBalanceProps> = ({ onPrevPage }) => {
  const { formData, updateFormState } = useFormFlow()

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({ defaultValues: { workLifeBalance: formData.WorkLifeBalance || '' } })

  const selectedValue = watch('workLifeBalance')
  const { getRadioProps } = useRadioGroup({
    name: 'workLifeBalance',
    value: selectedValue,
    onChange: (value) => setValue('workLifeBalance', value),
  })

  const [loadingSubmit, setLoadingSubmit] = useState(false)

  const submitForm = (updatedWorkLifeBalance: string) => {
    const updatedFormData = {
      ...formData,
      WorkLifeBalance: updatedWorkLifeBalance,
    };

    const jsonData = JSON.stringify(updatedFormData, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Output.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleWorkLifeBalanceSubmit = handleSubmit(({ workLifeBalance }) => {
    setLoadingSubmit(true);

    if (formData.WorkLifeBalance !== workLifeBalance) {
      updateFormState({ WorkLifeBalance: workLifeBalance });
    }

    submitForm(workLifeBalance);
    setLoadingSubmit(false);
  });


  return (
    <FormTemplate
      prevButton="Back"
      nextButton="Submit"
      questionNumber={5}
      title="How would you describe the balance between your work and non-work activities?"
      isLoading={loadingSubmit}
      handlePrev={onPrevPage}
      handleNext={handleWorkLifeBalanceSubmit}
    >
      <Box
        as="form"
        id="workLifeBalance_form"
        onSubmit={handleWorkLifeBalanceSubmit}
        w="full"
        pl={50}
        noValidate
        textAlign="left"
      >
        <Stack my="6" w="full">
          <FormControl isInvalid={!!errors?.workLifeBalance}>
            <Flex direction="column" gap={10}>
              {workLifeBalanceOptions.map((option) => {
                const radio = getRadioProps({ value: option.value })
                return (
                  <ValueRadioCard key={option.key} option={option} {...radio} isChecked={selectedValue === option.value} />
                )
              })}
            </Flex>
          </FormControl>
        </Stack>
      </Box>
    </FormTemplate>
  )
}

export default WorkLifeBalance
