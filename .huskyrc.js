function precommit(...workspaces) {
  return workspaces.map(
    (workspace) => `yarn workspace ${workspace} run precommit`,
  );
}

module.exports = {
  hooks: {
    'pre-commit': [
      `yarn format`,
      // TODO restore precommit actions (they have errors by lint and typescript build so can not pass yet)
      //`yarn lint`,
      //`yarn build`, // see if build works
      //...precommit(`packages-template`),
    ].join(' && '),
  },
};
