import * as request from "request";
import User from "../User";
import Repository from "../Repository";
import * as lodash from 'lodash';

const options = {
    headers: {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36'},
    json: true
};

export default class GitHubApiService {

    getUserInfo(username: string, callBack: (user: User) => any) {
        request.get(`https://api.github.com/users/${username}`, options, (error: any, response: any, body: any) => {
            if (error) {
                console.log(error);
            }
            let user = new User(body);
            callBack(user);
        });
    }

    getRepositories(username: string, callBack: (repos: Repository[]) => any) {
        request.get(`https://api.github.com/users/${username}/repos`, options, (error: any, response: any, body: any) => {
            // 当时是我写的用法，用map更加简洁
            /*            let repos: Repository[] = [];
                        (<[]>body).forEach(value => {
                            let repoApiDto = value as Repository;
                            let repo = new Repository(repoApiDto.id, repoApiDto.name, repoApiDto.size);
                            repos.push(repo)
                        });*/


            let repos = body.map((repo: any) => new Repository(repo.id, repo.name, repo.size));
            // let sortBySizeRepos = lodash.sortBy(repos, (o) => o.size);
            let sortBySizeRepos = lodash.sortBy(repos, ['size']);
            callBack(sortBySizeRepos);
        });
    }
}