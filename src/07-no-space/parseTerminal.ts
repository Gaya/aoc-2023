const commandsAndOutput = /^\$ ([a-z]+)(?: (.+))?(?:\n([^$]+))?$/gm;
const fileSize = /^(\d+)/gm;
const lastFolder = /\/([a-z]+)$/;

export interface Dir {
  size: number;
  path: string;
}

interface Command {
  c: string;
  a?: string;
  o?: string;
}

export function listCommands(input: string): Command[] {
  const result = [...input.matchAll(commandsAndOutput)];

  return result.map((r) => {
    const command: Command = {
      c: r[1],
      a: r[2],
      o: r[3],
    };

    if (!command.a) {
      delete command.a;
    }

    if (!command.o) {
      delete command.o;
    }

    return command;
  });
}

export function sumFiles(input: string): number {
  return (input.match(fileSize) || ['0']).map((s) => parseInt(s)).reduce((a, b) => a + b, 0);
}

export function dirSize(path: string, dirs: Dir[]): number {
  return dirs
    .filter((d) => d.path.startsWith(path))
    .reduce((acc, d) => acc + d.size, 0);
}

export function makeDirFromCommands(commands: Command[]): Dir[] {
  let pwd = '/';
  const fileTree: Dir[] = [];

  for (let command of commands) {
    if (command.c === 'cd') {
      if (command.a === '/') {
        pwd = '/';
      } else if (command.a === '..') {
        pwd = pwd.replace(lastFolder, '');
        if (pwd === '') {
          pwd = '/';
        }
      } else if (command.a) {
        pwd = [pwd === '/' ? '' : pwd, command.a].join('/');
      }
    }

    if (command.c === 'ls') {
      fileTree.push({
        path: pwd,
        size: command.o ? sumFiles(command.o) : 0,
      });
    }
  }

  return fileTree;
}

export function findFoldersByMaxSize(dirs: Dir[], maxSize = 100000): Dir[] {
  return dirs.filter((d) => dirSize(d.path, dirs) <= maxSize);
}

export function findAndSumDeletedFolders(input: string, maxSize = 100000): number {
  const commands = listCommands(input);
  const dirs = makeDirFromCommands(commands);
  const filteredDirs = findFoldersByMaxSize(dirs, maxSize);

  return filteredDirs.map((d) => dirSize(d.path, filteredDirs)).reduce((a, b) => a + b, 0);
}

export function findFolderToDeleteAndSum(
  input: string,
  diskSpace = 70000000,
  updateSize = 30000000,
): number {
  const commands = listCommands(input);
  const dirs = makeDirFromCommands(commands);
  const currentSize = dirSize('/', dirs);
  const spaceNeededForUpdate = updateSize - (diskSpace - currentSize);

  const dirToDelete = dirs
    .filter((d) => dirSize(d.path, dirs) >= spaceNeededForUpdate)
    .reduce((a: Dir, b: Dir) => dirSize(a.path, dirs) < dirSize(b.path, dirs) ? a : b);

  return dirSize(dirToDelete.path, dirs);
}
