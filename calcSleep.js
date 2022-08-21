let wakeUpMin = document.getElementById('timesMin');
let wakeUpHours= document.getElementById('timesH');
let wakeUpDayNight = document.getElementById('timesDay');
let offSetTime = document.getElementById('offSet');

let calculateButton = document.getElementById('calculateButton');
let resultDisplayText = document.getElementById('resultDisplayText');
let resultDisplayText2 = document.getElementById('resultDisplayText2');
let resultDisplayText3 = document.getElementById('resultDisplayText3');
let graph = null;

calculateButton.onclick = () => calc();

function millisToMinutesAndSeconds(millis, only) {
    let hours = Math.floor(millis / 3600000);
    let minutes = Math.floor((millis % 3600000) / 60000);
    if (minutes < 10) minutes = '0'+ minutes;
    if (hours < 10) hours = '0' + hours;
    if (only === 'h') return hours;
    if (only === 'm') return minutes;

    return hours + ':' + minutes
}

function calc () {
    const currentDate = new Date()
    const avarageAwakeTime = 61200000;
    let prefixDay = 0;
    
    if (wakeUpDayNight.value === 'yesterday') prefixDay += 1

    const awakingDate = new Date(currentDate.getFullYear(),currentDate.getMonth(),currentDate.getDate() - prefixDay, parseInt(wakeUpHours.value), parseInt(wakeUpMin.value));
    const timeAwake = currentDate.getTime() - awakingDate.getTime()
    const timeLeft = avarageAwakeTime - timeAwake

    const bedTime =  new Date(awakingDate.getTime() + avarageAwakeTime + 1200000);
    const arrayOfDays = getDays(currentDate, prefixDay, millisToMinutesAndSeconds, awakingDate, avarageAwakeTime, parseInt(offSetTime.value));

    createHistogram(arrayOfDays)

    resultDisplayText.innerText = `You are awake for ${millisToMinutesAndSeconds(timeAwake)} hours`
    resultDisplayText2.innerText = `${timeLeft < 0 ? 'Get some sleep!' : 'Available time ' +millisToMinutesAndSeconds(timeLeft) + ' hours'}`
    resultDisplayText3.innerText = `Bedtime : ${bedTime.toUTCString()}`
}

function getDays (currentDate, prefixDay, millisToMinutesAndSeconds, awakingDate, avarageAwakeTime, offSet) {
    let arrayOfDates = [];
    let dateOffset = offSet;

    for (let i=0; i <= 14; i++) {
        let newDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - prefixDay + i, awakingDate.getHours() + millisToMinutesAndSeconds(avarageAwakeTime, 'h'), awakingDate.getMinutes() + millisToMinutesAndSeconds(avarageAwakeTime, 'm') + dateOffset)
        arrayOfDates.push(newDay)
        dateOffset += offSet
    }

    return arrayOfDates;
}

function createHistogram(arr) {
    const canvas = document.getElementById('myChart');
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let lables = []
    let hours = []

    for(i in arr){
        let day = arr[i].getDay() 
        if (day === 0) lables.push('Monday ' + arr[i].getDate())
        if (day === 1) lables.push('Tuesday ' + arr[i].getDate())
        if (day === 2) lables.push('Wednesday ' + arr[i].getDate())
        if (day === 3) lables.push('Thursday ' + arr[i].getDate())
        if (day === 4) lables.push('Friday ' + arr[i].getDate())
        if (day === 5) lables.push('Saturday ' + arr[i].getDate())
        if (day === 6) lables.push('Sunday ' + arr[i].getDate())

        hours.push(arr[i].getHours())
    }

    if (graph) graph.destroy();
    graph = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: lables,
            datasets: [{
                label: '# of Votes',
                data: hours,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1,
                barPrecentage: 1,
                categoryPrecentage: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: false
                }
            }
        }
    });
}