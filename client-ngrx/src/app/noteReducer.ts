export function NoteReducer(state = [],action )
{
    switch(action.type)
    {
        case "ADD":            
            return [...state,action.payload];

        
        case "UPDATE":
           let index =  state.findIndex(x => x.id == action.payload.id)
            if(index >=0)
            {
                let arr = state;
                arr[index] = action.payload;
                return arr
            }

            return state;

        
            case "DELETE":
                let index2 =  state.findIndex(x => x.id == action.payload)
                 if(index2 >=0)
                 {
                     let arr = state;
                     arr.splice(index2,1)
                     return arr
                 }
     
                 return state;
                             
            default:
                return state;
    }
}