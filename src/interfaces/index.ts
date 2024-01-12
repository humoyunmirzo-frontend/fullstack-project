export interface IAuthUser {
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
  gender: string
  image: string
}
export interface IUser {
  id: number
  firstName: string
  lastName: string
  maidenName: string
  age: number
  gender: string
  email: string
  phone: string
  username: string
  password: string
  birthDate: number
  image: string
  bloodGroup: string
  height: number
  weight: number
  eyeColor: string
  hair: { color: string, type: string }
  domain: string
  ip: string
  address: {
    address: string
    city: string
    coordinates: { lat: number, lng: number }
    postalCode: string
    state: string
  }
  macAddress: string
  university: string
  bank: {
    cardExpire: string
    cardNumber: string
    cardType: string
    currency: string
    iban: string
  }
  company: {
    address: {
      address: string
      city: string
      coordinates: { lat: number, lng: number }
      postalCode: string
      state: string
    }
    department: string
    name: string
    title: string
  }
  ein: string
  ssn: string
  userAgent: string
}
export interface IProduct {
  id: number
  title: string
  description: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  brand: string
  category: string
  thumbnail: string
  images: string[]
}
export interface IPost {
  id: number
  title: string
  body: string
  userId: number
  tags: string[]
  reactions: number
}
export interface ITodo {
  id: number
  todo: string
  completed: boolean
  userId: number
}
