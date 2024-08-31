import { createContext, FC, ReactNode, useState, useContext } from 'react'

interface FormFields {
  Title: string
  DOB: Date | null
  Performance: number
  SourcesOfStress: string
  WorkLifeBalance: string
}

const INITIAL_FORM_FIELDS: FormFields = {
  Title: '',
  DOB: null,
  Performance: 0,
  SourcesOfStress: '',
  WorkLifeBalance: '',
}

const FormContext = createContext<{
  formData: FormFields
  updateFormState: (formFields: Partial<FormFields>) => void
}>({
  formData: INITIAL_FORM_FIELDS,
  updateFormState: () => { },
})

type FormProviderProps = {
  children: ReactNode
}

export const FormProvider: FC<
  FormProviderProps
> = ({ children }) => {
  const [formData, setFormData] = useState<FormFields>(
    INITIAL_FORM_FIELDS
  )

  const updateFormState = (formFields: Partial<FormFields>) => {
    setFormData((prev) => ({ ...prev, ...formFields }))
  }

  return (
    <FormContext.Provider
      value={{
        formData,
        updateFormState
      }}
    >
      {children}
    </FormContext.Provider>
  )
}

export const useFormFlow = () => {
  return useContext(FormContext)
}
