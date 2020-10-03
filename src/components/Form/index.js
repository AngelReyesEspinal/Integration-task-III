import React  from 'react'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import { useForm } from 'react-hook-form';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import validateDominicanId from 'validacion-cedula-dominicana';
import post from '../../services/post'
import LinearIndeterminate from '../Loading'

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

const Form = () => {
  const [isLoading, setIsLoading] = React.useState(false)
  const [documentType, setdocumentType] = React.useState('Cedula')
  const { register, handleSubmit, errors } = useForm();

  const handleChangeDocumentType = (event) => {
    setdocumentType(event.target.value)
  }

  async function onSubmit (data) {
    data = {
      ...data,
      tipoDocumento: documentType,
    }
    data.salarioCotizable = Number(data.salarioCotizable)
    data.aporteVoluntario = data.aporteVoluntario ? data.aporteVoluntario : null
    setIsLoading(true)
    await post('empleados', data)
    setIsLoading(false)
  }
  
  return (
    <div>
      <Typography variant="h5" gutterBottom>
        <span style={title}> 
          Guardar empleado
        </span>
      </Typography>

      { isLoading && <LinearIndeterminate /> }
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3} style={mt15}>
          <Grid item xs={12}>
            <TextField
              name="nombre"
              error={errors.nombre ? true : false}
              helperText={errors.nombre && errors.nombre.message}
              inputRef={register({required: "El nombre es obligatorio", 
                minLength: {value: 1, message: "La longitud mínima debe ser igual a 1"}, 
                maxLength: {value: 40, message: "La longitud máxima debe ser igual a 40"}})}
              fullWidth 
              type="text"
              label="Nombre del empleado*"
              variant="outlined"
              size="small"
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl size="small" variant="outlined">
              <InputLabel htmlFor="outlined-age-native-simple">Tipo de documento</InputLabel>
              <Select
                required
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={documentType}
                onChange={handleChangeDocumentType}
                label="Tipo de documento"
              >
                <MenuItem value={'Cedula'}>Cédula</MenuItem>
                <MenuItem value={'Pasaporte'}>Pasaporte</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            { 
              documentType === 'Cedula'
              ? 
                <TextField
                  name="documento"
                  error={errors.documento ? true : false}
                  helperText={errors.documento && errors.documento.message}
                  inputRef={register({required: "La cédula es obligatoria", 
                    minLength: {value: 11, message: "La longitud mínima debe ser igual a 11"}, 
                    maxLength: {value: 11, message: "La longitud máxima debe ser igual a 11"},
                    pattern: {
                      value: /^\d+$/,
                      message: "Solo se adminten números positivos"
                    },
                    validate: validateDominicanId
                  })}
                  fullWidth 
                  type="text"
                  label="Introduzca la cédula*"
                  variant="outlined"
                  size="small"
                />
              : 
              <TextField
                name="documento"
                error={errors.documento ? true : false}
                helperText={errors.documento && errors.documento.message}
                inputRef={register({required: "El documento es obligatorio", 
                  minLength: {value: 11, message: "La longitud mínima debe ser igual a 11"}, 
                  maxLength: {value: 11, message: "La longitud máxima debe ser igual a 11"}})}
                fullWidth 
                type="text"
                label="Introduzca el pasaporte*"
                variant="outlined"
                size="small"
              />
            }
            
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="salarioCotizable"
              error={errors.salarioCotizable ? true : false}
              helperText={errors.salarioCotizable && errors.salarioCotizable.message}
              inputRef={register({required: "El salario cotizable es obligatorio", 
                minLength: {value: 1, message: "La longitud mínima debe ser igual a 1"}, 
                maxLength: {value: 16, message: "La longitud máxima debe ser igual a 16"},
                pattern: {
                  value: /^\d+$/,
                  message: "Solo se adminten números positivos"
                }})}
              fullWidth 
              type="number"
              label="Salario cotizable*"
              variant="outlined"
              size="small"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="aporteVoluntario"
              error={errors.aporteVoluntario ? true : false}
              helperText={errors.aporteVoluntario && errors.aporteVoluntario.message}
              inputRef={register({
                minLength: {value: 1, message: "La longitud mínima debe ser igual a 1"}, 
                maxLength: {value: 16, message: "La longitud máxima debe ser igual a 16"},
                pattern: {
                  value: /^\d+$/,
                  message: "Solo se adminten números positivos"
                }})}
              fullWidth 
              type="number"
              label="Aporte voluntario"
              variant="outlined"
              size="small"
            />
          </Grid>
          <Grid item xs={12}>
            <div style={alignBtnSend}>
              <Button type="submit" variant="contained" color="primary">
                Guardar datos &nbsp; <CloudUploadIcon />
              </Button>
            </div>
          </Grid>
        </Grid>
      </form>
    </div>
  )
}
  
export default Form;