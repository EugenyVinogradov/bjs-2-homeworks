// Задача №1. Будильник-колыбельная

class AlarmClock {
    constructor() {
        this.alarmCollection = [];
        this.timerId = null;
    }
    addClock(time, callback, id) {
        if (id === undefined) {
            throw new Error('error text');
        }
        if (this.alarmCollection.some(alarm => alarm.id === id) ) {
            console.error("Звонок с таким id уже существует!");
            return;
        }
        this.alarmCollection.push({time,callback,id});
    }
    removeClock(id) {
        if (this.alarmCollection.filter(alarm => alarm.id === id)) {
            this.alarmCollection = this.alarmCollection.filter(alarm => alarm.id !== id);
            return true;
        }
        return false;
    }
    getCurrentFormattedTime() {
        let currentTime = ("0" + new Date().getHours()).slice(-2) + ":" 
            + ("0" + new Date().getMinutes()).slice(-2);
        return currentTime;
    }
    start() {
        let checkClock = (alarm) => {
            let time = this.getCurrentFormattedTime();
            console.log(time);
            if (alarm.time === time) {
                // return console.log(this);
                return alarm.callback();
            }
        }
        if (this.timerId === null) {
            this.timerId = setInterval(() => this.alarmCollection.forEach(alarm => checkClock(alarm)), 1000);
            console.log(this.timerId);
        }   
        return; 
    }
    stop() {
        if (this.timerId !== null) {
            this.timerId = null;
            clearInterval(this.timerId);
        }
    }
    printAlarms() {
        console.log(`Печать всех будильников в количестве: ${this.alarmCollection.length}`);
        this.alarmCollection.forEach(alarm => {
            console.log(`Будильник № ${alarm.id} заведен на ${alarm.time}`);           
        });
    }
    clearAlarms() {
        this.stop();
        this.alarmCollection = [];
    }
}

// Пример использования класса *AlarmClock*

function testCase() {
    let alarmClock = new AlarmClock;
    let currentTime = alarmClock.getCurrentFormattedTime();
    let currentTimePlusOneMinute = currentTime.split(":")[0] + 
        ":" + ("0" +(Number.parseInt(currentTime.split(":")[1])+1)).slice(-2);  /* Не стал уж проверять, больше ли количество минут, чем 60 */
    let currentTimePlusTwoMinute = currentTime.split(":")[0] + 
        ":" + ("0" +(Number.parseInt(currentTime.split(":")[1])+2)).slice(-2);
    
    alarmClock.addClock(currentTime, () => {
        console.log("Подъем!");
        console.log("Подъем!!");
        console.log("Подъем!!!");
    }, 1);

    alarmClock.addClock(currentTimePlusOneMinute,() => {
        console.log("Серьезно, пора вставать!");
        alarmClock.removeClock(2)},2);

    alarmClock.addClock(currentTimePlusTwoMinute, () => {
        console.log("ВСТАВАААААЙ!!!");
        alarmClock.stop();
        alarmClock.clearAlarms();
        alarmClock.printAlarms();
    }, 3);
    
    alarmClock.start();
    alarmClock.stop();
    alarmClock.printAlarms();

}
testCase();