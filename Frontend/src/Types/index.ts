
export interface UserLogin{
        email : string;
        password : string;
}
export interface UserType extends UserLogin {
    name  : string;
    phone : string;
    confirmPassword : string;
}
