import { User } from '../entities/user.entity';
import { UpdateUserDto } from './update-user.dto';

export default function updateFactory(user: User, data: UpdateUserDto): User {
  user.address = data.address ?? user.address;
  user.birthDate = data.birthDate ?? user.birthDate;
  user.birthPlace = data.birthPlace ?? user.birthPlace;
  user.email = data.email ?? user.email;
  user.firstName = data.firstName ?? user.firstName;
  user.lastName = data.lastName ?? user.lastName;
  user.password = data.password ?? user.password;
  user.phone = data.phone ?? user.phone;
  user.maritalStatus = data.maritalStatus ?? user.maritalStatus;
  return user;
}
