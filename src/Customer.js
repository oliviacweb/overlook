class Customer {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    // this.futureBookings = [];
    // this.pastBookings = [];
    // this.totalSpent = 0;
  }


  allBookings(bookingData) {
    return bookingData.filter(booking => booking.userID === this.id).length
  }

  futureBookings(bookingData, todayDate) {
  return bookingData.filter(booking => booking.userID === this.id).filter(booking => booking.date > todayDate)
  }

  pastBookings(bookingData, todayDate) {
      return bookingData.filter(booking => booking.userID === this.id).filter(booking => booking.date < todayDate)
  }

  presentBookings(bookingData, todayDate) {
    return bookingData.filter(booking => booking.userID === this.id).filter(booking => booking.date === todayDate)
  }




  getTotalSpent(bookingData, roomsData) {
    let allUserBookings = bookingData.filter(booking => booking.userID === this.id)
    let currentUserTotal = allUserBookings.reduce((acc, userBooking) => {
      let roomValue = roomsData.find(room => room.number === userBooking.roomNumber).costPerNight
      acc += roomValue
      return acc;
    }, 0)
    this.totalSpent = currentUserTotal;
  }


}



export default Customer;
