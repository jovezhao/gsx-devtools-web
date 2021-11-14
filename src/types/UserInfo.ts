export interface UserInfo {
    name: string;
    userId: string;
    avatar: string;

    token?: string;
    mate?: Map<string, any>;
}