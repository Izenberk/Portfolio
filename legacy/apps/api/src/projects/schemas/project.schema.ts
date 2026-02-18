import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProjectDocument = Project & Document;

@Schema()
export class Project {
    @Prop({ required: true, unique: true })
    slug: string;

    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    summary: string;

    @Prop([String])
    details: string[];

    @Prop([String])
    stack: string[];

    @Prop({ type: Object })
    links: { demo: string; repo: string };

    @Prop()
    image: string;

    @Prop()
    contributors: string;

    @Prop({ default: 0 })
    order: number;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
