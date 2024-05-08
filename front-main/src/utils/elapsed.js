function elapsed(datetime, precision = 3) {
    const timestamp = new Date(datetime).getTime();
    let time = Math.floor((Date.now() - timestamp) / 1000);
    const intervals = { 'J': 86400, 'h': 3600, 'm': 60 };
    let i = 0;
    let result = '';
  
    for (const [unit, value] of Object.entries(intervals)) {
      const count = Math.floor(time / value);
      if (count) i++;
      time -= count * value;
      
      const unitString = count ? `${count} ${unit} ` : '';
      result += unitString;
      if (i >= precision) break;
    }
    
    return result ? "il y a " + result  : 'il y a 1 sec ';
  }
  export default elapsed