const View = require('./view')
const Model = require('./model')

class Controller {

    static listHelp(params){
        View.listHelp()
    }

    static registerEmployee(params) {
        Model.EmployeeFactory.read(params, (err, data) => {
            if (err) {
                View.registerEmployeeError(err)
            } else {
                let dataString = JSON.stringify(data[data.length - 1])
                View.registerEmployeeSuccess(dataString, data)
            }
        })
    }

    static loginEmployee(params) {
        Model.EmployeeFactory.login(params, (err, data) => {
            if (typeof data == 'string') {
                View.alreadyLogin(data)
            } else if (data == false) {
                View.loginError()
            } else {
                View.loginSuccess(params)
            }
        })
    }

    static addPatient(params) {
        Model.EmployeeFactory.addPatient(params, (err, data) => {
            if (typeof data == 'string') {
                View.addPatientError(data)
            } else {
                View.addPatientSuccess(data)
            }

        })
    }

    static logout() {
        Model.EmployeeFactory.logout((err, data) => {
            if (data == false) {
                View.logoutSuccess()
            } else {
                View.logoutError()
            }
        })
    }
}

module.exports = Controller