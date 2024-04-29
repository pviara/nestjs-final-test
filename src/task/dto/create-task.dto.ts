import { User } from "src/user/user.model";

export class CreateTaskDTO {
    id: number;
    name: string;
    userId: User
    priority: string;
}