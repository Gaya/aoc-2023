import fs from 'fs/promises';

fs.readdir(__dirname)
  .then((files) => files.filter((file) => file.match(/^(\d+)+.+$/)))
  .then(async (files) => {
    const start = +new Date();
    let totalTime = 0;

    for (const dir of files) {
      const module = await import(`${__dirname}/${dir}`);
      const startDay = +new Date();
      await module.default();
      const time = +new Date() - startDay;
      totalTime += time;
      console.log(`${dir} time: ${time}ms`);
    }

    console.log(`Execution time: ${totalTime}ms`);
    console.log(`Total time: ${+new Date() - start}ms`);
  });
