export type Car = {
    id: number,
    plate: string,
    status: string,
    customerId: number,
    modelId: number,
    model: Model
}

export type Model = {
      id: number,
      model: string,
      year: number,
      color: string,
      type: string,
      seats: number,
      doors: number,
      fuel: string,
      minimalAge: number,
      brandId: number,
      brand: Brand,
      pricePerDay: number
}

export type Brand = {
    id: number,
    brand: string
}

export type Rent = {
    id:number,
    carId: number,
    car: Car,
    rentDate : string,
    returnDate : string,
    totalPrice : number
}