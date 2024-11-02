const { awscdk } = require('projen');
const { UpgradeDependenciesSchedule } = require('projen/lib/javascript');

const project = new awscdk.AwsCdkConstructLibrary({
  author: 'Court Schuett',
  projenrcTs: true,
  authorAddress: 'https://subaud.io',
  jest: false,
  cdkVersion: '2.20.0',
  defaultReleaseBranch: 'main',
  name: 'cdk-lex-zip-import',
  description: 'cdk construct for importing a zipped Lex bot',
  keywords: ['cdk', 'lex', 'import', 'bot'],
  repositoryUrl: 'https://github.com/schuettc/cdk-lex-zip-import.git',
  eslintOptions: {
    ignorePatterns: ['example/**'],
  },
  depsUpgradeOptions: {
    ignoreProjen: false,
    workflowOptions: {
      labels: ['auto-approve', 'auto-merge'],
      schedule: UpgradeDependenciesSchedule.WEEKLY,
    },
  },
  autoApproveOptions: {
    secret: 'GITHUB_TOKEN',
    allowedUsernames: ['schuettc'],
  },
  python: {
    distName: 'cdk-lex-zip-import',
    module: 'cdk_lex_zip_import',
  },
  autoApproveUpgrades: true,
  projenUpgradeSecret: 'PROJEN_GITHUB_TOKEN',
});
const common_exclude = [
  'cdk.out',
  'cdk.context.json',
  'yarn-error.log',
  'dependabot.yml',
];

project.npmignore.exclude(...common_exclude);
project.gitignore.exclude(...common_exclude);
project.gitignore.include('example');

project.synth();
