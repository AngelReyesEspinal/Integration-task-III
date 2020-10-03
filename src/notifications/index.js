const Swal = require('sweetalert2')

const operationSuccess = () => {
    Swal.fire(
        '¡Excelente!',
        '¡Se ha realizado la operación con éxito!',
        'success'
    )
}

export default operationSuccess