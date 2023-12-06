import { readdir, readFile } from 'fs/promises';

interface Module {
  default(input: string): [number | string, number | string];
}

const days = process.argv.slice(2).map((b) => parseInt(b, 10));

const totalStart = +new Date();

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

    for (let i = 1; i < modAndInputs.length; i++) {
      if (days.length > 0 && !days.includes(i)) {
        console.log('Skip day:', i);
        continue;
      }

      const startDay = process.hrtime.bigint();
      const [module, input] = modAndInputs[i];
      const [p1, p2] = module.default(input);
      const time = Number(process.hrtime.bigint() - startDay) / 1e6;
      totalTime += time;

      console.info(`======== Day ${i} ========`);
      console.log(`Part 1: ${p1}`);
      console.log(`Part 2: ${p2}`);
      console.log(`⏱ Day ${i} time: ${time.toPrecision(5)}ms`);
    }

    console.info('========================');
    console.log(`Execution time: ${totalTime.toPrecision(5)}ms`);
    console.log(`⏱ Total time with cleanup: ${+new Date() - start}ms`);
    console.log(`⏱ Total time with loading and cleanup: ${+new Date() - totalStart}ms`);
  })
  .catch(console.error);
