import { Injectable, OnModuleInit } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as TelegramBot from 'node-telegram-bot-api';
import { User } from 'src/users/user.schema';

@Injectable()
export class TelegramService implements OnModuleInit {
    private bot: TelegramBot;
    private readonly token = '7855743164:AAF0a89fMBXEI4SD01u2MO4FNjLzq-NPQFE';

    constructor(private readonly usersService: UsersService) { }

    onModuleInit() {
        this.bot = new TelegramBot(this.token, { polling: true });
    
        // Handle the /start command
        this.bot.onText(/\/start/, async (msg) => {
            const chatId = msg.chat.id.toString();
    
            // Check if the user is already registered
            const existingUser = await this.usersService.findByChatId(chatId);
    
            if (existingUser) {
                // If user exists, welcome them back and show the profile
                this.bot.sendMessage(chatId, `Welcome back, ${existingUser.firstName}!`);
                this.openProfile(existingUser, chatId);
            } else {
                // If user does not exist, prompt for phone number
                this.bot.sendMessage(chatId, 'Please share your phone number to complete registration.', {
                    reply_markup: {
                        keyboard: [[{
                            text: 'Share Contact',
                            request_contact: true,
                        }]],
                        resize_keyboard: true,
                        one_time_keyboard: true,
                    },
                });
            }
        });
    
        // Handle contact sharing and user registration
        this.bot.on('contact', async (msg) => {
            const chatId = msg.chat.id.toString();
            let phoneNumber = msg.contact.phone_number;
            const firstName = msg.from.first_name || '';
            const lastName = msg.from.last_name || '';
            const username = msg.from.username || '';
    
            // Remove the '+' symbol from the phone number if present
            phoneNumber = phoneNumber.replace(/^\+/, '');
    
            // Upsert the user using the phone number as a persistent identifier
            const user = await this.usersService.upsertUserByPhone(phoneNumber, {
                chatId,
                firstName,
                lastName,
                username,
                phoneNumber,
            });
    
            if (user) {
                this.bot.sendMessage(chatId, `Welcome, ${firstName}! Your phone number (${phoneNumber}) has been saved.`);
            } else {
                this.bot.sendMessage(chatId, 'Failed to save your information. Please try again.');
            }
        });
    
        // Handle /profile command
        this.bot.onText(/\/profile/, async (msg) => {
            const chatId = msg.chat.id.toString();
            console.log(chatId);
            
            const user = await this.usersService.findByChatId(chatId) as User;
    
            if (user) {
                this.openProfile(user, chatId);
            } else {
                this.bot.sendMessage(chatId, 'No profile found. Please register with /start.');
            }
        });
    }
    
    // Arrow function to avoid "this" context issues
    private openProfile = (user: User, chatId: string) => {
        const baseUrl = 'https://my-betting-app.netlify.app';
        const url = `${baseUrl}?chatId=${encodeURIComponent(chatId)}&phone=${encodeURIComponent(user.phoneNumber ?? '')}`;
    
        this.bot.sendMessage(chatId, `Profile:
    Username: ${user.username}
    Fullname: ${user.firstName} ${user.lastName}
    Phone: ${user.phoneNumber ?? 'Not provided'}`, {
            reply_markup: {
                inline_keyboard: [[
                    {
                        text: 'Open Profile',
                        url: url,
                    },
                ]],
            },
        });
    };
    


   
    
}
