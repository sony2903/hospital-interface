class View {
    static listHelp(){
        console.log(
            `
            ================== LIST PANEL ========================
            You can input :
            node index.js register <username> <password> <potition>
            node index.js login <username> <password>
            node index.js addPatient <id> <name> <task_diagnosis>
            node index.js logout
            ================== LIST PANEL ========================
            `)
    }
    static registerEmployeeError(error) {
        console.log(error)
    }
    static registerEmployeeSuccess(dataString, data) {
        console.log(`data saved ${dataString}. Total Employee is : ${data.length}`)
    }
    static alreadyLogin(data) {
        console.log(`user ${data} still logged in. Please logout first`)
    }
    static loginError() {
        console.log(`username / password wrong, please enter correct username / password `)
    }
    static loginSuccess(params) {
        console.log(`user ${params[0]} logged in succesfully`)
    }
    static addPatientSuccess(data) {
        console.log(`patient added. Total patient is : ${data[data.length - 1].id}`)
    }
    static addPatientError(data) {
        console.log(data)
    }
    static logoutSuccess() {
        console.log(`logout successfully`)
    }
    static logoutError() {
        console.log(`in guest mode, please login first`)
    }
}

module.exports = View