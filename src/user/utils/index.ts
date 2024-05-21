import {
    ConflictException,
    BadRequestException,
    InternalServerErrorException,
} from '@nestjs/common';

export const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const handleException = (e: any) => {
    const exceptionMap: { [key: string]: () => void } = {
        ConflictException: () => {
            throw new ConflictException('User already exists');
        },
        BadRequestException: () => {
            throw new BadRequestException(e.message);
        },
        default: () => {
            throw new InternalServerErrorException('Internal server error');
        },
    };

    const exceptionType = e.constructor.name;
    (exceptionMap[exceptionType] || exceptionMap.default)();
};
