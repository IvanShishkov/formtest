import React from 'react'

interface IForm {
  onSubmit: (data: any) => void;
  children: (data: any) => any;
  resolver: (data: any) => void;
}

const Form: React.FC<IForm> = React.memo((props) => {
  return (
    <form onSubmit={props.onSubmit}>
      {props.children(props.resolver)}
      <button type='submit'>submit</button>
    </form>
  )
})

export default Form