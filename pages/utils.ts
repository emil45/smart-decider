import { CardInfo } from "./models/cards";

export function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomItemFromArray(items: any[]): any {
  return items[Math.floor(Math.random()*items.length)];

}