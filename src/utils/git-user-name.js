const { execSync } = require('child_process');

function getGitUserName() {
    try {
        const name = execSync('git config --get user.name', { encoding: 'utf8' }).trim();
        return name || 'unknown';
    } catch (err) {
        return 'unknown';
    }
}

module.exports = getGitUserName;