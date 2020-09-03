import * as Phaser from 'phaser';
import State from '../States/State';

class StateMachine extends Phaser.Scene{
    private currentState:State;

    changeState(newState:State){
        this.currentState = newState;
        this.currentState.begin();
    }
}