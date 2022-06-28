import React from 'react';

import Form from './form'
import Field from './field';

import { useYupValidationResolver } from './helpers/hooks/useYupValidationResolver';
import { getValidationSchema } from './helpers/formValidationSchema'

import './App.css';

function App() {
  const [values, setValues] = React.useState<any>({})
  const [errors, setErrors] = React.useState<any>({})

  const validationSchema = getValidationSchema();
  const resolver = useYupValidationResolver(validationSchema);

  const onFieldChange = (fieldName: string, fieldInput: string) => {
    setValues((prevState: any) => ({ ...prevState, [fieldName]: { [fieldName]: fieldInput.length > 0 ? fieldInput : undefined } }))
  }

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const errorsEntries = Object.entries(errors)
    if (errorsEntries.filter((error: any) => error[1]).length > 0) alert(errorsEntries.map((error: any) => error[1] && `${error[0]} -> ${error[1].message}`).join('\n'))
    else alert(`GOOD NUMBER`)
  }

  return (
    <div className="App">
      <Form resolver={resolver} onSubmit={onSubmit}>
        {(register) => (
          <>
            <select>
              <option>+7</option>
              <option>+44</option>
              <option>+1</option>
            </select>
            <Field
              labelText="Enter your phone"
              fieldType="text"
              fieldName="phone"
              fieldValue={values['phone']}
              fieldError={errors['phone'] ? errors['phone'] : ''}
              hasError={errors['phone']}
              placeholder="xxx-xxx-xxxx"
              setErrors={setErrors}
              resolver={register(values['phone'])}
              onFieldChange={onFieldChange}
            />
          </>
        )}
      </Form>
    </div>
  );
}

export default App;
