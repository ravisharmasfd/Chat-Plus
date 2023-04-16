
export interface UserLogin{
        email : string;
        password : string;
}
export interface UserType extends UserLogin {
    name  : string;
    phone : string;
    confirmPassword : string;
    id ?: string
}
export interface AuthType{
    user:UserType,
    signIn:boolean
}
export interface StateType{
    auth: AuthType
}