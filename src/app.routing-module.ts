import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { routes } from './app.routes';

@Module({
    exports: [RouterModule],
    imports: [RouterModule.register(routes)],
})
export class AppRoutingModule {}
