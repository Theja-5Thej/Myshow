import React from 'react'
import { Stack, Box, Typography, FormLabel, TextField } from '@mui/material';
import { ErrorMsg, StyledField } from '../style/styledComponents';
interface InputComponentProps {
  label: string;
  placeholder?: string;
  type?: string;
  id: string;

}
const InputComponent: React.FC<InputComponentProps> = ({
  label,
  placeholder = 'Enter value',
  type = 'text',
  id = ''
}) => {
  return (
    <Stack direction="column"  width="100%">
      <FormLabel style={{color:'black'}}>{label}</FormLabel>
      <div>
        <StyledField type="text" name={id} id={id} placeholder={placeholder} style={{height:'40px'}}  autoComplete="off"/>
        <ErrorMsg name={id} component="div" />
      </div>
    </Stack>
  )
}

export default InputComponent