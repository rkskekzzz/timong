import { UserService } from 'src/Network/UserService';
import { User } from 'src/Interface/UserType';

export async function useAddUser(user: User, users: User[], path) {
  for (const _user of users) {
    if (_user.name === user.name) {
      alert('User name is aready exist');
      return;
    }
  }
  return await UserService.createUser(path, {
    name: user.name,
    color: user.color,
  });
}
