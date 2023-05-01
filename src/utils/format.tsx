export function currencyFormat(num: number | string) {
  const _num = typeof num === 'number' ? num : parseFloat(num)
  const _sign = _num < 0 ? '- ' : ''
  return _sign + '$' + Math.abs(_num).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

export function percentFormat(num: number | string) {
  const _num = typeof num === 'number' ? num : parseFloat(num)
  const _sign = _num < 0 ? '- ' : ''
  return _sign + Math.abs(_num).toFixed(2) + '%'
}