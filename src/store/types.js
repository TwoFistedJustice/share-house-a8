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
export const GetRotation = 'chores/GetRotation';

//****** supply Getters ******************//

export const GetDisplayHaveSwitch = 'supply/GetDisplayHaveSwitch';
export const GetSupplies = 'supply/GetSupplies';
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
//it is committed whenever the supply object is changed from its initial state
export const MUTATE_SET_CHANGED = 'supply/MUTATE_SET_CHANGED';

//****** chore Mutations******************//
export const SET_CHORE_KEY = 'chores/SET_CHORE_KEY';
export const SET_CHORES = 'chores/MUTATE_SET_START';
export const SET_ROTATION = 'chores/SET_ROTATION';
export const SORT_NAMES = 'chores/SORT_NAMES';

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
export const setChoreKey = 'chores/setChoreKey';
export const sortNames = 'chores/sortNames';



//****** supply Actions******************//
export const AddSupply = 'supply/AddSupply';
export const flipItemBool = 'supply/flipBool';
export const deleteItem = 'supply/deleteItem';
export const setDisplayHaveSwitch = 'supply/setDisplayHaveSwitch';
export const switchAllHaveStatus = 'supply/switchAllHaveStatus';
export const toggleHaveStatus = 'supply/SUPPLY_TOGGLE_HAVE_SWITCH';
export const confirmChange = 'supply/confirmChange';


//****** supply Database Actions******************//


export const fetchSupply = 'firebase/fetchSupply';
export const saveSupply = 'firebase/saveSupply';

//not necessary bc we already have a getter for this
// export const SUPPLY_FB_INIT_SUPPLY = 'firebase/SUPPLY_FB_INIT_SUPPLY';


