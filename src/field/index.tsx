import React, { SetStateAction } from 'react'

import { useDebounce } from '../helpers/hooks/useDebounce'

interface IField {
  fieldName: string;
  labelText?: string;
  fieldType?: string;
  fieldValue?: string;
  fieldError?: any;
  hasError?: boolean;
  onFieldChange: (fieldName: string, inputValue: string) => void;
  placeholder: string;
  resolver: any;
  setErrors: React.Dispatch<React.SetStateAction<{}>>;
}

const Field: React.FC<IField> = React.memo((props) => {
  const debounce = useDebounce()

  const validateOnInput = async () => {
    const { errors } = await props.resolver
    props.setErrors((prevState: any) => ({ ...prevState, [props.fieldName]: errors[props.fieldName] }))
  }

  React.useEffect(() => {
    validateOnInput()
  }, [props.fieldValue])

  const onFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Я мог бы сделать маску, которая бы форматировала бы инпут под номер телефона, но тогда я не знаю,
    // как показать проверку на буквы :/
    const rep = event.target.value;

    debounce(() => props.onFieldChange(props.fieldName, rep), 500)
  }

  return (
    <fieldset>
      <label htmlFor={props.fieldName}>{props.labelText}</label>
      <input
        type={props.fieldType}
        name={props.fieldName}
        id={props.fieldName}
        onChange={onFieldChange}
        placeholder={props.placeholder}
      />

      {props.hasError && (
        <p>{props.fieldError?.message}</p>
      )}
    </fieldset>
  )
})

export default Field