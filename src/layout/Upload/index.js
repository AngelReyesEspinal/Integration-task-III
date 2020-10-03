import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid'
import Dropzone from '../../components/Dropzone'
import Button from '@material-ui/core/Button';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import post from '../../services/post'
import LinearIndeterminate from '../../components/Loading'
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import operationSuccess from '../../notifications'

const textarea = {
  width: '100%!important',
  height: '200px',
  overflow: 'hidden'
}

const alignBtnSend = {
  display: 'flex',
  justifyContent: 'flex-end'
}

const Upload = () => {
  const [ base64, setBase64 ] = useState('')
  const [isLoading, setIsLoading] = React.useState(false)

  const addBase64 = (base64) => {
    setBase64(base64)
  }

  async function sendData() {
    setIsLoading(true)
    const AccountingSeats = JSON.parse(atob(base64))
    let data = [];
    AccountingSeats.forEach(seat => {
      const newSeat = {
        cuentaContable: seat.cuentaContable,
        descripcion: seat.descripcion,
        fecha: new Date(seat.fecha),
        monto: seat.monto,
        numero: seat.numero,
        tipoMovimiento: seat.tipoMovimiento
      }
      data.push(newSeat)
    });
    await post('asientos/guardar-json', { data: data })
    setIsLoading(false)
    operationSuccess()
  }

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Dropzone 
            addBase64={addBase64}  
          />
        </Grid>
        <Grid item xs={12}>
          { 
            base64 !== '' 
            ? <div>
                <h2> El contenido de tu file es: </h2>
                <TextareaAutosize
                  style={textarea}
                  rowsMax={10}
                  aria-label="maximum height"
                  placeholder="Maximum 4 rows"
                  defaultValue={atob(base64)}
                />
                
                { isLoading && 
                  <div>
                    <br/>
                    <LinearIndeterminate />
                  </div>
                }
                <br/>
                <div style={alignBtnSend}>
                  <Button  variant="contained" color="primary" onClick={() => { sendData() }}>
                    Guardar datos &nbsp; <CloudUploadIcon />
                  </Button>
                </div>
              </div> 
            : <div>
                <h1> No se ha seleccionado ningún archivo 😥 </h1>
              </div>
          }
        </Grid>
        
      </Grid>
    </div>
  )
}

export default Upload;
