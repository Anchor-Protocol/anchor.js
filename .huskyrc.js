function precommit(...workspaces) {
  return workspaces.map(
    (workspace) => `yarn workspace ${workspace} run precommit`,
  );
}

module.exports = {
  hooks: {
    'pre-commit': [
      `yarn format`,
      `yarn lint`,
      `yarn build`,
      // ...precommit(`packages-template`),
    ].join(' && '),
  },
};
