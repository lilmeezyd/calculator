let number = ''
let answer
let operator = ''
let expression = ''
let result = ''
let newNumber
const calcArray = []

Array.from(document.querySelectorAll('.btn')).forEach(x => {
	x.onclick = function() {

		if(this.classList.contains('num')) {
			if(typeof(calcArray[calcArray.length-1])==='number') {
				number = `${calcArray[calcArray.length-1]}${number}`
				calcArray.pop()
			}
			if(number.length === 1 && number[0] === '-') {
				if(number.includes('.') && this.innerText === '.') {
					number = number
					expression = expression
					exp.innerText = expression
				} else if(this.innerText === '.' && number.length === 1) {
					number += `0${this.innerText}`
					expression += `0${this.innerText}`
					exp.innerText = expression
				} else {
					number+=`${this.innerText}`
					expression+=`${this.innerText}`
					exp.innerText = expression
				}
				answer = undefined
				result = ''
				res.innerText = ''
			} else {
				if(number.includes('.') && this.innerText === '.') {
					number = number
					expression = expression
					exp.innerText = expression
				} else if(this.innerText === '.' && number.length === 0) {
					number = `0${this.innerText}`
					expression+=number
					exp.innerText = expression
				} else {
					number+=this.innerText
					expression+=this.innerText
					exp.innerText = expression
				}
				answer = undefined
				result = ''
				res.innerText = ''
			}
		}

		if(this.classList.contains('sign') && this.getAttribute('id') !== 'equal') {

			arithmetic = {
				add: '+',
				subtract: '-',
				multiply: 'X',
				divide: '/'
			}

			if(number.length >= 1 && number !== '-') {
				calcArray.push(+number, arithmetic[this.getAttribute('id')])
				expression+=arithmetic[this.getAttribute('id')]
				exp.innerText = expression
				number = ''
			}

			if(typeof(calcArray[calcArray.length-1]) === 'number') {
				calcArray.push(arithmetic[this.getAttribute('id')])
				expression+=arithmetic[this.getAttribute('id')]
				exp.innerText = expression
			}

			// Changing trailing arithmetic sign
			if(typeof(calcArray[calcArray.length-1]) === 'string') {
				if(number==='-'){
				calcArray.splice(calcArray.length-1, 1, arithmetic[this.getAttribute('id')])
				newArr = expression.split('')
				newArr.splice(newArr.length-2,2, arithmetic[this.getAttribute('id')])
				expression = newArr.join('')
				exp.innerText = expression
				number = ''
				} 
				if(!(number==='-')) {
				calcArray.splice(calcArray.length-1, 1, arithmetic[this.getAttribute('id')])
				newArr = expression.split('')
				newArr.splice(newArr.length-1,1, arithmetic[this.getAttribute('id')])
				expression = newArr.join('')
				exp.innerText = expression
				}
				
			}

			if(answer !== undefined) {
				calcArray.push(answer, arithmetic[this.getAttribute('id')])
				expression+=`${answer}${arithmetic[this.getAttribute('id')]}`
				exp.innerText = expression
				answer = undefined
				result = ''
				res.innerText = ''
			}
		}

		// switch number between '+' & '-'
		if(this.getAttribute('id') === 'change') {
			result = ''
			res.innerText = ''
			if(answer !== undefined) {
				number = (-answer).toString()
				expression = number
				exp.innerText = number
				answer = undefined
			} else {
				if(number.length === 0 && expression.length===0) {
					expression = '-'
					exp.innerText = expression
					number+='-'
				} else if(number.length === 1 && number[0] === '-') {
					expression = expression.slice(0, expression.length-1)
					exp.innerText = expression
					number = ''
				} else if(expression[expression.length-1]==='-' || expression[expression.length-1]==='/' ||expression[expression.length-1]==='X'||expression[expression.length-1]==='+') {
					expression+='-'
					exp.innerText = expression
					number = `-${number}`
					newNumber = number
				} else if(+number < 0 && expression.slice(expression.length-number.length)===number) {
					index = expression.lastIndexOf(number)
					number = (-(+number)).toString()
					expression = `${expression.slice(0,index)}${number}`
					exp.innerText = expression
				} else if(+number > 0 && expression.slice(expression.length-number.length)===number){
					index = expression.lastIndexOf(number)
					number = (-(+number)).toString()
					expression = `${expression.slice(0,index)}${number}`
					exp.innerText = expression
				} else {
					number = (-(+number)).toString()
					expression = number
					exp.innerText = expression
				}
			}
		}

		// Return answer
		if(this.getAttribute('id') === 'equal') {
			if(number.length <= 0 && calcArray.length > 0) {
				evaluate(mapArray(calcArray))
				//result+=`=${answer}`
				res.innerHTML = `<span class='s-equal'>=</span>&nbsp;<span class='b-equal'>${answer}</span>`
				expression = ''
				calcArray.length = 0
			}
			if(number.length > 0 && number !== '-') {
				calcArray.push(+number)
				number = ''
				evaluate(mapArray(calcArray))
				//result+=`=${answer}`
				res.innerHTML = `<span class='s-equal'>=</span>&nbsp;<span class='b-equal'>${answer}</span>`
				expression = ''
				calcArray.length = 0
			}
		}

		// Clear the calculator interface
		if(this.getAttribute('id') === 'cancel') {
			number = ''
			expression = ''
			result = 0
			answer = 0
			res.innerText = result
			exp.innerText = expression
			calcArray.length = 0
		}

		// Trim an expression on calculator interface
		if(this.getAttribute('id') === 'trim') {
			newExp = expression.split('')
			newArr = calcArray.join('').split('')
			number = number.slice(0,number.length-1)
			newExp.pop()
			exp.innerText = newExp.join('')
			//isEqual = compare(newExp, newArr)

			if(answer !== undefined && answer !== 0) {
				number = ''
				expression = ''
				result = 0
				answer = undefined
				res.innerText = result
				exp.innerText = expression
				return
			}
			if(result === 0 && (answer === 0 || answer === undefined)) {
				result = ''
				res.innerText = result
			}
			if(typeof(calcArray[calcArray.length-1]) === 'number' && number.length === 0) {
				stringNumber = `${calcArray[calcArray.length-1]}`
				number = stringNumber.slice(0, stringNumber.length-1)
			}
			
			if(expression.length === calcArray.join('').length) {
				calcArray.pop()
				if(typeof(calcArray[calcArray.length-1])==='number') {
					number = `${calcArray[calcArray.length-1]}${number}`
					calcArray.pop()
			}
			}
			expression = newExp.join('')
		}

}

})

