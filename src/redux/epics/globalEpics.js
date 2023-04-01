import { filter, switchMap } from 'rxjs/operators'
import { DO_NOTHING } from '../actions/global/GlobalActionConstants'
import {
  doNothing,
  hideSpinner,
  showMessageAction,
  showSpinner,
} from '../actions/global/GlobalActions'
import { messages } from '../../utils/MessageUtils'
import { concat } from 'rxjs'

export const commonActionsEpic = (action$) =>
  action$.pipe(
    filter((action) => action.type !== DO_NOTHING),
    switchMap((action) => {
      let emitActions = []
      if (messages[action.type] === undefined) {
        emitActions.push(doNothing)
      } else {
        let actions = messages[action.type]
          console.log(action.type, actions)
        actions.forEach((a) => {
          switch (a.action) {
            case 'showspinner':
              emitActions.push(showSpinner())
              break
            case 'hidespinner':
                console.log(action.type, 'gfdgdgdfgfdgdgdfdgfdfgdf')
              emitActions.push(hideSpinner())
              break
            case 'showsuccess':
            case 'showerror':
              emitActions.push(showMessageAction(a.payload))
              break
            default:
              emitActions.push(doNothing())
          }
        })
      }
      return concat(emitActions)
    }),
  )
