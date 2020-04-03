export const SAVE_UNIT = 'SAVE_UNIT';
export const ADD_UNIT = 'ADD_UNIT';
export const ADD_SKILL = 'ADD_SKILL';
export const ADD_ITEM = 'ADD_ITEM';

export const RESET_FORM = 'RESET_FORM';
export const RESET_STATE = 'RESET_STATE';

export const CHANGE_ITEM_ABBR = 'CHANGE_ITEM_ABBR';
export const CHANGE_ITEM_AMOUNT = 'CHANGE_ITEM_AMOUNT';

export const CHANGE_SKILL_ABBR = 'CHANGE_SKILL_ABBR';
export const CHANGE_SKILL_LEVEL = 'CHANGE_SKILL_LEVEL';

export const SET_BEHIND = 'SET_BEHIND';
export const SET_UNITS_NAME = 'SET_UNITS_NAME';
export const SET_COMBAT_SPELL = 'SET_COMBAT_SPELL';

export const EDIT_UNIT = 'EDIT_UNIT';
export const DUPLICATE_UNIT = 'DUPLICATE_UNIT';
export const DELETE_UNIT = 'DELETE_UNIT';

export type Side = 'attackers' | 'defenders';

export type Skill = {
    id: string
    abbr: string
    name: string
    combatSpell: boolean
    level: number
}

export type Item = {
    id: string
    abbr: string
    name: string
    amount: number
}

export type Unit = {
    id: string
    name: string
    skills: Skill[]
    items: Item[]
    combatSpell: string
    behind: boolean
};

export type AppState = {
    attackers: {
        [key: string]: Unit
    }
    defenders: {
        [key: string]: Unit
    }
    unit: Unit
}

export type SaveUnit = {
    type: typeof SAVE_UNIT
    payload: {
        side?: Side
    }
}

type AddSkillAction = {
    type: typeof ADD_SKILL
    payload: {}
}

type AddItemAction = {
    type: typeof ADD_ITEM
    payload: {}
}

type ChangeItemAbbr = {
    type: typeof CHANGE_ITEM_ABBR
    payload: {
        id: string
        abbr: string
        name: string
    }
}

type ChangeItemAmount = {
    type: typeof CHANGE_ITEM_AMOUNT
    payload: {
        id: string
        amount: number
    }
}

type ChangeSkillAbbr = {
    type: typeof CHANGE_SKILL_ABBR
    payload: {
        id: string
        abbr: string
        name: string
        combatSpell: boolean
    }
}

type ChangeSkillLevel = {
    type: typeof CHANGE_SKILL_LEVEL
    payload: {
        id: string
        level: number
    }
}

type SetBehind = {
    type: typeof SET_BEHIND
    payload: {
        enabled: boolean
    }
}

type ResetForm = {
    type: typeof RESET_FORM
    payload: {}
}

type ResetState = {
    type: typeof RESET_STATE
    payload: {}
}

type SetUnitsName = {
    type: typeof SET_UNITS_NAME
    payload: {
        name: string
    }
}

type EditUnit = {
    type: typeof EDIT_UNIT
    payload: {
        id: string
    }
}

type DuplicateUnit = {
    type: typeof DUPLICATE_UNIT
    payload: {
        id: string
    }
}

type DeleteUnit = {
    type: typeof DELETE_UNIT
    payload: {
        id: string
    }
}

type SetCombatSpell = {
    type: typeof SET_COMBAT_SPELL
    payload: {
        abbr: string
    }
}

type AddUnit = {
    type: typeof ADD_UNIT
    payload: {
        side: Side
        unit: Unit
    }
}

export type ActionTypes = SaveUnit | AddItemAction | AddSkillAction | ChangeItemAbbr | ChangeItemAmount |
    ChangeSkillAbbr | ChangeSkillLevel | SetBehind | ResetForm | SetUnitsName | EditUnit | DeleteUnit | DuplicateUnit |
    SetCombatSpell | AddUnit | ResetState
