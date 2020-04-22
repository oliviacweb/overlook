import chai from 'chai';
const expect = chai.expect;

import Hotel from '../src/Hotel.js';
import bookingData from '../src/test-data/booking-data.js';
import roomData from '../src/test-data/room-data.js';
import userData from '../src/test-data/user-data.js';

describe('Hotel Class', function() {

  let hotel;
  beforeEach(() => {
    hotel = new Hotel(bookingData, roomData);
  })
    it('should be a function', function() {
      expect(Hotel).to.be.a('function');
    });

    it('should be an instance of the Hotel class', function() {
      expect(hotel).to.be.an.instanceOf(Hotel);
    });

    it('should have booking data', function() {
      expect(hotel.bookingData.length).to.equal(1000);
    });

    it('should have room data', function() {
      expect(hotel.roomData.length).to.equal(25);
    });

    it('should give us the rooms occupied today', function() {
      expect(hotel.numRoomsOccupied("2020/02/27")).to.equal(14)
    });

    it('should give us the percent of rooms occupied', function() {
      expect(hotel.percentOccupied("2020/02/27")).to.equal(14*100/25)
    });

    it('should give us a list of the room numbers occupied', function() {
    expect(hotel.listRoomsOccupied("2020/02/27")).to.deep.equal([ 2, 4, 8, 9 ,
    11 ,  13 ,  14 ,  16 , 17 , 18 , 21 , 23 ,  24 ,  25])
   });
   it('should give us a list of the rooms available', function() {
   expect(hotel.roomsAvailable("2020/02/27")).to.deep.equal([{
          "bedSize": "queen"
      ,    "bidet": true
      ,    "costPerNight": 358.4
      ,    "numBeds": 1
      ,    "number": 1
      ,    "roomType": "residential suite"
         }
      ,  {
          "bedSize": "king"
      ,    "bidet": false
      ,    "costPerNight": 491.14
      ,    "numBeds": 1
      ,    "number": 3
      ,    "roomType": "single room"
        }
      ,  {
          "bedSize": "queen"
      ,    "bidet": true
      ,    "costPerNight": 340.17
      ,    "numBeds": 2
      ,    "number": 5
      ,    "roomType": "single room"
        }
      ,  {
          "bedSize": "queen"
      ,    "bidet": true
      ,    "costPerNight": 397.02
      ,    "numBeds": 1
      ,    "number": 6
      ,    "roomType": "junior suite"
        }
      ,  {
          "bedSize": "queen"
      ,    "bidet": false
      ,    "costPerNight": 231.46
      ,    "numBeds": 2
      ,    "number": 7
      ,    "roomType": "single room"
         }
      ,  {
          "bedSize": "twin"
      ,    "bidet": false
      ,    "costPerNight": 497.64
      ,    "numBeds": 1
      ,    "number": 10
      ,    "roomType": "suite"
        }
      ,  {
          "bedSize": "twin"
      ,    "bidet": false
      ,    "costPerNight": 172.09
      ,    "numBeds": 2
      ,    "number": 12
      ,    "roomType": "single room"
        }
      ,  {
          "bedSize": "full"
      ,    "bidet": false
      ,    "costPerNight": 294.56
      ,    "numBeds": 1
      ,    "number": 15
      ,    "roomType": "residential suite"
        }
      ,  {
          "bedSize": "queen"
      ,    "bidet": false
      ,    "costPerNight": 374.67
      ,    "numBeds": 1
      ,    "number": 19
      ,    "roomType": "single room"
        }
      ,  {
          "bedSize": "queen"
      ,    "bidet": false
      ,    "costPerNight": 343.95
      ,    "numBeds": 1
      ,    "number": 20
      ,    "roomType": "residential suite"
        }
      ,  {
          "bedSize": "full"
      ,    "bidet": false
      ,    "costPerNight": 350.31
      ,    "numBeds": 2
      ,    "number": 22
      ,    "roomType": "single room"
        }
])
  });
  it('should give us the total revenue for one day', function() {
  expect(hotel.totalRevenue("2020/02/27")).to.equal(4846.44) });

  })
