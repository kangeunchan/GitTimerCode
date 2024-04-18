import {execSync} from "child_process";
import {writeFileSync} from "fs";

export async function createCommit(message: string): Promise<void> {
  try {
    // Record the start time
    const startTime = new Date().getTime();

    // Push the changes to the remote repository
    execSync(`git push origin master`);

    // Record the end time
    const endTime = new Date().getTime();

    // Calculate the duration
    const duration = endTime - startTime;

    // 오차 보정 적용
    const adjustedMessage = `오차: ${duration - 1000}ms`; // 1000ms(1초)가 기대 시간입니다.

    // Create a README file with the adjusted message
    const readmeContent = `# ${new Date().toLocaleTimeString()}\n${adjustedMessage}`;
    writeFileSync("README.md", readmeContent);

    // Stage the README file
    execSync(`git add README.md`);

    // Commit the changes
    execSync(`git commit -m "${message}"`);

    console.log(
      `Commit and push created successfully! It took ${duration} ms.`
    );
  } catch (error) {
    console.error("Failed to create commit or push:", error);
  }
}
