// repository.ts
import {octokit} from "./octokit";

export async function getRepository(owner: string, repo: string) {
  const {data} = await octokit.request("GET /repos/{owner}/{repo}", {
    owner,
    repo,
  });

  // console.log(data);

  return {
    owner: data.owner.login,
    name: data.name,
    description: data.description ?? "",
    language: data.language ?? "",
    forks_count: data.forks_count,
  };
}

export async function listRepositories() {
  const {data} = await octokit.request("GET /user/repos");
  const repositories = data.map((repo: any) => ({
    owner: repo.owner.login,
    name: repo.name,
    description: repo.description ?? "",
    language: repo.language ?? "",
    forks_count: repo.forks_count,
  }));
  console.log(repositories);
}
