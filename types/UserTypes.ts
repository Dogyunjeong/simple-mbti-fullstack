namespace UserTypes {
  export interface UserCreate {
    email: string
  }
  export interface User extends UserCreate {
    id: number
  }
}

export default UserTypes