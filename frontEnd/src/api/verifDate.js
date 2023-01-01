export default function verifDiffDate(date1, date2){
    var diff = {}                           // Initialisation du retour
    var tmp = date2 - date1;
  
    tmp = Math.floor(tmp/1000);             // Nombre de secondes entre les 2 dates
    diff.sec = tmp % 60;                    // Extraction du nombre de secondes
  
    tmp = Math.floor((tmp-diff.sec)/60);    // Nombre de minutes (partie entière)
    diff.min = tmp % 60;                    // Extraction du nombre de minutes
  
    tmp = Math.floor((tmp-diff.min)/60);    // Nombre d'heures (entières)
    diff.hour = tmp % 24;                   // Extraction du nombre d'heures
     
    tmp = Math.floor((tmp-diff.hour)/24);   // Nombre de jours restants
    diff.day = tmp % 7;
  
    tmp = Math.floor((tmp-diff.day)/7);
    diff.week = tmp % 4;
  
    tmp = Math.floor((tmp-diff.week)/4);
    diff.month = tmp % 12 ;
  
    tmp = Math.floor((tmp-diff.month)/12);
    diff.year = tmp;
     
    return diff;
  }
  
  // date1 = new Date('2021-04-3');
  // date2 = new Date('2022-12-20');
  // diff = dateDiff(date1, date2);
  // console.log(diff)
  
  