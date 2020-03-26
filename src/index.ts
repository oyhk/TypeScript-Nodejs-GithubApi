import GitHubApiService from './service/GitHubApiService';
import User from "./User";
import Repository from "./Repository";


let gitHubApiService = new GitHubApiService();
gitHubApiService.getUserInfo('oyhk', (user: User) => {
    gitHubApiService.getRepositories('oyhk', (repos: Repository[]) => {
        user.repos = repos;
        console.log(user);
    });
});

