import { execSync } from 'child_process';

function getGitUserName(): string {
  try {
    const name = execSync('git config --get user.name', { encoding: 'utf8' }).trim();
    return name || 'unknown';
  } catch (err) {
    console.info('Git user name not found, returning "unknown"', err);
    return 'unknown';
  }
}

export default getGitUserName 