export type Team = {
  id: number;
  gender: 'male' | 'female'; // ← 加上這個欄位
  members: string[];
  points: number;
};

// export interface Team {
//   id: number;
//   members: [string, string];
//   points: number;
// }
