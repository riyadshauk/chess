import Controller from './controller';
import {$on} from './helpers';
import Template from './template';
import Store from './store';
import View from './view';

const store = new Store('chess-game-vanilla-es6');

const template = new Template();
const view = new View(template);

/**
 * @type {Controller}
 */
const controller = new Controller(store, view);

const init = () => controller.initializeBoard();
$on(window, 'load', init);