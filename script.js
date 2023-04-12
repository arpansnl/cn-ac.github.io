
const selectMenu=document.querySelectorAll("select");
const currentTime=document.querySelector("h1");
const setAlarmBtn=document.querySelector("button");
const content=document.querySelector(".content");
const activeAlarms=document.querySelector("activeAlarms");
const alarmsList = document.getElementById('list');
const alarmsCounter = document.getElementById('alarms-counter');
let alarmsArray=[];
let alarmTime,alarmSet=false, clear,
ringtone=new Audio("alarm.mp3");

function addAlarmToDom(alarm){
    const li= document.createElement('li');
    li.innerHTML=`
    <input type="checkbox" id=${alarm.id} ${alarm.alarmActive ? "checked": ""} class="custom-checkbox">
    <label for="${alarm.id}">${alarm.alarmTime}</label>
    <img src="bin.ico" class="delete" data-id="${alarm.id}" />`;
    alarmsList.append(li);
 }

 function renderList () {
    alarmsList.innerHTML='';
    for(let i=0;i<alarmsArray.length;i++){
        addAlarmToDom(alarmsArray[i]);
    }
    alarmsCounter.innerHTML=alarmsArray.length;
}

function toggleAlarm (AlarmId) {
    const alarm= alarmsArray.filter(function(alarm){
        return alarm.id == Number(AlarmId)
    });
    if(alarm.length>0)
      {
        const currentAlarm=alarm[0];
        currentAlarm.alarmActive=!currentAlarm.alarmActive;
        renderList();
        alert('ALarm toggled successfully');
        if(setAlarmBtn.innerText=="CLEAR ALARM"){
        
            ringtone.pause();
            content.classList.remove("disable");
            setAlarmBtn.innerText="SET ALARM";
        }
        return;
      }
      alert('Alarm not toggled successfully');
}

function deleteAlarm (alarmId) {
    const newAlarms= alarmsArray.filter(function(alarm){
        return alarm.id !== Number(alarmId);
    });
    alarmsArray=newAlarms;
    renderList();
    alert('Alarm deleted successfully');
}

 function addAlarm(alarm){
    if(alarm){
    alarmsArray.push(alarm);
    renderList();
    alert('alarm added successfully');
    return;
 }
 alert('alarm not added');
}

for(let i=12;i>0;i--){
    i=i<10?"0"+i:i;
   let option=`<option value="${i}" >${i}</option>`;
   selectMenu[0].firstElementChild.insertAdjacentHTML("afterend",option);
}

for(let i=59;i>=0;i--){
    i=i<10?"0"+i:i;
   let option=`<option value="${i}" >${i}</option>`;
   selectMenu[1].firstElementChild.insertAdjacentHTML("afterend",option);
}

for(let i=1;i>=0;i--){
    let ampm = i==1?"AM":"PM";
   let option=`<option value="${ampm}" >${ampm}</option>`;
   selectMenu[2].firstElementChild.insertAdjacentHTML("afterend",option);
}

setInterval(function digitalclock(){
    let date=new Date(),
    h=date.getHours();
    m=date.getMinutes();
    s=date.getSeconds();
    ampm="AM";
    if(h>=12){
        h=h-12;
        ampm="PM";
    }
    h=h==0?h=12:h;
    h=h<10?"0"+h:h;
    m=m<10?"0"+m:m;
    s=s<10?"0"+s:s;
     
    currentTime.innerText=`${h}:${m}:${s} ${ampm}`;
    for( let i=0;i<alarmsArray.length;i++){
     if((alarmsArray[i].alarmTime == `${h}:${m}:${ampm}`)&&( alarmsArray[i].alarmActive==true)){
        ringtone.play();
        ringtone.loop=true;
         clear=alarmsArray[i].id;
        content.classList.add("disable");
        setAlarmBtn.innerText="CLEAR ALARM";
        
     }
  
    }
},1000);

function setAlarm(){
    if(setAlarmBtn.innerText=="CLEAR ALARM"){
        
        ringtone.pause();
        content.classList.remove("disable");
        setAlarmBtn.innerText="SET ALARM";
        deleteAlarm(clear);
        return;
    }
    let time=`${selectMenu[0].value}:${selectMenu[1].value}:${selectMenu[2].value}`
      if(time.includes("Hour")||time.includes("Minute")|| time.includes("AM/PM")){
        return alert("Please, select a valid time");
        
      }
      
   const alarm={
        id:Date.now(),
        alarmActive:true,
        alarmTime:time
       
    };
    addAlarm(alarm);
    
}

function handleClickListener(e){
    const target=e.target;
    console.log(target);
    if(target.className=='delete'){
        const alarmId=target.dataset.id;
        deleteAlarm(alarmId);
        return;
    }
    else if(target.className=='custom-checkbox'){
        const alarmId=target.id;
        toggleAlarm(alarmId);
        return;
    }
}
setAlarmBtn.addEventListener("click",setAlarm);
document.addEventListener('click',handleClickListener);

