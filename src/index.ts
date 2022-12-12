import fs from 'fs/promises';

fs.readdir(__dirname)
  .then((files) => files.filter((file) => file.match(/^(\d+)+.+$/)))
  .then(async (files) => {
    const start = +new Date();

    for (const dir of files) {
      const module = await import(`${__dirname}/${dir}`);
      const startDay = +new Date();
      await module.default();
      console.log(`${dir} time: ${+new Date() - startDay}ms`);
    }

    console.log(`Total time: ${+new Date() - start}ms`);
  });
