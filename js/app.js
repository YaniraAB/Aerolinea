/*  Declarar un array que representara los sientos de nuestro avion con false indicando que estos estan vacios y los ocupados seran = true*/

var airlineSeats = [
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
];

/*  Contador que nos ayudara a rastrear el numero de asientos ocupados*/
var busySeats = 0;

var paintSeats = function(array) {
  var containerSeats = document.getElementById('seats');

  for (var i = 0; i < array.length; i++) {
    var seat = document.createElement('div');
    seat.className = 'seats';

    /*  del primer elemento al cuarto, en nuestro arreglo va a ser primera clase, que seria del indice 0 al 3*/
    if (i < 4) {
        seat.style.backgroundColor = 'purple';
    } else {
      seat.style.backgroundColor = 'yellow';
    }
    containerSeats.appendChild(seat);
  }
};

var reserve = function() {
  var btn = document.getElementById('btn');
  btn.addEventListener('click', chooseZone);
};

var chooseZone = function() {
  var choice = prompt(
    'En que zona prefieres reservar \n 1. Primera Clase \n 2. Económica \n \n Por favor ingresa el número de tu preferencia'
  );

  if (choice == 1) {
    checkFirstClassZone();
  } else if (choice == 2) {
    checkEconomicZone();
  } else {
    alert('Por favor ingresa un número válido')
  }
};

var checkFirstClassZone = function() {
  var zone = 'Primera Clase';
  /*recorre del elemento 0 al 3 y verifica cuales estan disponibles*/
  for (var index = 0; index < 4; index++) {
    if (airlineSeats[index] == false) {
      airlineSeats[index] = true;
      reserveSeat(index);
      paintTicket(index, zone);
      busySeats++;
      /*Al reservar un asiento no necesitamos seguir recorriendo el arreglo, rompemos el for con break*/
      break;
    } else if (index == 3 && airlineSeats[index] == true) {
      reasignEconomicZone();
    }
  }
};

var checkEconomicZone = function() {
   var zone = 'Económica';
   for (var index = 4; index < 10; index++) {
     if (airlineSeats[index] == false) {
       airlineSeats[index] = true;
       reserveSeat(index);
       paintTicket(index, zone);
       busySeats++;
       break;
     } else if (index == 9 && airlineSeats[index] == true) {
       reasignFirstClassZone();
     }
   }
};

var reserveSeat = function(indexToPaint) {
  var seat = document.getElementsByClassName('seats');
  seat[indexToPaint].textContent = 'Ocupado';
};

var reasignEconomicZone = function(zone) {
  if (busySeats == 10) {
    noSeats();
    nextFlight();
  } else {
    var reasign = confirm(
      'Ya no quedan asientos disponibles en ' + zone + ':( \n Quieres reservar en zona Económica? '
    );
    if (reasign == true) {
      checkEconomicZone();
    } else {
      nextFlight();
    }
  }
};

var reasignFirstClassZone = function (zone) {
  if (busySeats == 10) {
    noSeats();
    nextFlight();
  } else {
    var reasign = confirm (
      'Ya no quedan asientos en ' + zone + ' :( \n Quieres reservar en Primera Clase?'
    );
    if (reasign == true) {
      checkFirstClassZone();
    } else {
      nextFlight();
    }
  }
};

var paintTicket = function(index, zone) {
  var containerTickets = document.getElementById('tickets');
  var ticket = document.createElement('div');
  ticket.className = 'seats';
  var title = document.createElement('p');
  var reservedSeating = document.createElement('p');
  var zoneClass = document.createElement('p');
  title.textContent = 'PASE DE ABORDAR';
  reservedSeating.textContent = 'Nº de asiento: ' + (index + 1);
  zoneClass.textContent = zone;
  ticket.appendChild(title);
  ticket.appendChild(reservedSeating);
  ticket.appendChild(zoneClass);
  containerTickets.appendChild(ticket);
};

var nextFlight = function() {
  alert('Nuestro próximo vuelo sale en 3 horas!')
};
var noSeats = function() {
  alert('Lo sentimos :( \n Ya no quedan asientos disponibles en este avión.')
};

paintSeats(airlineSeats);
reserve();
