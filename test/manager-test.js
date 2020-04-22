import chai from 'chai';
const expect = chai.expect;
import Manager from '../src/Manager.js';
import Customer from '../src/Customer.js';
import bookingData from '../src/test-data/booking-data.js';
import roomData from '../src/test-data/room-data.js';
import userData from '../src/test-data/user-data.js';

describe('Manager Class', function() {
  let manager;
  beforeEach(() => {
    manager = new Manager();
  });
    
  it('should be a function', function() {
    expect(Manager).to.be.a('function');
  });

  it('should give us a new Customer id', function() {
    expect(manager.findCustomerId(userData, "Kelvin Schiller")).to.equal(3)
  });

  it('should give us past customer bookings before a date', function() {
    expect(manager.findPastCustomerBookings(bookingData, "2020/02/01", 3).length).to.equal(4)
  });

  it('should give us todays customer bookings', function() {
    expect(manager.findTodayCustomerBookings(bookingData, "2020/02/01", 3)).to.deep.equal([])
  });

  it('should give us future customer bookings', function() {
    expect(manager.findFutureCustomerBookings(bookingData, "2020/02/01", 3).length).to.equal(8)
  });
})
