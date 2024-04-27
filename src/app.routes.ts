import { Routes } from "@nestjs/core";
import { UserModule } from "./modules/user/user.module";
import { TaskModule } from "./modules/task/task.module";

export const routes: Routes = [
    {
        path: "user",
        module: UserModule,
    },
    {
        path: "task",
        module: TaskModule,
    },
];
