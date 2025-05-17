import { execSync } from 'child_process';

import getGitUserName from '../../utils/git-user-name';

jest.mock('child_process');

describe('getGitUserName', () => {
  afterEach(() => {
    jest.resetAllMocks();
    delete process.env.GITHUB_ACTIONS;
    delete process.env.GITHUB_ACTOR;
  });

  it('returns GITHUB_ACTOR when running in GitHub Actions', () => {
    process.env.GITHUB_ACTIONS = 'true';
    process.env.GITHUB_ACTOR = 'github-test-user';
    expect(getGitUserName()).toBe('github-test-user');
  });

  it('returns "github-actions" if GITHUB_ACTOR is missing in GitHub Actions', () => {
    process.env.GITHUB_ACTIONS = 'true';
    delete process.env.GITHUB_ACTOR;
    expect(getGitUserName()).toBe('github-actions');
  });

  it('returns git config user.name when not in GitHub Actions', () => {
    (execSync as jest.Mock).mockReturnValue('Test User\n');
    expect(getGitUserName()).toBe('Test User');
    expect(execSync).toHaveBeenCalledWith('git config --get user.name', { encoding: 'utf8' });
  });

  it('returns "unknown" if execSync throws', () => {
    (execSync as jest.Mock).mockImplementation(() => { throw new Error('fail'); });
    expect(getGitUserName()).toBe('unknown');
  });
});
