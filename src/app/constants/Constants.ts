export class Constants {
  static passwordPattern: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/
  static namePattern: RegExp = /^[a-zA-Zа-яА-Я]+$/;
  static phonePattern: RegExp = /^0[67][0-9]{7}$/;
  static serverUrl: string = "http://localhost:8080/";
}
