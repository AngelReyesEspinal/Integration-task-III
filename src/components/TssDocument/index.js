import React, { useState } from 'react'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import DateFnsUtils from '@date-io/date-fns'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers'
import { useForm } from 'react-hook-form';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import post from '../../services/post'
import get from '../../services/get'
import LinearIndeterminate from '../Loading'
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

const title = {
  color: 'black'
}

const mt15 = {
  marginTop: 15,
}

const alignBtnSend = {
  display: 'flex',
  justifyContent: 'flex-end'
}

const TssDocument = () => {
  const [isLoading, setIsLoading] = React.useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [moneda, setMoneda] = React.useState('DB')
  const [description, setDescription] = React.useState('')

  const { register, handleSubmit, errors } = useForm();

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  
  const handleChangeMoneda = (event) => {
    setMoneda(event.target.value);
  };

  const handleDescription = (event) => {
    setDescription(event.target.value);
  };

  async function onSubmit(data) {
    data = {
      ...data,
      fecha: selectedDate,
      tipoMovimiento: moneda,
      descripcion: description
    }
    data.numero = Number(data.numero)
    data.monto = Number(data.monto)
    setIsLoading(true)
    await post('asientos', data)
    setIsLoading(false)
  }

  async function getJson() {
    setIsLoading(true)
    const response = await get('asientos/activos-fijos-asientos')
    setIsLoading(false)
    exportToJson(response.data)
  }

  function exportToJson(objectData) {
    const element = document.createElement("a")
    const file = new Blob([decodeURIComponent(encodeURI(JSON.stringify(objectData)))], {type: "application/json"})
    element.href = URL.createObjectURL(file)
    element.download = "export.json"
    document.body.appendChild(element)
    element.click()
  }
  
  return (
    <div>
      <Typography variant="h5" gutterBottom>
        <span style={title}> 
          Formulario
        </span>
      </Typography>

      { isLoading && <LinearIndeterminate /> }
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3} style={mt15}>

          <Grid item xs={4}>
            <TextField
              name="numero"
              error={errors.numero ? true : false}
              helperText={errors.numero && errors.numero.message}
              inputRef={register({required: "El No. del asiento es obligatorio"})}
              fullWidth 
              type="number"
              label="No. del asiento*"
              variant="outlined"
              size="small"
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              name="cuentaContable"
              error={errors.cuentaContable ? true : false}
              helperText={errors.cuentaContable && errors.cuentaContable.message}
              inputRef={register({required: "La cuenta contable es obligatoria"})}
              fullWidth 
              type="text"
              label="Cuenta contable*"
              variant="outlined"
              size="small"
            />
          </Grid>

          <Grid item xs={4}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                autoOk
                variant="inline"
                inputVariant="outlined"
                label="Fecha*"
                size="small"
                format="dd/MM/yyyy"
                value={selectedDate}
                InputAdornmentProps={{ position: "start" }}
                onChange={date => handleDateChange(date)}
              />
            </MuiPickersUtilsProvider>
          </Grid> 

          <Grid item xs={6}>
            <TextField
              name="monto"
              error={errors.monto ? true : false}
              helperText={errors.monto && errors.monto.message}
              inputRef={register({required: "El monto es obligatorio", 
                minLength: {value: 1, message: "La longitud mínima debe ser igual a 1"}, 
                maxLength: {value: 16, message: "La longitud máxima debe ser igual a 16"},
                pattern: {
                  value: /^\d+$/,
                  message: "Solo se adminten números positivos"
                }})}
              fullWidth 
              type="number"
              label="Monto del movimiento*"
              variant="outlined"
              size="small"
            />
          </Grid>

          <Grid item xs={6}>
            <FormControl size="small" variant="outlined" >
              <InputLabel htmlFor="outlined-age-native-simple">Tipo del movimiento</InputLabel>
              <Select
                required
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={moneda}
                onChange={handleChangeMoneda}
                label="Tipo del movimiento"
              >
                <MenuItem value={'DB'}>DB</MenuItem>
                <MenuItem value={'CR'}>CD</MenuItem>
              </Select>
            </FormControl>
          </Grid> 

          <Grid item xs={12}>
            <TextareaAutosize
              onChange={handleDescription}
              name="descripcion"
              rowsMax={4}
              placeholder="Descripción del asiento"
            />
          </Grid>
                    
          <Grid item xs={12}>
            <div style={alignBtnSend}>
              <Button variant="contained" color="primary" onClick={getJson}>
                Descargar Json &nbsp; <CloudDownloadIcon />
              </Button> 
              
              &nbsp;

              <Button type="submit" variant="contained" color="primary">
                Guardar información &nbsp; <CloudUploadIcon />
              </Button>
            </div>
          </Grid>

        </Grid>
      </form>
    </div>
  )
}
  
export default TssDocument;