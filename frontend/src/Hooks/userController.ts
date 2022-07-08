import { UserService } from 'src/Network/UserService';
import { User } from 'src/Interface/UserType';

export async function addUserInCalendar(
  user: User,
  path: string,
  isSigned: boolean
) {
  return UserService.createUser(path, {
    name: user.name,
    color: user.color,
    isSigned: isSigned,
  });
}

export async function updateUserInCalendar(
  user: User,
  id: string,
  path: string
) {
  return UserService.updateUser(path, {
    _id: id,
    name: user.name,
    color: user.color,
  });
}
