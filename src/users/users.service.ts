import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { GetPlayersDto } from './dto/create-users.dto';


@Injectable()
export class UsersService {

  constructor(@InjectModel(User.name) private userModel: Model<User>) { }

  async onModuleInit() {
    console.log('Seeding dummy users...');
    await this.createDummyUsers();
  }

  async createDummyUsers(): Promise<void> {
    const dummyUsers = [
      {
        chatId: "1000000001",
        firstName: "Alice",
        lastName: "Smith",
        username: "alice_smith",
        phoneNumber: "251912345678",
        password: "1234",
        isBan: false,
      },
      {
        chatId: "1000000002",
        firstName: "Bob",
        lastName: "Johnson",
        username: "bob_johnson",
        phoneNumber: "251923456789",
        password: "1234",
        isBan: false,
      },
      {
        chatId: "1000000003",
        firstName: "Charlie",
        lastName: "Brown",
        username: "charlie_b",
        phoneNumber: "251934567890",
        password: "1234",
        isBan: false,
      },
      {
        chatId: "1000000004",
        firstName: "David",
        lastName: "Williams",
        username: "david_w",
        phoneNumber: "251945678901",
        password: "1234",
        isBan: false,
      },
      {
        chatId: "1000000005",
        firstName: "Eva",
        lastName: "Davis",
        username: "eva_d",
        phoneNumber: "251956789012",
        password: "1234",
        isBan: false,
      }
    ];

    for (const user of dummyUsers) {
      const userExists = await this.userModel.exists({ chatId: user.chatId });
      if (!userExists) {
        await this.userModel.create(user);
        console.log(`User ${user.firstName} created.`);
      } else {
        console.log(`User ${user.firstName} already exists.`);
      }
    }
  }



  // Example method to update the ban status
  async updateBan(id: string, isBan: boolean): Promise<User> {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    user.isBan = isBan;
    await user.save();
    return user;
  }
  
  async findAll(
    page: number = 1,
    pageSize: number = 10,
    searchTerm?: string,
    columnName?: string,
    filterValue?: string,
    startDate?: string,
    endDate?: string
  ) {
    try {
      page = Number(page) || 1;
      pageSize = Number(pageSize) || 10;
      const skip = (page - 1) * pageSize;
      const query: any = {};

      if (startDate && endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999); // Include entire end day

        query.createdAt = {
          $gte: start,
          $lte: end
        };
      }

      // Apply search logic if searchTerm is provided
      if (searchTerm?.trim()) {
        query.$or = [
          { firstName: { $regex: searchTerm, $options: 'i' } },
          { lastName: { $regex: searchTerm, $options: 'i' } },
          { username: { $regex: searchTerm, $options: 'i' } },
          { chatId: { $regex: searchTerm, $options: 'i' } },
          { phoneNumber: { $regex: searchTerm, $options: 'i' } }
        ];
      }

      // Apply additional filters if columnName and filterValue are provided
      if (columnName?.trim() && filterValue?.trim()) {
        if (['chatId', 'phoneNumber'].includes(columnName)) {
          query[columnName] = filterValue;
        } else {
          query[columnName] = { $regex: filterValue, $options: 'i' };
        }
      }

      console.log('Executing query:', JSON.stringify(query, null, 2));

      // Fetch results from MongoDB
      const [users, totalCount] = await Promise.all([
        this.userModel.find(query).skip(skip).limit(pageSize).exec(),
        this.userModel.countDocuments(query).exec()
      ]);

      return {
        success: true,
        data: users,
        metaData: {
          totalCount,
          currentPage: page,
          pageSize,
          totalPages: Math.ceil(totalCount / pageSize)
        }
      };
    } catch (error) {
      console.error('Error fetching users:', error);
      return {
        success: false,
        data: [],
        metaData: { totalCount: 0, currentPage: page, pageSize, totalPages: 0 },
        message: 'Failed to fetch users'
      };
    }
  }







  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }

  async update(id: string, user: Partial<GetPlayersDto>): Promise<User> {
    const updatedUser = await this.userModel.findByIdAndUpdate(id, user, {
      new: true,
    }).exec();
    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }
    return updatedUser;
  }

  async delete(id: string): Promise<User> {
    const deletedUser = await this.userModel.findByIdAndDelete(id).exec();
    if (!deletedUser) {
      throw new NotFoundException('user not found');
    }
    return deletedUser;
  }
}
