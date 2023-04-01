import { combineEpics } from 'redux-observable'
import * as epics from '../epics'


export const rootEpic = combineEpics(...Object.values(epics))
