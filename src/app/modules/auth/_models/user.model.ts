import { AuthModel } from './auth.model';

export class UserModel extends AuthModel {
  id: number;
  password: string;
  firstname: string;
  lastname: string;
  fullname: string;
  email: string;
  pic: string;
  permission: number;
  phone: string;
  licence: string;

  setUser(user: any) {
    this.id = user.id;
    this.password = user.password || '';
    this.firstname = user.firstname || '';
    this.lastname = user.lastname || '';
    this.fullname = user.firstname + ' ' + user.lastname  || '';
    this.email = user.email || '';
    this.pic = user.pic || './assets/media/users/default.jpg';
    this.permission = user.permission;
    this.phone = user.phone || '';
  }
}
