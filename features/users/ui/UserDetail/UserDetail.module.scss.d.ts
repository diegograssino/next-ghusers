export type Styles = {
  'detail': string;
  'detailBio': string;
  'detailHeader': string;
  'detailInfo': string;
  'detailInfoSection': string;
  'detailRepos': string;
  'detailReposItem': string;
  'detailReposItemIcon': string;
  'detailReposList': string;
  'detailStats': string;
  'pulse': string;
  'spin': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
