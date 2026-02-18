import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ExperienceDocument = Experience & Document;

@Schema()
export class Experience {
    @Prop({ required: true })
    role: string;

    @Prop({ required: true })
    company: string;

    @Prop()
    url: string;

    @Prop({ required: true })
    start: string;

    @Prop()
    end: string;

    @Prop()
    location: string;

    @Prop({ type: [String], default: [] })
    tags: string[];

    @Prop({ type: [String], default: [] })
    description: string[];

    @Prop({ default: 0 })
    order: number;
}

export const ExperienceSchema = SchemaFactory.createForClass(Experience);
