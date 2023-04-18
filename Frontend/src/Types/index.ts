
export interface UserLogin{
        email : string;
        password : string;
}
export interface UserType extends UserLogin {
    name  : string;
    phone : string;
    confirmPassword : string;
    id ?: number
}
export interface AuthType{
    user:UserType,
    signIn:boolean
}
export interface StateType{
    auth: AuthType
}
export interface ChatType{
    chatId:number;
    name:string;
    email:string;
    phone:string;
    userId:number;
    group:number;
}
export interface MessageType{
    chatId:number;
    text:string;
    userId?:number;
    name:string;
    createdAt: string
}
