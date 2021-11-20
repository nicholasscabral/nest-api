import { User } from "../users/user.entity";

export class TestUtil {
  static validUser(): User {
    const user = new User();
    (user.username = "validusername"),
      (user.email = "valid@test.com"),
      (user.password = "validpassword"),
      (user.id = "validid");
    return user;
  }

  static userList(): User[] {
    const user1 = new User({
      id: "1",
      username: "validusername1",
      email: "validemail1",
    });
    const user2 = new User({
      id: "2",
      username: "validusername2",
      email: "validemail2",
    });
    const user3 = new User({
      id: "3",
      username: "validusername3",
      email: "validemail3",
    });

    return [user1, user2, user3];
  }
}
