import * as types from '../types'
import calculate from '../../utils/calculate'

let initialState = {
  expression: '',
  total: 0
}
export default (state = initialState, action) => {
  var arr
  var expression
  var tot
  switch (action.type) {
   
    case types.SET_EXPRESSION:
        arr = handyFunction( state.expression, action.payload , state.total)
        expression = arr[0]
        tot = arr[1]
        if(tot)
          tot.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        return {
            ...state,
            expression: expression,
            total: tot
            //total: calculate(expression)
        }
    case types.CLEAR_EXPRESSION:
      return {
        ...state,
        expression: '',
        total: 0
      }
    case types.DELETE_LAST_EXPRESSION_ENTRY:
       arr = handyFunctionDelete( state.expression, state.total)
       expression = arr[0]
       tot = arr[1]
      return {
        ...state,
        expression: expression,
        total: tot.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      }  
    case types.HANDLE_PERCENTAGE:
       arr = handyFunctionPercentage( state.expression, action.payload , state.total)
       expression = arr[0]
       tot = arr[1]
      return {
        ...state,
        expression: expression,
        total: tot.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      }  
    
    case types.NEGATE_TOTAL:  
      arr = handyFunctionNegate( state.expression, state.total )
      expression = arr[0]
      tot = arr[1]
      return {
        ...state,
        expression: expression,
        total: tot.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      }  
    default:
      return state
  }
}

const handyFunctionNegate = ( exp, total ) => {
  var expression 
  var tot  
  if(exp.length > 1){
    tot = -1 * calculate(total)
    expression = -1 * calculate(total)
  }else{
    tot = -1 *  parseFloat(exp)
    expression = -1 * parseFloat(exp)
  }
  const arr = [ expression , tot]
  return arr;
}

const handyFunctionDelete = ( exp  ,total ) => {
  var expression = exp;
  var tot  = total
  if(expression.length>1){
    expression = expression.substr(0,expression.length-1);
    tot = calculate(expression)
    
  }else{
      expression = ''
      tot = 0
  }
  const arr = [ expression , tot]
  return arr;
}

const handyFunction  = ( exp , payload_exp ,total ) => {
  var expression = exp;
  var tot  = total
  if (calculate(expression)){
      tot =  parseFloat(total)
  }else{
      tot = 0
  }
     if(payload_exp == "=" ){
      if(expression){
        if(expression.includes("=")){
          expression.substr(0,expression.length-1);
        }
        tot = calculate(expression)
        expression = calculate(expression)
      }
    }else if( (payload_exp == "+" ||  payload_exp == "-" ||  payload_exp == "*" ||  payload_exp == "/" ) && exp  ){
      expression = exp + payload_exp
      tot = calculate(expression)
    }else{
      if ( (expression === '' || expression === null) && payload_exp == "." ){
          expression = '0.'
          tot = 0
      }
      else{
        expression = exp + payload_exp
      }
    }

    const signs = (new RegExp(/^[*+-\/]{2}/)).exec(expression);
    if(signs){
      expression = exp
      tot = total
    }
  const arr = [ expression , tot]

  return arr;
}


const handyFunctionPercentage = ( exp , payload_exp , total) => {
  var expression = exp;
  var tot  = total
  if (calculate(expression)){
      tot =  parseFloat(total)
  }else{
      tot = 0
  }
  var patt = new RegExp("([\\d]+\\.?[\\d]*)?([-+\/*][\\d]+\\.?[\\d]*)*");
  var res = patt.exec(exp);
  
    if(res[2]){
      var str = res[2]
      var x = new RegExp("([-+\/*]*)([\\d]+)").exec(str);
     
      if(x[1] == "+"){
        tot +=  tot * x[2]/100
      }
      else if(x[1] == "-"){
        tot -= tot * x[2]/100
      }
      else if(x[1] == "*"){
        tot = ( tot * x[2] ) /100
      }
      else if(x[1] == "/"){
        tot = ( tot / x[2] ) * 100
      }
    }else{
      tot = res[1]/100 
    }
    if(isNaN(tot)) 
      tot = 0 ; expression=''

    expression = tot.toString()

    const signs = (new RegExp(/^[*+-\/]{2}/)).exec(expression);
    if(signs){
      expression = exp
      tot = total
    }
  const arr = [ expression , tot]

  return arr;
}