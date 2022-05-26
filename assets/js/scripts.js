/* -------------------------------------------------------------------------- */
/*                        Función constructora paciente                       */
/* -------------------------------------------------------------------------- */
function Paciente(nombre, edad, rut, diagnostico) {
    let _nombre = nombre
    let _edad = edad
    let _rut = rut
    let _diagnostico = diagnostico || 'Sin diagnostico'

    /* ----------------------------------- GET ---------------------------------- */
    Object.defineProperty(this, '_getNombre', {
        get: function() {
            return _nombre
        }
    })
    Object.defineProperty(this, '_getEdad', {
        get: function() {
            return _edad
        }
    })
    Object.defineProperty(this, '_getRut', {
        get: function() {
            return _rut
        }
    })
    Object.defineProperty(this, '_getDiagnostico', {
        get: function() {
            return _diagnostico
        }
    })
    /* ----------------------------------- SET ---------------------------------- */
    Object.defineProperty(this, '_setNombre', {
        set: function(new_nombre) {
            return _nombre = new_nombre
        }
    })
    Object.defineProperty(this, '_setEdad', {
        set: function(new_edad) {
            return _edad = new_edad
        }
    })
    Object.defineProperty(this, '_setRut', {
        set: function(new_rut) {
            return _rut = new_rut
        }
    })
    Object.defineProperty(this, '_setDiagnostico', {
        set: function(new_diagnostico) {
            return _diagnostico = new_diagnostico
        }
    })

    /* ------------------------------- METODOS GET ------------------------------ */
    Paciente.prototype.getNombre = function() {
        return this._getNombre
    }
    Paciente.prototype.getEdad = function() {
        return this._getEdad
    }
    Paciente.prototype.getRut = function() {
        return this._getRut
    }
    Paciente.prototype.getDiagnostico = function() {
        return this._getDiagnostico
    }
    /* ------------------------------- METODOS SET ------------------------------ */
    Paciente.prototype.setNombre = function(new_nombre) {
        return this.setNombre = new_nombre
    }
    Paciente.prototype.setEdad = function(new_edad) {
        return this.setEdad = new_edad
    }
    Paciente.prototype.setRut = function(new_rut) {
        return this.setRut = new_rut
    }
    Paciente.prototype.setDiagnostico = function(new_diagnostico) {
        return this.setDiagnostico = new_diagnostico
    }

}

let paciente1 = new Paciente('Rodrigo', 33, '17.082.239-0', 'Hipotiroidismo')
let paciente2 = new Paciente('Josefina', 10, '23.969.513-2', 'Mordida invertida')
let paciente3 = new Paciente('Laura de los Angeles', 38, '15.623.198-3', 'Ulsera gastrica')
let paciente4 = new Paciente('Orlando', 75, '4.839.819-7', 'Arritmia')
let paciente5 = new Paciente('Bernardita', 70, '7.923.201-7', 'Artrosis')


/* -------------------------------------------------------------------------- */
/*                      Función constructora consultorio                      */
/* -------------------------------------------------------------------------- */
function Consultorio(nombre, pacientes) {
    let _nombre = nombre
    let _pacientes = pacientes || []

    // Get nombre
    Object.defineProperty(this, '_getNombre', {
        get: function(){
            return _nombre 
        }
    })
    // Get pacientes
    Object.defineProperty(this, '_getPacientes', {
        get: function() {
            return _pacientes
        }
    })
    // Set pacientes (agregar pacientes a consultorio)
    Object.defineProperty(this, '_addPaciente', {
        set: function(paciente) {
            return _pacientes.push(paciente) 
        }
    })


    // Metodo getNombre
    Consultorio.prototype.getNombre = function() {
        return this._getNombre
    }
    // Metodo getPacientes
    Consultorio.prototype.getPacientes = function() {
        return this._getPacientes
    }
    // Metodo addPaciente
    Consultorio.prototype.addPaciente = function(paciente) {
        return this._addPaciente = paciente
    }
    // Metodo searchPaciente
    Consultorio.prototype.searchPaciente = function(nombre) {
        let result = ''
        this._getPacientes.forEach(paciente => {

            if ( paciente.getNombre() == nombre ) {
                result = `
                    <tr>
                        <th scope="row">${paciente.getNombre()}</th>
                        <td>${paciente.getEdad()}</td>
                        <td>${paciente.getRut()}</td>
                        <td>${paciente.getDiagnostico()}</td>
                    </tr>
                `
            }
        })
        
        return result
    }

}

let consultorio = new Consultorio('UCChristus')
consultorio.addPaciente(paciente1)
consultorio.addPaciente(paciente2)
consultorio.addPaciente(paciente3)
consultorio.addPaciente(paciente4)
consultorio.addPaciente(paciente5)

let pacientes = consultorio.getPacientes()

function showPacientes(id, list) {
    let pacientesWrapper = document.getElementById(id)

    list.forEach(paciente => {
        let tr = `
            <tr>
                <th scope="row">${paciente.getNombre()}</th>
                <td>${paciente.getEdad()}</td>
                <td>${paciente.getRut()}</td>
                <td>${paciente.getDiagnostico()}</td>
            </tr>
        `
        pacientesWrapper.innerHTML += tr
    });

    return pacientesWrapper
}
showPacientes('pacientes', pacientes)

function searchPaciente() {
    let pacientesWrapper = document.getElementById('pacientes')
    let inputVal = document.getElementById('search')
    let searchBtn = document.getElementById('searchButton')
    
    searchBtn.addEventListener('click', (e) => {
        e.preventDefault()
        if ( consultorio.searchPaciente(inputVal.value) != '' ) {
            pacientesWrapper.innerHTML = consultorio.searchPaciente(inputVal.value)
        } else {
            console.log('El paciente no existe en la base de datos.')
            pacientesWrapper.innerHTML = `
                <tr>
                    <th scope="row">El paciente no existe en nuestra base de datos.</th>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            `
        }
    })
}
searchPaciente()