import { execSync } from 'child_process';

function getGitUserName(): string {
  if (process.env.GITHUB_ACTIONS === 'true') {
    const githubActor = process.env.GITHUB_ACTOR;
    return githubActor ?? 'github-actions';
  } else {
    try {
      const name = execSync('git config --get user.name', { encoding: 'utf8' }).trim();
      return name || 'unknown';
    } catch (err) {
      return 'unknown';
    }
  }
}

export default getGitUserName;
