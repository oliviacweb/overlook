import chai from 'chai';
const expect = chai.expect;
// import moment from 'moment';

import Customer from '../src/Customer.js';
import bookingData from '../src/test-data/booking-data.js';
import roomData from '../src/test-data/room-data.js';
import userData from '../src/test-data/user-data.js';
describe('Customer Class', function() {


let customer;

  beforeEach(() => {
    customer = new Customer(userData[10]);
  })
    it('should be a function', function() {
      expect(Customer).to.be.a('function');
    });

    it('should be an instance of the Customer class', function() {
      expect(customer).to.be.an.instanceOf(Customer);
    });

    it('should give us the number of bookings for customer', function() {
      expect(customer.allBookings(bookingData).length).to.equal(12)
    });

    it('should give us the past bookings for a customer', function() {
      expect(customer.futureBookings(bookingData, "2020/02/11").length).to.deep.equal(1)
    });

    it('should give us the future bookings for a customer', function() {
      expect(customer.pastBookings(bookingData, "2020/02/01").length).to.equal(4)
    });

    it('should give us the present bookings for a customer', function() {
      expect(customer.presentBookings(bookingData, "2020/02/01").length).to.equal(3)
    });

    it('should give us the total customer spent on all bookings', function() {
      expect(customer.getTotalSpent(bookingData, roomData)).to.equal(4456.9)
    });


  })
