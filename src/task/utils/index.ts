export type addTask = { name: string; userId: string; priority: number };

export const isValidTaskPayload = (
    name: string,
    userId: string,
    priority: number,
) => {
    return name && userId && parseInt(priority.toString()) > 0;
};
