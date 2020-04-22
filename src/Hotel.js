class Hotel {
  constructor(bookingData, roomData) {
    this.bookingData = bookingData;
    this.roomData = roomData;
  }

  numRoomsOccupied(date) {
    return this.bookingData.filter(
      booking => booking.date === date
    ).length
  }

  listRoomsOccupied(date) {
    return this.bookingData.filter(
      booking => booking.date === date
    ).map(
      booking => booking.roomNumber
    ).sort(
      (a, b) => a - b
    )
  }

  roomsAvailable(date) {
    let occupiedRooms = this.listRoomsOccupied(date);
    return this.roomData.filter(
      room => !occupiedRooms.includes(room.number)
    )
  }

  totalRevenue(date) {
    let occupiedTonight = this.listRoomsOccupied(date);
    return this.roomData.filter(
      room => occupiedTonight.includes(room.number)
    ).reduce((acc, room) => {
      return acc + room.costPerNight
    }, 0)
  }

  percentOccupied(date) {
    return 100 * this.numRoomsOccupied(date) / this.roomData.length
  }
}

export default Hotel;
