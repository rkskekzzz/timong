import { UserService } from 'src/Network/UserService';
import { User } from 'src/Interface/UserType';

export async function addUserInCalendar(
  user: User,
  users: User[],
  path,
  isSigned: boolean
) {
  for (const _user of users) {
    if (_user.name === user.name) {
      alert('User name is aready exist');
      return;
    }
  }
  return UserService.createUser(path, {
    name: user.name,
    color: user.color,
    isSigned: isSigned,
  });
}
