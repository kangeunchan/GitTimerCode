// repository.ts
import {octokit} from "./octokit";

export async function createRepository(repoName: string, Disclosure: boolean) {
  const {data} = await octokit.request("POST /user/repos", {
    name: repoName,
    private: Disclosure,
  });
  return data;
}
