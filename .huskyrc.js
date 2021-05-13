function precommit(...workspaces) {
  return workspaces.map(
    (workspace) => `yarn workspace ${workspace} run precommit`,
  );
}

module.exports = {
  hooks: {
    'pre-commit': [
      `npm run format`,
      `npm run lint`,
      `npm run build`,
      // ...precommit(`packages-template`),
    ].join(' && '),
  },
};
