class Hotel {
  constructor(bookingData, roomData) {
    // this.todayDate = todayDate;
    this.bookingData = bookingData;
    this.roomData = roomData;
  }
  numRoomsOccupied(todayDate) {
    //14 bookings 2020/02/27
    return this.bookingData.filter(
      booking => booking.date === todayDate
    ).length

  }

  listRoomsOccupied(todayDate) {
    return this.bookingData.filter(
      booking => booking.date === todayDate
    ).map(
      booking => booking.roomNumber
    ).sort(
      (a, b) => a - b
    )
  }
  roomsAvailable(todayDate) {
    let occupiedRooms = this.listRoomsOccupied(todayDate);
    return this.roomData.filter(
      room => !occupiedRooms.includes(room.number)
    )

  }

  totalRevenue(todayDate) {
    let occupiedTonight = this.listRoomsOccupied(todayDate);
     return this.roomData.filter(
      room => occupiedTonight.includes(room.number)
    ).reduce((acc, room) => {
     return acc + room.costPerNight
    }, 0)
  }

  percentOccupied(todayDate) {
    return 100 * this.numRoomsOccupied(todayDate) / this.roomData.length
  }
}

export default Hotel;
