import { Controller, Get, Delete, Post, Put, Body, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(readonly userDataService: UsersService) { }


    @Get()
    getAllUser() {
        return this.userDataService.getAllUsers()
    }

    @Get(':id')
    getUserByID(@Param('id') id: string) {
        return this.userDataService.getUsersbyId(Number(id))
    }

    @Post()
    createUser(@Body() body: { userFirstName: string, userLastName: string, userEmail: string, userPhone: number, userCity: string, userAddress: string, userPincode: number }) {
        return this.userDataService.createUser(body);
    }

    @Put(':id')
    updateUser(@Param('id') id: string, @Body() body: { userFirstName: string, userLastName: string, userEmail: string, userPhone: number, userCity: string, userAddress: string, userPincode: number }) {
        return this.userDataService.updateUser(Number(id), body)

    }

    @Put(':id/role')
    updateUserbyRole(@Param(':id') id: String, @Body('role') role: "user" | "admin") {
        return this.userDataService.updateUserRole(Number(id), role);
    }

    @Delete(':id')
    deleteUser(@Param('id') id: string) {
        return this.userDataService.deleteUser(Number(id))
    }
}
