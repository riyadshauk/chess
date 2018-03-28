import Controller from './controller';
import {$on} from './helpers';
import Template from './template';
import Store from './store';
import View from './view';

const store: Store = new Store('chess-game-vanilla-es6');

const template: Template = new Template();

const view: View = new View(template);

const controller: Controller = new Controller(store, view);

const init = () => controller.showBoardAndBindBoxes();
$on(window, 'load', init);