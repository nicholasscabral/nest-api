import { EntityRepository, Repository } from "typeorm";
import { User } from "./user.entity";

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async verifyCredentials(username: string, email: string): Promise<boolean> {
    const usernameInUse = await this.findOne({ username });

    if (usernameInUse) return true;

    const emailInUse = await this.findOne({ email });

    if (emailInUse) return true;

    return false;
  }
}
