export const TimeParse=(date)=>
{
    const d=new Date(date);
    let hour; 
    if (`${d.getHours()}`.toString().length===1)
    { hour=`0${d.getHours()}`.toString(); }
    else { hour=`${d.getHours()}`.toString(); }

    let min; 
    if (`${d.getMinutes()}`.toString().length===1)
    { min=`0${d.getMinutes()}`.toString(); }
    else { min=`${d.getMinutes()}`.toString(); }

    let sec; 
    if (`${d.getSeconds()}`.toString().length===1)
    { sec=`0${d.getSeconds()}`.toString(); }
    else { sec=`${d.getSeconds()}`.toString(); }

    return `${hour}:${min}:${sec}`;
}

export const DateParse=(date)=>
{
    const d=new Date(date);
    let day; 
    if (`${d.getDate()}`.toString().length===1)
    { day=`0${d.getDate()}`.toString(); }
    else { day=`${d.getDate()}`.toString(); }

    let month; 
    if (`${d.getMonth()+1}`.toString().length===1)
    { month=`0${d.getMonth()+1}`.toString(); }
    else { month=`${d.getMonth()+1}`.toString(); }

    return `${date.slice(0,4)}-${month}-${day}`;
}