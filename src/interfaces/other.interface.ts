export enum PACKAGE_TYPE {
  gh = 'gh',
  npm = 'npm',
}

export interface SearchPackageObjects {
  package: {
    name: string;
    scope: string;
    version: string;
    description?: string;
    keywords?: string[];
    date: string;
    links: {
      npm: string;
      homepage?: string;
      repository?: string;
      bugs?: string;
    };
    author?: {
      name: string;
      email?: string;
      username?: string;
    };
    publisher: {
      username: string;
      email: string;
    };
    maintainers: {
      username: string;
      email: string;
    }[];
  }
  score: {
    final: number;
    detail: {
      quality: number;
      popularity: number;
      maintenance: number;
    };
  };
  searchScore: number;
  flags?: {
    unstable: boolean;
  };
}

export interface SearchPackage {
  objects: SearchPackageObjects[];
  total: number;
  time: string;
}
