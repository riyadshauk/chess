import Controller from './controller/controller';
import {$on} from './view/helpers';
import Template from './view/template';
import Store from './store';
import View from './view/view';

const store: Store = new Store('chess-game-typescript-es6');

const template: Template = new Template();

const view: View = new View(template);

const controller: Controller = new Controller(store, view);

const init = () => controller.showBoardAndBindBoxes();
$on(window, 'load', init);