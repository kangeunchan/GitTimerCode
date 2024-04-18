// octokit.ts
import {Octokit} from "@octokit/rest";
require("dotenv").config();

export const octokit = new Octokit({
  auth: process.env.TOKEN,
});
