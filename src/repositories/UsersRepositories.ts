import { EntityRepository, Repository } from "typeomr"
import { User } from "../entities/User";


@EntityRepository(User)
class UsersRepositories extends Repository<User>{}

export { UsersRepositories };