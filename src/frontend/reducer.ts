import produce from 'immer';
import {Reducer} from 'react';
import {v4 as uuidv4} from 'uuid';

import {
    ActionTypes,
    ADD_ITEM,
    ADD_SKILL,
    ADD_UNIT,
    AppState,
    CHANGE_ITEM_ABBR,
    CHANGE_ITEM_AMOUNT,
    CHANGE_SKILL_ABBR,
    CHANGE_SKILL_LEVEL,
    DELETE_UNIT,
    DUPLICATE_UNIT,
    EDIT_UNIT,
    RESET_FORM,
    SAVE_UNIT,
    SET_COMBAT_SPELL,
    SET_UNITS_NAME,
    Unit,
} from './types';

export const defaultUnit: Unit = {
    id: '',
    name: 'Unit',
    skills: [],
    items: [],
    combatSpell: '',
    behind: false,
};

const initialState: AppState = {
    attackers: {},
    defenders: {},
    unit: defaultUnit,
};

export const reducer: Reducer<AppState, ActionTypes> = produce((state: AppState, action: ActionTypes): AppState | void => {
    console.log(JSON.stringify(state.unit));
    switch (action.type) {
        case SAVE_UNIT: {
            if (state.unit.id) {
                if (state.attackers[state.unit.id]) {
                    state.attackers[state.unit.id] = state.unit;
                } else if (state.defenders[state.unit.id]) {
                    state.defenders[state.unit.id] = state.unit;
                }
            } else {
                state.unit.id = uuidv4();
                if (action.payload.side === 'attackers') {
                    state.attackers[state.unit.id] = state.unit;
                } else {
                    state.defenders[state.unit.id] = state.unit;
                }
            }
            state.unit = defaultUnit;
            break;
        }
        case DUPLICATE_UNIT: {
            if (state.attackers[action.payload.id]) {
                const newUnit = {...state.attackers[action.payload.id]};
                newUnit.id = uuidv4();
                state.attackers[newUnit.id] = newUnit;
            } else if (state.defenders[action.payload.id]) {
                const newUnit = {...state.defenders[action.payload.id]};
                newUnit.id = uuidv4();
                state.defenders[newUnit.id] = newUnit;
            }
            break;
        }
        case DELETE_UNIT: {
            if (state.attackers[action.payload.id]) {
                delete state.attackers[action.payload.id];
            } else if (state.defenders[action.payload.id]) {
                delete state.defenders[action.payload.id];
            }
            break;
        }
        case ADD_SKILL: {
            state.unit.skills.unshift({
                id: uuidv4(),
                abbr: '',
                combatSpell: false,
                name: '',
                level: 1,
            });
            break;
        }
        case ADD_ITEM: {
            state.unit.items.unshift({
                id: uuidv4(),
                abbr: '',
                name: '',
                amount: 1,
            });
            break;
        }

        case CHANGE_ITEM_ABBR: {
            const item = state.unit.items.find((item) => {
                return item.id === action.payload.id;
            });

            item.abbr = action.payload.abbr;
            item.name = action.payload.name;
            break;
        }

        case CHANGE_ITEM_AMOUNT: {
            const item = state.unit.items.find((item) => {
                return item.id === action.payload.id;
            });

            item.amount = action.payload.amount;
            break;
        }

        case CHANGE_SKILL_ABBR: {
            const skill = state.unit.skills.find((item) => {
                return item.id === action.payload.id;
            });

            if (skill.abbr === state.unit.combatSpell) {
                state.unit.combatSpell = '';
            }

            skill.abbr = action.payload.abbr;
            skill.name = action.payload.name;
            skill.combatSpell = action.payload.combatSpell;
            break;
        }

        case CHANGE_SKILL_LEVEL: {
            const skill = state.unit.skills.find((item) => {
                return item.id === action.payload.id;
            });

            skill.level = action.payload.level;
            break;
        }

        case SET_UNITS_NAME: {
            state.unit.name = action.payload.name;
            break;
        }

        case SET_COMBAT_SPELL: {
            state.unit.combatSpell = action.payload.abbr;
            break;
        }

        case EDIT_UNIT: {
            if (state.attackers[action.payload.id]) {
                state.unit = state.attackers[action.payload.id];
            } else if (state.defenders[action.payload.id]) {
                state.unit = state.defenders[action.payload.id];
            }
            break;
        }

        case ADD_UNIT: {
            if (action.payload.side === 'attackers') {
                state.attackers[action.payload.unit.id] = action.payload.unit;
            } else {
                state.defenders[action.payload.unit.id] = action.payload.unit;
            }
            break;
        }

        case RESET_FORM: {
            state.unit = defaultUnit;
            break;
        }
    }
}, initialState);
