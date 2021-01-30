// generate slots between two times
const moment = require('moment');

/**
 * @function generateSlots 
 * @params startTime,endTime,duration,data;
 * @return Object containing array of slots, morning , noon, evening;
 * */ 
const generatSlot = (start,end,duration,date)=>{

    
    // set the startTime value to passed date Object
    let cur = moment(date).set({'hour':start.split(":")[0],'minute':start.split(':')[1]});
    
    var startTime = moment(cur, 'HH:mm');
    var endTime = moment(end, 'HH:mm');
    
    // check whether endTime is before current dateTime, if it is than add 1 day to match;
    if( endTime.isBefore(startTime) ){
      endTime.add(1, 'day');
    }

    var timeStops =  {};
    let morning = [];
    let noon = [];
    let evening = [];
    
    // add until startTime become greater or equals to endTime
    while(startTime <= endTime){
    
      if(moment(startTime).hour() < 12){
        morning.push(moment(startTime))
      }else if(moment(startTime).hour() >= 12 &&moment(startTime).hour() >= 17){
        noon.push(moment(startTime))
      }else{
        evening.push(moment(startTime))
      }
      // add hours to startTime
      startTime.add(duration, 'minutes');
    }

    timeStops = {
      'morning':morning,
      'noon':noon,
      'eve':evening
    }
    return timeStops; 
}

// Current date with initial hours, minutes, second, millisecond
const timeFormat = moment().utcOffset(0);
timeFormat.set({hour:0,minute:0,second:0,millisecond:0});
timeFormat.toISOString()
timeFormat.format("YYYY-MM-DDTHH:mm");

// Passing current arguments to the function to get slots
const getSlots = generatSlot("9:00","24:00",30,timeFormat.format());

let morningSlot = getSlots.morning.map(i=>{
  return moment(i).format("h:mm a")
})
console.log(getSlots)