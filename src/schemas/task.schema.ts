import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Task extends Document {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    userId: string;

    @Prop({ required: true })
    priority: number;
}

const TaskSchema = SchemaFactory.createForClass(Task);

TaskSchema.virtual('id').get(function (this: any) {
    return this._id.toHexString();
});

TaskSchema.set('toJSON', {
    virtuals: true,
    transform: (_, ret) => {
        ret.id = ret._id.toHexString();
        delete ret._id;
        delete ret.__v;
    },
});

export { TaskSchema };
