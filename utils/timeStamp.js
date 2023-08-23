let timeHelper = {};

timeHelper.currentDateWithoutTime = function () {
    let current_date = new Date()
    return current_date.getFullYear() + '-' + (("0" + (current_date.getMonth() + 1)).slice(-2)) + '-' + ("0" + (current_date.getDate())).slice(-2)
}

timeHelper.currentTimeWithoutDate = function() {
    let current_date = new Date();
    
}

timeHelper.currentTimeAndDate= function () {
    let current_date = new Date()
    const d = current_date.getDay()
    const mt = current_date.getMonth()
    const y = current_date.getFullYear()
    const hours = current_date.getHours()
    const m = current_date.getMinutes()
    const s = current_date.getSeconds()
    const f = `${y}-${mt}-${d}-ts-${hours}:${m}`
    return f;
}

timeHelper.unformattedCurrentTimeAndDate = function () {
    let current_date = new Date()
    const d = current_date.getDay()
    const mt = current_date.getMonth()
    const y = current_date.getFullYear()
    const hours = current_date.getHours()
    const m = current_date.getMinutes()
    const s = current_date.getSeconds()
    const f = `${y}${mt}${d}TS${hours}${m}`
    return f;
}


module.exports = {

    "timeHelper": timeHelper

};

