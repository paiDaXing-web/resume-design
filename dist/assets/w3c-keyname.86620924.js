for(var e={8:"Backspace",9:"Tab",10:"Enter",12:"NumLock",13:"Enter",16:"Shift",17:"Control",18:"Alt",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",44:"PrintScreen",45:"Insert",46:"Delete",59:";",61:"=",91:"Meta",92:"Meta",106:"*",107:"+",108:",",109:"-",110:".",111:"/",144:"NumLock",145:"ScrollLock",160:"Shift",161:"Shift",162:"Control",163:"Control",164:"Alt",165:"Alt",173:"-",186:";",187:"=",188:",",189:"-",190:".",191:"/",192:"`",219:"[",220:"\\",221:"]",222:"'"},t={48:")",49:"!",50:"@",51:"#",52:"$",53:"%",54:"^",55:"&",56:"*",57:"(",59:":",61:"+",173:"_",186:":",187:"+",188:"<",189:"_",190:">",191:"?",192:"~",219:"{",220:"|",221:"}",222:'"'},r="undefined"!=typeof navigator&&/Chrome\/(\d+)/.exec(navigator.userAgent),o="undefined"!=typeof navigator&&/Apple Computer/.test(navigator.vendor),n="undefined"!=typeof navigator&&/Gecko\/\d+/.test(navigator.userAgent),a="undefined"!=typeof navigator&&/Mac/.test(navigator.platform),i="undefined"!=typeof navigator&&/MSIE \d|Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(navigator.userAgent),f=r&&(a||+r[1]<57)||n&&a,d=0;d<10;d++)e[48+d]=e[96+d]=String(d);for(d=1;d<=24;d++)e[d+111]="F"+d;for(d=65;d<=90;d++)e[d]=String.fromCharCode(d+32),t[d]=String.fromCharCode(d);for(var g in e)t.hasOwnProperty(g)||(t[g]=e[g]);function p(r){var n=!(f&&(r.ctrlKey||r.altKey||r.metaKey)||(o||i)&&r.shiftKey&&r.key&&1==r.key.length||"Unidentified"==r.key)&&r.key||(r.shiftKey?t:e)[r.keyCode]||r.key||"Unidentified";return"Esc"==n&&(n="Escape"),"Del"==n&&(n="Delete"),"Left"==n&&(n="ArrowLeft"),"Up"==n&&(n="ArrowUp"),"Right"==n&&(n="ArrowRight"),"Down"==n&&(n="ArrowDown"),n}export{e as b,p as k,t as s};