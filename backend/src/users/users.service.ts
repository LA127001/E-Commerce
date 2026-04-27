import { Injectable, NotFoundException } from '@nestjs/common';

type CreateUserDTO = {
    id?: number,
    userFirstName: string;
    userLastName: string;
    userEmail: string;
    userPhone: number;
    userCity: string;
    userAddress: string;
    userPincode: number;
    role?: string;
}

@Injectable()
export class UsersService {

    private userData: CreateUserDTO[] = [{

        "id": 1,
        "userFirstName": "Demo1",
        "userLastName": "test",
        "userEmail": "demo1@test.com",
        "userPhone": 1234567890,
        "userCity": "Delhi",
        "userAddress": "Kamla Nagar",
        "userPincode": 202001,
        "role": "user",


    }, {

        "id": 2,
        "userFirstName": "Demo2",
        "userLastName": "test",
        "userEmail": "demo2@test.com",
        "userPhone": 1234567890,
        "userCity": "Delhi",
        "userAddress": "Kamla Nagar",
        "userPincode": 202001,
        "role": "admin",


    },]


    getAllUsers() {  // Get users
        return this.userData;
    }

    getUsersbyId(id: number) { // Get users by ID
        const user = this.userData.find((u) => u.id === id);

        if (!user) {
            throw new NotFoundException("User not found!");
        } return user;
    }

    createUser(data: CreateUserDTO) { // Post users
        const addUser: CreateUserDTO = {
            id: Date.now(),
            ...data,
        };
        this.userData.push(addUser);
        return addUser;
    }

    updateUser(id: number, data: CreateUserDTO) { //Put (update user detail)
        const index = this.userData.findIndex((u) => u.id === id)
        if (index === -1) throw new NotFoundException("Data not updated");
        this.userData[index] = { id,...this.userData, ...data }
        return this.userData[index];
    }

    updateUserRole(id: number, role: "user" | "admin") {
        const user = this.userData.find((u) => u.id === id)
        if (!user) throw new NotFoundException("User not found");
        user.role = role;
        return user;
    }

    deleteUser(id: number) {
        const index = this.userData.findIndex((u) => u.id === id)
        if (index === -1) throw new NotFoundException("Data not found");
        const deleted = this.userData.splice(index, 1)
        return { message: "User deleted successfully!", userData: deleted[0] }
    }
}
