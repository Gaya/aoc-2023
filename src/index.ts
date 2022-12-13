import fs from 'fs/promises';

fs.readdir(__dirname)
  .then((files) => files.filter((file) => file.match(/^(\d+)+.+$/)))
  .then(async (files) => {
    const start = +new Date();
    let totalTime = 0;

    for (const dir of files) {
      const module = await import(`${__dirname}/${dir}`);
      const startDay = process.hrtime();
      await module.default();
      const time = process.hrtime(startDay)[1] / 1000000;
      totalTime += time;
      console.log(`${dir} time: ${time.toPrecision(5)}ms`);
    }

    console.log(`Execution time: ${totalTime.toPrecision(5)}ms`);
    console.log(`Total time: ${+new Date() - start}ms`);
  });
