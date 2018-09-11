/**
 * @author yangbin
 * @date 2018/7/18
 * @Description: 过滤器
 */

/**
* toFixed优化
* @param num
* @param dot
* @returns {string | *}
*/
function transformNum (num, dot) {
  let pre = 1
  for (let i = 0; i < dot; i++) {
    pre *= 10
  }
  num = (Math.round(num * pre) / pre).toFixed(dot)
  return num
}
/**
 * 钱个数化
 * @param num 价格
 * @param dot 保留小数位
 * @returns {string}
 */
export function formatMoney (num, dot) {
  let money = Number(num) + '' === 'NaN' ? 0 : Number(num)
  money = transformNum(money, dot)
  return money
}

/**
 * 千分位
 * @param num
 * @param dot
 * @returns {*}
 */
export function formatAmount (num, dot) {
  if (num === '') return ''
  let money = Number(num) + '' === 'NaN' ? 0 : Number(num)
  let isQ = false
  if (money >= 1000) {
    isQ = true
    money = money / 1000
  } else {
    isQ = false
  }
  money = transformNum(money, isQ ? 2 : dot)
  return isQ ? (money.indexOf('.00') > -1 ? parseInt(money) : money) + 'k' : money
}

/**
 * w分位
 * @param num
 * @returns {number}
 */
export function formatDisNum (num) {
  let money = parseInt(num) + '' === 'NaN' ? 0 : parseInt(num)
  if (money === 10000) {
    money = '1w'
  } else if (money > 10000 && money < 100000) {
    money = '1w+'
  } else if (money === 100000) {
    money = '10w'
  } else if (money > 100000) {
    money = '10w+'
  }
  return money
}
