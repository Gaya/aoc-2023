import { readdir, readFile } from 'fs/promises';

interface Module {
  default(input: string): [number | string, number | string];
}

readdir(__dirname)
  .then((files) => files.filter((file) => file.match(/^(\d+)+.+$/)))
  .then((files): Promise<[Module, string][]> => {
    const modules = files.map((dir): Promise<[Module, string]> => {
      return Promise.all([
        import(`${__dirname}/${dir}`),
        readFile(`${__dirname}/${dir}/input.txt`).then((o) => o.toString()),
      ]);
    });

    return Promise.all(modules);
  })
  .then((modAndInputs) => {
    const start = +new Date();
    let totalTime = 0;

    for (let i = 0; i < modAndInputs.length; i++) {
      const startDay = process.hrtime();
      const [module, input] = modAndInputs[i];
      const [p1, p2] = module.default(input);
      const time = process.hrtime(startDay)[1] / 1000000;
      totalTime += time;

      console.info(`======= Day ${i + 1} =======`);
      console.log(`Part 1: ${p1}`);
      console.log(`Part 2: ${p2}`);
      console.log(`⏱ Day ${i + 1} time: ${time.toPrecision(5)}ms`);
    }

    console.info('======================');
    console.log(`Execution time: ${totalTime.toPrecision(5)}ms`);
    console.log(`⏱ Total time: ${+new Date() - start}ms`);
  })
  .catch(console.error);
