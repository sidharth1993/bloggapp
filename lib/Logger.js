const color = require('chalk');

module.exports = class Logger {
    constructor(file) {
        this.file = file;
    }
    
    Log() {
        let time = new Date();
        let logs = '';
        for(let i=0;i<arguments.length;i++){
            logs = `${logs} ${arguments[i]}`;
        }
        console.log(`${time.getDate()}/${time.getMonth()+1}/${time.getFullYear()}|${time.getHours()}:${time.getMinutes()}:${time.getSeconds()} : ${this.file} : ${logs}`);
    }

    ErrLog() {
        let time = new Date();
        let logs = '';
        for(let i=0;i<arguments.length;i++){
            logs = `${logs} ${arguments[i]}`;
        }
        console.log(`${time.getDate()}/${time.getMonth()+1}/${time.getFullYear()}|${time.getHours()}:${time.getMinutes()}:${time.getSeconds()} : ${this.file} : ${color.red(logs)}`);
    }
}