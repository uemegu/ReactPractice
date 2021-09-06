import { PATH } from "../Const/Pages";

export interface Scenes {
  scenes: Scene[];
}
export interface Scene {
  back: BackgroundType;
  talk: Talk[];
}
export interface Talk {
  bgm: BGMType;
  char1: CharactorType;
  position1: PositionType;
  char1Size: string;
  text: string;
  items: Item[];
  condition: number[];
  goto: Goto;
}
export interface Goto {
  page: PATH;
  param: string;
}
export interface Item {
  text: string;
  flg: number;
}
export type CharactorType =
  | "Woman2-0"
  | "Woman2-1"
  | "Woman2-2"
  | "Woman2-3"
  | "Woman2-4";
export type BGMType = "default" | "sad" | "honor";
export type BackgroundType = "Background";
export type PositionType = "center" | "right" | "left";
