import { NumberInput, NumberInputField } from '@chakra-ui/react'
import { FC } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'

interface NumberFieldProps {
  min?: number
  max: number
  placeholder: string
  valueName: string
  value: number | string
  onChange: (valueString: string) => void
  register: UseFormRegisterReturn
}

const NumberField: FC<NumberFieldProps> = ({
  min = 1,
  max,
  placeholder,
  valueName,
  value,
  onChange,
  register,
  ...rest
}) => {
  return (
    <NumberInput min={min} max={max} value={value} onChange={onChange} {...rest}>
      <NumberInputField
        {...register}
        borderRadius="45%"
        w="8rem"
        px="1.5rem"
        py="0.5rem"
        backgroundColor="#927d8e"
        color="white"
        placeholder={placeholder}
        _placeholder={{ color: "white" }}
      />
    </NumberInput>
  )
}

export default NumberField
