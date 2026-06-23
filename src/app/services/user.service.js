
import { UserRepository } from "#repository";
import bcrypt from "bcrypt";


const newUser = (user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
});

class UserService {

    static async userSignup(name, email, password) {
        const existingUser = await UserRepository.findByEmail(email);
        if (existingUser) {
            throw new Error("Email is already registered");
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await UserRepository.createUser({ name, email, password: hashedPassword });

        return { user: newUser(user) };
    }

    static async userLogin(email, password) {

        const user = await UserRepository.findByEmail(email);
        if (!user) {
            throw new Error("Invalid email or password");
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            throw new Error("Invalid email or password");
        }

        return { user: newUser(user) };
    }

    static async userLogout() {
        return { message: "Logged out successfully" };
    }
}

export default UserService;