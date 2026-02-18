import { Body, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Contact, ContactDocument } from './schemas/contact.schema';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ContactService {
    constructor(
        @InjectModel(Contact.name) private contactModel: Model<ContactDocument>,

        private configService: ConfigService,
    ) {}

    async create(createContactDto: any): Promise<Contact> {
        const createdContact = new this.contactModel(createContactDto);
        const savedContact = await createdContact.save();

        const n8nWebhookUrl = this.configService.get<string>('N8N_WEBHOOK_URL');
        if (n8nWebhookUrl) {
            try {
                await fetch(n8nWebhookUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(savedContact),
                });
            } catch (error) {
                console.error('Failed to trigger n8n webhook:', error);
            }
        };
        return savedContact;
    }
}
