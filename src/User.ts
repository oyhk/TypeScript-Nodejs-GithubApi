import Repository from "./Repository";

export default class User {
    login: string;
    fullName: string;
    repoCount: number;
    repos: Repository[];

    constructor(responseBody: any) {
        this.login = responseBody.login;
        this.fullName = responseBody.name;
        this.repoCount = responseBody.public_repos;
    }
}