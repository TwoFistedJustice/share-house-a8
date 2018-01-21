/***
 *  NOTES
 *      The word before the slash in the constant is arbitrary - it's there for humans, not machines
 *
 * */


/****************************************************************
 ****************************************************************
 ****************************************************************
 ********************* GETTERS ********************************
 ****************************************************************/


  //****** chore Getters ******************//
export const GET_ROTATION = 'chores/GET_ROTATION';

//****** supply Getters ******************//

export const GET_DISPLAY_HAVE_SWITCH = 'supply/GET_DISPLAY_HAVE_SWITCH';
export const GET_SUPPLIES = 'supply/GET_SUPPLIES';
// export const GET_SUPPLY_INIT_COPY = 'supply/SUPPLY_GET_INIT_COPY';



/****************************************************************
 ****************************************************************
 ****************************************************************
 ********************* MUTATIONS ********************************
 ****************************************************************/

//****** supply Mutations******************//

export const MUTATE_ADD_SUPPLY = 'supply/MUTATE_ADD_SUPPLY';
export const MUTATE_FLIP_ITEM_BOOL = 'supply/MUTATE_FLIP_ITEM_BOOL';
export const MUTATE_DELETE_ITEM = 'supply/MUTATE_DELETE_ITEM';
export const MUTATE_SET_DISPLAY_HAVE_SWITCH = 'supply/MUTATE_SET_DISPLAY_HAVE_SWITCH';
export const MUTATE_SWITCH_ALL_HAVE_STATUS = 'supply/MUTATE_SWITCH_ALL_HAVE_STATUS';
export const MUTATE_TOGGLE_HAVE_STATUS = 'supply/MUTATE_TOGGLE_HAVE_SWITCH';
export const MUTATE_SUPPLY_CONFIRM_CHANGE = 'supply/MUTATE_SUPPLY_CONFIRM_CHANGE';

//there is no specific action associated with MUTATE_SET_CHANGED
//it is committed whenever the supplies object is changed from its initial state
export const MUTATE_SET_CHANGED = 'supply/MUTATE_SET_CHANGED';

//****** chore Mutations******************//
export const MUTATE_SET_CHORE_KEY = 'chores/MUTATE_SET_CHORE_KEY';
export const MUTATE_SET_CHORES = 'chores/MUTATE_SET_START';
export const MUTATE_SET_ROTATION = 'chores/MUTATE_SET_ROTATION';
export const MUTATE_SORT_NAMES = 'chores/MUTATE_SORT_NAMES';

//****** supply Database Mutations******************//

export const MUTATE_FETCH_SUPPLY = 'firebase/MUTATE_FETCH_SUPPLY';
export const MUTATE_SAVE_SUPPLY = 'firebase/MUTATE_SAVE_SUPPLY';


//not necessary bc we already have a getter for this
// export const MUTATE_FB_INIT_SUPPLY = 'firebase/MUTATE_FB_INIT_SUPPLY';


/****************************************************************
 ****************************************************************
 ****************************************************************
 ********************* ACTIONS ********************************
 ****************************************************************/

//****** chore Actions******************//
export const CHORE_SET_CHORE_KEY = 'chores/CHORE_SET_CHORE_KEY';
export const CHORE_SORT_NAMES = 'chores/CHORE_SORT_NAMES';



//****** supply Actions******************//
export const SUPPLY_ADD_SUPPLY = 'supply/SUPPLY_ADD_SUPPLY';
export const SUPPLY_FLIP_ITEM_BOOL = 'supply/SUPPLY_FLIP_ITEM_BOOL';
export const SUPPLY_DELETE_ITEM = 'supply/SUPPLY_DELETE_ITEM';
export const SUPPLY_SET_DISPLAY_HAVE_SWITCH = 'supply/SUPPLY_SET_DISPLAY_HAVE_SWITCH';
export const SUPPLY_SWITCH_ALL_HAVE_STATUS = 'supply/SUPPLY_SWITCH_ALL_HAVE_STATUS';
export const SUPPLY_TOGGLE_HAVE_STATUS = 'supply/SUPPLY_TOGGLE_HAVE_SWITCH';
export const SUPPLY_CONFIRM_CHANGE = 'supply/SUPPLY_CONFIRM_CHANGE';


//****** supply Database Actions******************//


export const SUPPLY_FETCH_SUPPLY = 'firebase/SUPPLY_FETCH_SUPPLY';
export const SUPPLY_SAVE_SUPPLY = 'firebase/SUPPLY_SAVE_SUPPLY';

//not necessary bc we already have a getter for this
// export const SUPPLY_FB_INIT_SUPPLY = 'firebase/SUPPLY_FB_INIT_SUPPLY';


