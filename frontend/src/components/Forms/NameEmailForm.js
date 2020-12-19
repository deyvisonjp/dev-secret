import styled from 'styled-components';

import Input from './Input';
import Button from './Button';

const Form = styled.form`
  flex: 1;
  display: flex;
  max-width: 900px;
  padding: 20px;

  @media (max-width: 500px) {
     flex-direction: column;
     justify-content: space-evenly;
     align-items: center;
  }

  > input, button {
    margin: 10px;
  }
`

const NameEmailForm = ( { buttonText } ) => {
  return (
    <Form>
      <Input
        placeholder="Seu nome"
      />
    
      <Input
        type="email"
        placeholder="Seu email"
      />

      <Button>{buttonText}</Button>
    
    </Form>
  )
}

NameEmailForm.defaultProps = {
  buttonText: "Criar"
}

export default NameEmailForm;