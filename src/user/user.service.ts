import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>
  ) { }

  async createUser(user: CreateUserDto) {
    return await this.userRepository.save(user);
  }

  async getUser(email: string) {
    return await this.userRepository.findOne({ where: { email } });
  }

  async updateUser(email: string, _user: UpdateUserDto) {
    const user: User = await this.getUser(email);
    console.log(_user);
    user.username = _user.username;
    user.password = _user.password;
    console.log(user);

    return await this.userRepository.save(user);
  }

  async deleteUser(email: string) {
    return await this.userRepository.delete({ email });
  }

  async findByEmailOrSave(email, username, providerId): Promise<User> {
    const user = await this.getUser(email);
    if (user) {
      return user;
    }

    const newUser = await this.userRepository.save({
      email,
      username,
      providerId,
    });

    return newUser;
  }
}