/*
function compare(a,b){
  if(a.length !== b.length) return false
  for(let i=0; i < a.length; i++) {
  	  if(a[i] !== b[i]) return false 
    }
    return true
 } */

// Map through array to rearrange operators
function mapArray(arr) {
	arr = arr.map((x,idx)=> {
		if(typeof(x)==='number' && x > 0 && arr[idx-1] === '-') {
			return -x
		} else	if(x==='-'&& arr[idx+1]>0 && typeof(arr[idx+1])==='number'){
			return '+'
		} else if(typeof(x)==='number' && x < 0 && arr[idx-1] === '-'){
			return -x
		} else if(x==='-' && arr[idx+1]<0 && typeof(arr[idx+1])==='number'){
			return '+'
		} else {
			return x
		}
	})
	return arr
}

function evaluate(arr) {
	if(arr.length === 1) {
		answer = +arr[0].toFixed(8)
		return;
	}
	let index, newNum

	if(arr.includes('/')) {
		index = arr.findIndex(x => x == '/')
		if(arr[index+1] === undefined) {
			newNum = arr[index-1]/1
		} else {
			newNum = arr[index-1]/arr[index+1]
		}
		arr.splice(index-1, 3, newNum)
		} else {
			if(arr.includes('X')) {
				index = arr.findIndex(x => x == 'X')
    			if(arr[index+1] === undefined) {
    				newNum = arr[index-1]*1
				} else {
    				newNum = arr[index-1]*arr[index+1]
				}
				arr.splice(index-1, 3, newNum)
				} else {
					if(arr.includes('+')) {
						index = arr.findIndex(x => x == '+')
						if(arr[index+1] === undefined) {
							newNum = arr[index-1]+0
						} else {
							newNum = arr[index-1]+arr[index+1]
						}
						arr.splice(index-1, 3, newNum)
						} else {
							index = arr.findIndex(x => x == '-')
							if(arr[index+1] === undefined) {
								newNum = arr[index-1]-0
							} else {
								newNum = arr[index-1]-arr[index+1]
							}
							arr.splice(index-1, 3, newNum)
						}
					}
				}
    evaluate(arr)
} 





