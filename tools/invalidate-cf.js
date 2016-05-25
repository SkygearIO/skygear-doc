import Void from 'void';

['AWS_ACCESS_KEY_ID', 'AWS_SECRET_ACCESS_KEY', 'DISTRIBUTION_ID']
.forEach(function (perEnv) {
  if (!process.env[perEnv]) {
    console.error(`Error: \$${perEnv} is not set`);
    process.exit(1);
  }
});

const invalidatingPaths = [
  '/app.js',
  '/app.node.js',
  '/index.html'
];

const maxPaths =
  invalidatingPaths.length < 1000 ? invalidatingPaths.length : 1000;

const v = new Void({
  paths : invalidatingPaths,
  maxPaths
});

setInterval(function () {
  let hasWaitingJob = false;
  v.queue.forEach(function (perJob) {
    if (perJob.status === 'paused') {
      hasWaitingJob = true;
    }
  });

  if (!hasWaitingJob) {
    console.log('Exit without waiting for all jobs complete');
    process.exit(0);
  }
}, 1000);
