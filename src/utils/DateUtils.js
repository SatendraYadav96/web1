import moment from 'moment'

export const toYyyyMm = (date) => moment(date).format('yyyyMM')

export const toDdMmYYYY = (date) => moment(date).format("DD/MM/YYYY")

export const toMm = (date) => moment(date).format('MM')

export const toYyyy = (date) => moment(date).format('yyyy')
