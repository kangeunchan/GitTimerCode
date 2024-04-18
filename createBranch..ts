import {execSync} from "child_process";

export async function createAndPushBranch(branchName: string): Promise<void> {
  try {
    // Check if the branch already exists
    const branches = execSync(`git branch --list ${branchName}`)
      .toString()
      .trim();

    // If the branch does not exist, create it
    if (!branches) {
      execSync(`git checkout -b ${branchName}`);
    } else {
      console.log(`Branch '${branchName}' already exists.`);
    }

    // Push the new branch to the remote repository
    execSync(`git push -u origin ${branchName}`);

    console.log("Branch pushed successfully!");
  } catch (error) {
    console.error("Failed to create or push branch:", error);
  }
}

// Usage
createAndPushBranch("master");
