import Controller from './controller';
import {$on} from './helpers';
import Template from './template';
import Store from './store';
import View from './view';

/**
 * @type {!Store}
 */
const store = new Store('chess-game-vanilla-es6');

/**
 * @type {!Template}
 */
const template = new Template();
/**
 * @type {!View}
 */
const view = new View(template);

/**
 * @type {Controller}
 */
const controller = new Controller(store, view);

const init = () => controller.showBoardAndBindBoxes();
$on(window, 'load', init);