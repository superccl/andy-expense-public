import { Currency, useSetting } from '../context/SettingContext'

export function formatCurrency(currency:Currency, value:number, decimal?:number, sigFig?:number) {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    ...(decimal && {minimumFractionDigits: decimal}),
    ...(sigFig && {minimumSignificantDigits: sigFig}),
    ...(sigFig && {maximumSignificantDigits: sigFig})
  })

  return formatter.format(value)
}

export function getCurrencySymbol (currency:Currency) {
  return (0).toLocaleString('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }
  ).replace(/\d/g, '').trim()
}

type ConversionData = {
  [key: Currency]: number
}