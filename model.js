const fs = require('fs')


class Patient {
  constructor(id, name, diagnosis) {
    this.id = id
    this.name = name
    this.diagnosis = diagnosis
  }
}

class Employee {
  constructor(id, name, position, username, password) {
    this.id = id
    this.name = name
    this.position = position
    this.username = username
    this.password = password
    this.login = false
  }
}

class Admin extends Employee {
  constructor(id, name, position, username, password) {
    super(id, name, position, username, password)
  }
}
class Dokter extends Employee {
  constructor(id, name, position, username, password) {
    super(id, name, position, username, password)
  }
}
class OfficeBoy extends Employee {
  constructor(id, name, position, username, password) {
    super(id, name, position, username, password)
  }
}
class Receptionist extends Employee {
  constructor(id, name, position, username, password) {
    super(id, name, position, username, password)
  }
}

class EmployeeFactory {
  static read(param, callback) {
    fs.readFile('./employee.json', 'utf8', (err, data) => {
      if (err)
        callback(err, null)
      else {
        let dataParse = JSON.parse(data)
        switch (param[2]) {
          case 'dokter':
            dataParse.push(new Dokter(dataParse[dataParse.length - 1].id + 1, param[0], param[2], param[0], param[1]))
            break;

          case 'admin':
            dataParse.push(new Admin(dataParse[dataParse.length - 1].id + 1, param[0], param[2], param[0], param[1]))
            break;

          case 'receptionist':
            dataParse.push(new Receptionist(dataParse[dataParse.length - 1].id + 1, param[0], param[2], param[0], param[1]))
            break;

          case 'officeboy':
            dataParse.push(new OfficeBoy(dataParse[dataParse.length - 1].id + 1, param[0], param[2], param[0], param[1]))
            break;

          default:
            break;
        }

        callback(null, dataParse)
        fs.writeFile('./employee.json', JSON.stringify(dataParse), (err, data) => { })
      }
    })
  }

  static login(param, callback) {
    fs.readFile('./employee.json', 'utf8', (err, data) => {
      if (err)
        callback(err, null)
      else {
        let dataParse = JSON.parse(data)
        let x
        let still
        for (let i = 0; i < dataParse.length; i++) {
          if (dataParse[i].login == true) {
            x = true
            still = dataParse[i].name
            break
          } else {
            x = false
          }
        }
        if (x == true) {
          callback(null, still)
        } else {
          let exist = false
          for (let i = 0; i < dataParse.length; i++) {
            if (dataParse[i].username == param[0] && dataParse[i].password == param[1]) {
              dataParse[i].login = true
              if (dataParse[i].position == 'dokter') {
                fs.readFile('./patient.json', 'utf8', (err, data) => {
                  let patientParse = JSON.parse(data)
                  patientParse[0].dokter = true
                  fs.writeFile('./patient.json', JSON.stringify(patientParse), (err, data) => { })
                })
              }
              exist = true
              break
            }
          }
          callback(null, exist)
          fs.writeFile('./employee.json', JSON.stringify(dataParse), (err, data) => { })
        }
      }
    })
  }

  static addPatient(param, callback) {
    fs.readFile('./patient.json', 'utf8', (err, data) => {
      let patientParse = JSON.parse(data)
      if (patientParse[0].dokter == true) {
        let paramUbah = param.slice(2)
        let diagnosis = []
        for (let i = 0; i < paramUbah.length; i++) {
          diagnosis.push(paramUbah[i])
        }
        patientParse.push(new Patient(patientParse[patientParse.length - 1].id + 1, param[1], paramUbah))
        callback(null, patientParse)
        fs.writeFile('./patient.json', JSON.stringify(patientParse), (err, data) => { })
      } else {
        let x = `tidak memiliki akses untuk add patient`
        callback(null, x)
      }
    })
  }

  static logout(callback) {
    fs.readFile('./employee.json', 'utf8', (err, data) => {
      if (err)
        callback(err, null)
      else {
        let dataParse = JSON.parse(data)
        let x = true
        for (let i = 0; i < dataParse.length; i++) {
          if (dataParse[i].login == true) {
            x = dataParse[i].login
            dataParse[i].login = false
            if (dataParse[i].position == 'dokter') {
              fs.readFile('./patient.json', 'utf8', (err, data) => {
                let patientParse = JSON.parse(data)
                patientParse[0].dokter = false
                fs.writeFile('./patient.json', JSON.stringify(patientParse), (err, data) => { })
              })
            }
            x = false
            break
          }
        }
        callback(null, x)
        fs.writeFile('./employee.json', JSON.stringify(dataParse), (err, data) => { })
      }
    })
  }
}

module.exports = {
  Patient: Patient,
  EmployeeFactory: EmployeeFactory
}