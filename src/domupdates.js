let domUpdates = {

  showTodayBookings(customer, bookingData, today) {
  return customer.presentBookings(bookingData, today);
},

  showFutureBookings(customer, bookingData, today) {
    return customer.futureBookings(bookingData, today);
  },

  showPastBookings(customer, bookingData, today) {
    return customer.pastBookings(bookingData, today);
  },

  showCustomerAmountSpent(customer, bookingData, roomData, date) {
    return customer.getTotalSpent(bookingData, roomData);
  },

  showHotelRoomsAvail(hotel, date) {
    return hotel.roomsAvailable(date)
  },

  showTotalRevenue(hotel, date) {
    return hotel.totalRevenue(date)
  },

  showPercentOccupied(hotel, date) {
    return hotel.percentOccupied(date)
  }
}
export default domUpdates
