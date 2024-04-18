const {ipcMain} = require("electron");
import {getRepository, listRepositories} from "./findRepository";
import {createRepository} from "./createRepository";
import {createCommit} from "./createCommit";
import {createAndPushBranch} from "./createBranch.";

let Repo;
let RepoStatus = false;
// RepoStatus = true 면 Repo가 있는 상태
// RepoStatus = false 면 Repo가 없는 상태

let RepositoryName = "GitTimer";
let RepositoryDisclosure = true;

createAndPushBranch("master");

async function setting() {
  // console.log((await getRepository("kangeunchan", "Web")).name);
  Repo = await getRepository("kangeunchan", RepositoryName);
  if (Repo.name == RepositoryName) {
    RepoStatus = true;
    console.log(RepositoryName + " found, RepoStatus : " + RepoStatus);
  } else {
    RepoStatus = false;
    console.log(RepositoryName + " not found, RepoStatus : " + RepoStatus);
  }
  //await listRepositories();
}

async function run() {
  if (RepoStatus == false) {
    createRepository(RepositoryName, RepositoryDisclosure);
  } else {
    console.log("Repo already exists");
  }
}

export async function main() {
  await setting();
  await run();

  while (true) {
    console.log(Date() + " : Running...");
    await createCommit("Commit by GitTimer"); // 'await' 키워드 추가
    await new Promise((resolve) => setTimeout(resolve, 1000 * 1)); // 60초 대기
  }
}

main();
