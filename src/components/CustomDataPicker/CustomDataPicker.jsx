import React from 'react'
import Button from '@mui/material/Button';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import classes from './CustomDataPicker.module.css';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

function ButtonField(props) {
  const {
    setOpen,
    label,
    id,
    disabled,
    InputProps: { ref } = {},
    inputProps: { 'aria-label': ariaLabel } = {},
  } = props;

  return (
    <Button
      variant="outlined"
      id={id}
      disabled={disabled}
      ref={ref}
      aria-label={ariaLabel}
      onClick={() => setOpen?.((prev) => !prev)}
      className={classes.customDelimiter}
    >
      {label ? `Current date: ${label}` : 'Pick a date'}
    </Button>
  );
}

const CustomDataPicker = (props) => {
  
    const [open, setOpen] = React.useState(false);
  
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        slots={{ field: ButtonField, ...props.slots }}
        slotProps={{ field: { setOpen } }}
        {...props}
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        className={classes.customData}
      />
      </LocalizationProvider>
    );
}

export default CustomDataPicker
