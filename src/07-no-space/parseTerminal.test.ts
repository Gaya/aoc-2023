import {
  Dir,
  dirSize, findAndSumDeletedFolders,
  findFoldersByMaxSize, findFolderToDeleteAndSum,
  listCommands,
  makeDirFromCommands,
  sumFiles,
} from './parseTerminal';

const input = `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`;

describe('listCommands', () => {
  it('can parse the commands and group them', () => {
    expect(listCommands(input)).toStrictEqual([
      { c: 'cd', a: '/' },
      { c: 'ls', o: `dir a
14848514 b.txt
8504156 c.dat
dir d` },
      { c: 'cd', a: 'a' },
      { c: 'ls', o: `dir e
29116 f
2557 g
62596 h.lst` },
      { c: 'cd', a: 'e' },
      { c: 'ls', o: `584 i` },
      { c: 'cd', a: '..' },
      { c: 'cd', a: '..' },
      { c: 'cd', a: 'd' },
      { c: 'ls', o: `4060174 j
8033020 d.log
5626152 d.ext
7214296 k` },
    ]);
  });
});

describe('sumFiles', () => {
  it('should parse the ls output and sum files', () => {
    expect(sumFiles(`4060174 j
8033020 d.log
5626152 d.ext
7214296 k`)).toBe(24933642);
    expect(sumFiles(`dir a
14848514 b.txt
8504156 c.dat
dir d`)).toBe(23352670);
    expect(sumFiles(`dir a`)).toBe(0);
    expect(sumFiles(`1337 ad.txt`)).toBe(1337);
  });
});

describe('dirSize', () => {
  it('should recursively calc dir size', () => {
    const dirs: Dir[] = [
      {
        size: 0,
        path: '/',
      },
      {
        path: '/a',
        size: 10,
      },
      {
        path: '/b',
        size: 0,
      },
      {
        path: '/b/c',
        size: 20,
      },
      {
        path: '/b/c/d',
        size: 15,
      }
    ];

    expect(dirSize('/', dirs)).toBe(45);
    expect(dirSize('/b', dirs)).toBe(35);
  });
});

describe('makeDirFromCommands', () => {
  it('should follow commands and return the file tree', () => {
    const dirs: Dir[] = [
      {
        path: '/',
        size: 23352670,
      },
      {
        path: '/a',
        size: 94269,
      },
      {
        path: '/a/e',
        size: 584,
      },
      {
        path: '/d',
        size: 24933642,
      }
    ];

    expect(makeDirFromCommands(listCommands(input))).toStrictEqual(dirs);
  });
});

describe('findFoldersByMaxSize', () => {
  it('should correctly find the folders we are looking for', () => {
    const dirs: Dir[] = [
      {
        path: '/',
        size: 23352670,
      },
      {
        path: '/a',
        size: 94269,
      },
      {
        path: '/a/e',
        size: 584,
      },
      {
        path: '/d',
        size: 24933642,
      }
    ];

    expect(findFoldersByMaxSize(dirs)).toStrictEqual([
      {
        path: '/a',
        size: 94269,
      },
      {
        path: '/a/e',
        size: 584,
      },
    ]);
  });
});

describe('findAndSumDeletedFolders', () => {
  it('should parse the input and return the correct total size', () => {
    expect(findAndSumDeletedFolders(input, 100000)).toBe(95437);
  });
});

describe('findFolderToDeleteAndSum', () => {
  it('should find the smallest folder to delete and return its size', () => {
    expect(findFolderToDeleteAndSum(input, 70000000, 30000000)).toBe(24933642);
  });
});
