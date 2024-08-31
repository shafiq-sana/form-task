export const stepAnimationDuration = 0.4

export const stepAnimation = {
  initial: { opacity: 0, y: '10px' },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: '10px' },
  transition: { duration: stepAnimationDuration },
}

export interface TitleOptionField {
  value: string
  label: string
}

export const titleOptions: TitleOptionField[] = [
  { value: 'mr', label: 'Mr' },
  { value: 'ms', label: 'Ms' },
  { value: 'mrs', label: 'Mrs' },
  { value: 'miss', label: 'Miss' },
  { value: 'dr', label: 'Dr' },
]

export const titleDropdownStyles = {
  control: (base: any, state: { isFocused: any }) => ({
    ...base,
    background: "#927d8e",
    width: "15em",
    boxShadow: state.isFocused ? null : null,
    border: 0,
  }),
  placeholder: (base: any) => ({ ...base, color: 'white' }),
  singleValue: (base: any) => ({ ...base, color: 'white' }),
  menu: (base: any) => ({
    ...base,
    borderRadius: 0,
    marginTop: 0,
    background: "#927d8e",
    "&:hover": { background: "white" },
  }),
  option: (styles: any, { isFocused, isSelected }: any) => ({
    ...styles,
    background: isFocused ? 'white' : isSelected ? 'white' : "#927d8e",
    color: isFocused || isSelected ? '#927d8e' : "white",
    zIndex: 1
  }),
  menuList: (base: any) => ({ ...base, padding: 0 }),
}

export const workLifeBalanceOptions = [
  {
    key: "A",
    value: "Ideal",
  },
  {
    key: "B",
    value: "Satisfactory",
  },
  {
    key: "C",
    value: "Challenging",
  },
  {
    key: "D",
    value: "Extremely challenging",
  },
  {
    key: "E",
    value: "Unmanageable",
  }
]