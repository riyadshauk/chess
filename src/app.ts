import Controller from './controller/controller';
import { qs } from './view/helpers';
const controller = new Controller;
// @ts-ignore
qs('.chessboard > board:nth-child(1) > tr:nth-child(7) > td:nth-child(5) > div:nth-child(1)').click();