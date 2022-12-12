import { readFile } from 'fs';

export default function readFilePs(path: string): Promise<string> {
  return new Promise((resolve, reject) => {
    readFile(path, (err, data) => {
      if (err) {
        return reject(err);
      }

      return resolve(data.toString());
    });
  });
}
